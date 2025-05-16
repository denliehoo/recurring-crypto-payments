import { Request, Response } from "express";
import {
  findVendorByEmail,
  findVendorById,
  findVendorClientById,
} from "../utility/findFromDb";
import models from "../models";
const Web3 = require("web3");
import RecurringPaymentsVendor from "../contractABIs/RecurringPaymentsVendor.json";
import { CustomRequest } from "../types/requests";
import { IScheduledPayment } from "../models/scheduledPayment";
import { ICompletedPayment } from "../models/completedPayment";
import { IPayout } from "../models/payout";
const jwt = require("jsonwebtoken");
import moment from "moment";
import {
  isAllowanceAndBalanceSufficient,
  sendReduceUserBalanceTransactionasync,
} from "../utility/interactWithBlockchain";
import {
  addCompletedPayment,
  addScheduledPayment,
  deleteScheduledPayment,
} from "../utility/payments";
import { sendWebHook } from "../utility/sendWebhook";
import { IPendingEndSubscription } from "../models/pendingEndSubscription";
import { deletePendingEndSubscription } from "../utility/pendingEndSubscription";

const { PendingEndSubscription, ScheduledPayment, CompletedPayment, Payout } =
  models;

// change payment method of client

// the cron job runs this every X minutes
export const cronApi = async (req: Request, res: Response) => {
  const auth = req.headers.authorization;
  const cronApiKey = process.env.CRON_API_KEY;

  console.log("CRON API Called");

  if (auth !== cronApiKey)
    return res.status(401).json({ error: "You are unauthorized" });
  // Get the date 60 minutes into the future
  const futureDate = new Date(new Date().getTime() + 60 * 60000);
  // filter to see all the scheduled payments that are due in less than 60 mins
  const paymentsDue: IScheduledPayment[] = await ScheduledPayment.find({
    paymentDate: {
      $lt: futureDate, // means less than
    },
  });
  const pendingEndSubscriptionsToDelete: IPendingEndSubscription[] =
    await PendingEndSubscription.find({
      paymentDate: {
        $lt: futureDate,
      },
    });
  if (paymentsDue.length === 0 && pendingEndSubscriptionsToDelete.length === 0)
    return res.status(204).end();

  // loop through to reduce the user balances...
  if (paymentsDue.length > 0) {
    for (let p of paymentsDue) {
      let isSuccessful = false;
      const paymentDetails = {
        vendorContract: p.vendorContract,
        userAddress: p.userAddress,
        amount: p.amount,
        tokenAddress: p.tokenAddress!,
        vendorId: p.vendorId.toString(),
        vendorClientId: p.vendorClientId.toString(),
      };

      const v = await findVendorById(p.vendorId.toString());
      const c = await findVendorClientById(p.vendorClientId.toString());

      if (!v || !c) continue;

      const [sufficientAllowance, sufficientBalance] =
        await isAllowanceAndBalanceSufficient(
          p.userAddress,
          p.tokenAddress,
          p.vendorContract,
          p.amount
        );

      if (sufficientAllowance && sufficientBalance) {
        // only if successful, change isSuccessful to true
        const transactionHash = await sendReduceUserBalanceTransactionasync(
          p.vendorContract,
          p.userAddress,
          p.amount.toString()
        );

        if (transactionHash) {
          isSuccessful = true;
          // need to work more on errorhandling here
          // "move" the data to completedPayments with status "paid"
          const currentDate = new Date();
          const nextDate = moment().add(1, "months").toDate();

          const newCompletedPayment: ICompletedPayment = new CompletedPayment({
            ...paymentDetails,
            paymentDate: currentDate,
            status: "paid",
            hash: transactionHash,
          });
          const isCompletedPaymentAdded = await addCompletedPayment(
            newCompletedPayment
          );
          if (!isCompletedPaymentAdded) continue;

          // delete the data for that in scheduledPayment
          const isScheduledPaymentDeleted = await deleteScheduledPayment(p);
          if (!isScheduledPaymentDeleted) continue;

          // Add a new scheduledPayment for next month
          const newScheduledPayment: IScheduledPayment = new ScheduledPayment({
            ...paymentDetails,
            paymentDate: nextDate,
          });
          const isNewScheduledPaymentAdded = await addScheduledPayment(
            newScheduledPayment
          );
          if (!isNewScheduledPaymentAdded) continue;

          // Send a webhook to vendor that it is paid
          const subscriptionContinuedWebhook = await sendWebHook(
            v.apiKey!,
            v.webhookUrl!,
            "SUBSCRIPTION_CONTINUED",
            {
              vendorId: v._id,
              vendorClientId: c._id,
              nextDate: nextDate,
            }
          );

          const successfulPaymentWebhook = await sendWebHook(
            v.apiKey!,
            v.webhookUrl!,
            "SUCCESSFUL_PAYMENT",
            {
              ...paymentDetails,
              paymentDate: currentDate,
              hash: transactionHash,
            }
          );

          if (!subscriptionContinuedWebhook || !successfulPaymentWebhook)
            continue;
        }
      }
      if (!isSuccessful) {
        let remarks: string | null = null;
        if (!sufficientAllowance) remarks = "Insufficient Allowance";
        if (!sufficientBalance) remarks = "Insufficient Balance";
        if (!sufficientAllowance && !sufficientBalance)
          remarks = "Insufficient Allowance & Balance";

        // "move" the data to completedPayment with status "failed"
        const newCompletedPayment: ICompletedPayment = new CompletedPayment({
          ...paymentDetails,
          paymentDate: new Date(),
          status: "failed",
          remarks: remarks,
        });
        const isCompletedPaymentAdded = await addCompletedPayment(
          newCompletedPayment
        );
        if (!isCompletedPaymentAdded) continue;

        // delete the data for that in scheduledPayments
        const isScheduledPaymentDeleted = await deleteScheduledPayment(p);
        if (!isScheduledPaymentDeleted) continue;

        // Update that client entity status to "cancelled" (we take it as they cancel if they failed to pay)
        let vendorClient = await findVendorClientById(
          p.vendorClientId.toString()
        );
        if (!vendorClient) continue;
        vendorClient.status = "ended";
        try {
          vendorClient.save();
        } catch {
          continue;
        }

        // Send a webhook to vendor that payment failed and cancelled subscription;
        // change to end subscription webhook
        const subscriptionCancelledWebhook = await sendWebHook(
          v.apiKey!,
          v.webhookUrl!,
          "SUBSCRIPTION_ENDED",
          {
            vendorId: v._id,
            vendorClientId: c._id,
          }
        );

        const failedPaymentWebhook = await sendWebHook(
          v.apiKey!,
          v.webhookUrl!,
          "FAILED_PAYMENT",
          { vendorId: v._id, vendorClientId: c._id }
        );

        if (!subscriptionCancelledWebhook || !failedPaymentWebhook) continue;
      }
    }
  }
  // loop through to end the subscriptions of users who have cancelled and subscription term has come to an end
  if (pendingEndSubscriptionsToDelete.length > 0) {
    for (let p of pendingEndSubscriptionsToDelete) {
      let c = await findVendorClientById(p.vendorClientId.toString());
      const v = await findVendorById(p.vendorId.toString());
      if (!c || !v) continue;

      c.status = "ended";
      try {
        await c.save();
      } catch {
        continue;
      }

      const isDeleted = await deletePendingEndSubscription(p);
      if (!isDeleted) continue;

      const subscriptionEndedWebhook = await sendWebHook(
        v.apiKey!,
        v.webhookUrl!,
        "SUBSCRIPTION_ENDED",
        {
          vendorId: p.vendorId.toString(),
          vendorClientId: p.vendorClientId.toString(),
        }
      );

      if (!subscriptionEndedWebhook) continue;
    }
  }

  console.log("CRON API Completed");
  // return a successful response
  return res.send("all done");
};

export const getPayoutsDetails = async (req: CustomRequest, res: Response) => {
  const decoded = req.decoded;
  const { email } = decoded;
  try {
    const vendor = await findVendorByEmail(email);
    if (!vendor) return res.status(404).json({ error: "Vendor doesn't exist" });

    const payouts: IPayout[] = await Payout.find({
      vendorId: vendor._id.toString(),
    });

    const web3 = new Web3(process.env.WEB3_PROVIDER!);
    const contract = new web3.eth.Contract(
      RecurringPaymentsVendor.abi,
      vendor.vendorContract
    );

    const balance: string = await contract.methods.balance().call();
    const owner: string = await contract.methods.owner().call();

    return res.send({
      payouts: payouts,
      vendor: vendor,
      pendingBalance: balance,
      owner: owner,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to get payouts.", error });
  }
};

export const createPayout = async (req: Request, res: Response) => {
  const { vendorId } = req.params;
  const { amount, tokenAddress, userAddress, token, hash } = req.body;

  try {
    const newPayout: IPayout = new Payout({
      payoutDate: new Date(),
      amount,
      tokenAddress,
      userAddress,
      token,
      hash,
      vendorId,
    });
    await newPayout.save();
    return res.send(newPayout);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create payout.", error });
  }
};
export const getAllPayments = async (req: CustomRequest, res: Response) => {
  const decoded = req.decoded;
  const { vendorId } = decoded;
  const scheduledPayments = await ScheduledPayment.find({ vendorId: vendorId });
  const completedPayments = await CompletedPayment.find({ vendorId: vendorId });
  // add remarks in the map too next time once completedpayments has remarks too
  const results = scheduledPayments
    .map((p) => ({
      ...p.toObject(),
      status: "pending",
      remarks: null as string | null,
      hash: null as string | null,
    }))
    .concat(completedPayments)
    .sort(
      (a: any, b: any) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

  return res.send(results);
};

export const getDashboard = async (req: CustomRequest, res: Response) => {
  const { email, vendorId } = req.decoded;
  const { utc } = req.query;
  const timezone = parseInt(utc as string);

  let totalDaily = 0;

  const vendor = await findVendorById(vendorId);

  if (!vendor?.vendorContract) return res.status(204).end();

  type PaymentData = {
    paymentDate: string;
    amount: number;
  };

  type Amounts = {
    time: string;
    amount: number | undefined;
  };
  const transformData = (data: PaymentData[], timezoneOffset: number) => {
    let amounts: Amounts[] = [
      { time: "00:00", amount: 0 },
      { time: "03:00", amount: 0 },
      { time: "06:00", amount: 0 },
      { time: "09:00", amount: 0 },
      { time: "12:00", amount: 0 },
      { time: "15:00", amount: 0 },
      { time: "18:00", amount: 0 },
      { time: "21:00", amount: 0 },
      { time: "24:00", amount: 0 },
    ];

    for (let d of data) {
      let date = new Date(d.paymentDate);
      date.setHours(date.getHours() + timezoneOffset); // Apply the timezone offset
      let indx = Math.ceil(date.getHours() / 3);
      if (indx === 0) indx = 1;
      amounts[indx]!.amount! += d.amount! / 10 ** 6;
    }

    let currentHourIndex = Math.ceil(new Date().getHours() / 3);
    currentHourIndex = (currentHourIndex + Math.floor(timezoneOffset / 3)) % 8;
    if (currentHourIndex < 0) currentHourIndex += 8;

    for (let i = 1; i < currentHourIndex + 1; i++) {
      amounts[i]!.amount! += amounts[i - 1]!.amount!;
    }

    if (currentHourIndex === 8) return amounts;
    for (let i = currentHourIndex + 1; i < amounts.length; i++) {
      amounts[i].amount = undefined;
    }

    totalDaily = amounts[currentHourIndex].amount || 0;

    return amounts;
  };

  const serverTimeZone = Math.abs(new Date().getTimezoneOffset() / 60);

  // because UTC time received is in serverTimeZone.
  // Hence, need to - it to be UTC0. Then + timezone (for the client)
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Midnight today
  todayStart.setHours(todayStart.getHours() + timezone - serverTimeZone);

  let dailyCompletedPayments;
  try {
    dailyCompletedPayments = await CompletedPayment.find({
      status: "paid",
      paymentDate: {
        $gte: todayStart,
        $lte: new Date(), // curent time now
      },
    });
  } catch {
    return res
      .status(500)
      .json({ error: "Error in fetching daily completed payments" });
  }

  // const data = generateSampleData();
  const data = dailyCompletedPayments!.map((d: any) => ({
    paymentDate: d.paymentDate,
    amount: d.amount,
  }));
  const transformed = transformData(data, timezone - serverTimeZone);

  let recentCompletedPayments;
  try {
    recentCompletedPayments = await CompletedPayment.find({ vendorId })
      .sort({ paymentDate: -1 }) // Sort by paymentDate in descending order (most recent first)
      .limit(5); // Limit the result to 5 documents
  } catch {
    return res
      .status(500)
      .json({ error: "Error in fetching recent completed payments" });
  }

  let pendingBalance;
  try {
    const web3 = new Web3(process.env.WEB3_PROVIDER!);
    if (!vendor) return res.status(404).json({ error: "Vendor not found" });
    const contract = new web3.eth.Contract(
      RecurringPaymentsVendor.abi,
      vendor.vendorContract
    );

    pendingBalance = await contract.methods.balance().call();
  } catch {
    return res
      .status(500)
      .json({ error: "Error in fetching pending balance from contract" });
  }
  return res.send({
    chartData: transformed,
    recentPayments: recentCompletedPayments,
    totalDaily: totalDaily,
    pendingBalance: parseInt(pendingBalance),
  });
};

// helpers

// const generateSampleData = () => {
//   let data = [];
//   const generateRandomDate = () => {
//     const now = new Date();
//     const todayStart = new Date(
//       now.getFullYear(),
//       now.getMonth(),
//       now.getDate()
//     ); // Midnight today
//     const randomTime = Math.floor(
//       Math.random() * (now.getTime() - todayStart.getTime())
//     );
//     const randomDate = new Date(todayStart.getTime() + randomTime);
//     return randomDate.toISOString();
//   };

//   for (let i = 0; i < 10; i++) {
//     data.push({
//       paymentDate: generateRandomDate(),
//       amount: 15000000,
//     });
//   }
//   data.sort((a, b) => Date.parse(a.paymentDate) - Date.parse(b.paymentDate));
//   return data;
// };

// for testing:
export const getScheduledPayments = async (req: Request, res: Response) => {
  try {
    const scheduledPayments = await ScheduledPayment.find({});
    res.json(scheduledPayments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getCompletedPayments = async (req: Request, res: Response) => {
  try {
    const completedPayments = await CompletedPayment.find({});
    res.json(completedPayments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getPendingEndSubscriptions = async (
  req: Request,
  res: Response
) => {
  try {
    const pendingEndSubscriptions = await PendingEndSubscription.find({});
    res.json(pendingEndSubscriptions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
