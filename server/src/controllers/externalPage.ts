import { Request, Response } from "express";
import { CustomRequest } from "../types/requests";
import models from "../models";
import { findVendorById, findVendorClientById } from "../utility/findFromDb";
import moment from "moment";
import { ICompletedPayment } from "../models/completedPayment";
import { IScheduledPayment } from "../models/scheduledPayment";
import {
  isAllowanceAndBalanceSufficient,
  sendReduceUserBalanceTransactionasync,
} from "../utility/interactWithBlockchain";
import {
  addCompletedPayment,
  addScheduledPayment,
  deleteScheduledPayment,
  findScheduledPayment,
  updateScheduledPayment,
} from "../utility/payments";
import { VendorClientSubscriptionDetails } from "../../../shared/types/VendorClientSubscriptionDetails";
import { generateJWT } from "../utility/generateJWT";
import { sendWebHook } from "../utility/sendWebhook";
import {
  addPendingEndSubscription,
  deletePendingEndSubscription,
  findPendingEndSubscription,
} from "../utility/pendingEndSubscription";
import { IPendingEndSubscription } from "../models/pendingEndSubscription";
// import sendWebHook from "../utility/sendWebhook";

const {
  Vendor,
  VendorClient,
  ScheduledPayment,
  CompletedPayment,
  PendingEndSubscription,
} = models;

export const manageSubscription = async (req: Request, res: Response) => {
  // should mandate that the API is called with some sort of token
  // from the vendor

  // for testing
  // const vendor = await Vendor.find();
  // const vendorClient = await VendorClient.find();
  // const data = {
  //   vendor: vendor[0]._id.toString(),
  //   vendorClient: vendorClient[0]._id.toString(),
  // };

  // for prod
  const auth = req.headers.authorization;

  const { vendor, vendorClient } = req.body;
  if (!vendor || !vendorClient)
    return res
      .status(401)
      .json({ error: "Please ensure to provide vendor and vendorClient" });

  const v = await findVendorById(vendor);
  const c = await findVendorClientById(vendorClient);
  if (!v || !c)
    return res
      .status(404)
      .json({ error: "Error, vendor or vendorClient not found" });

  if (auth !== v.apiKey)
    return res.status(401).json({ error: "Incorrect API Key" });

  const data = { vendor: vendor, vendorClient: vendorClient };
  // ----

  const token = generateJWT(data);
  const baseUrl = process.env.FRONT_END_URL; // change this to actual frontend in future
  return res.send({ url: `${baseUrl}/manage-subscription/${token}` });
};

export const initiateSubscription = async (
  req: CustomRequest,
  res: Response
) => {
  const { billingInfo, paymentMethod, userAddress } = req.body;

  const decoded = req.decoded;
  const vendorId = decoded.vendor;
  const vendorClientId = decoded.vendorClient;

  const vendor = await findVendorById(vendorId);
  let vendorClient = await findVendorClientById(vendorClientId);

  if (!vendorClient || !vendor)
    return res.status(401).json({ error: "Vendor or client id not found" });

  const vendorContract = vendor?.vendorContract!;
  const amount = vendor.amount!.toString();

  // 1. reduces user balance
  const transactionHash = await sendReduceUserBalanceTransactionasync(
    vendorContract,
    userAddress,
    amount
  );

  if (!transactionHash)
    return res.status(400).json({ error: "Deduction failed" });

  // 2. update vendorClient
  const nextDate = moment().add(1, "months").toDate();
  const currentDate = new Date();
  try {
    vendorClient.billingInfo = billingInfo;
    vendorClient.paymentMethod = paymentMethod;
    vendorClient.nextDate = nextDate;
    vendorClient.status = "active";
    vendorClient.invoices = [
      {
        date: currentDate,
        amount: vendor.amount!, // replace this
        token: "USDT",
        status: "paid",
        hash: `https://goerli.etherscan.io/tx/${transactionHash}`,
        invoice: "https://www.google.com/", // eventually put the actual invoice link
      },
    ];

    vendorClient = await vendorClient.save();
  } catch (error) {
    return res.status(500).json({ error: "Failed to update VendorClient" });
  }

  const paymentDetails = {
    vendorContract: vendorContract,
    userAddress: userAddress,
    amount: parseInt(amount),
    tokenAddress: vendor!.tokenAddress!,
    paymentDate: currentDate,
    vendorId: vendorId,
    vendorClientId: vendorClientId,
  };

  // 3. Add above to CompletedPayments
  const newCompletedPayment: ICompletedPayment = new CompletedPayment({
    ...paymentDetails,
    status: "paid",
    hash: transactionHash,
  });
  const isCompletedPaymentAdded = await addCompletedPayment(
    newCompletedPayment
  );
  if (!isCompletedPaymentAdded)
    return res.status(500).json({ error: "Failed to add completed payment" });
  // 4. schedule next payment
  const newScheduledPayment: IScheduledPayment = new ScheduledPayment({
    ...paymentDetails,
    paymentDate: nextDate,
  });
  const isScheduledPaymentAdded = await addScheduledPayment(
    newScheduledPayment
  );
  if (!isScheduledPaymentAdded)
    return res.status(500).json({ error: "Failed to update VendorClient" });

  // 5. send a webhook to vendor that subscription should begin and payment received

  const subscriptionBegunWebHook = await sendWebHook(
    vendor.apiKey,
    vendor.webhookUrl!,
    "SUBSCRIPTION_BEGUN",
    {
      vendorId: vendor._id,
      vendorClientId: vendorClientId,
      begun: currentDate,
      nextDate: nextDate,
    }
  );

  const successfulPaymentWebhook = await sendWebHook(
    vendor.apiKey,
    vendor.webhookUrl!,
    "SUCCESSFUL_PAYMENT",
    { ...paymentDetails, hash: transactionHash }
  );

  // if (!subscriptionBegunWebHook || !successfulPaymentWebhook)
  //   return res.status(401).json({ error: "Failed to send webhook" });

  // return at end
  return res.send(vendorClient);
};

export const getSubscriptionPageDetails = async (
  req: CustomRequest,
  res: Response
) => {
  const decoded = req.decoded;
  const vendorId = decoded.vendor;
  const clientId = decoded.vendorClient;
  const v = await findVendorById(vendorId);
  let c = await findVendorClientById(clientId);

  if (!v || !c)
    return res.status(401).json({ error: "Vendor or client id not found" });

  let paymentMethod;
  if (c?.paymentMethod?.wallet) {
    const userAddress = c.paymentMethod.wallet;
    const [sufficientAllowance, sufficientBalance] =
      await isAllowanceAndBalanceSufficient(
        userAddress,
        v.tokenAddress!,
        v.vendorContract!,
        v.amount!
      );
    if (
      c.paymentMethod.sufficientAllowance !== sufficientAllowance ||
      c.paymentMethod.sufficientBalance !== sufficientBalance
    ) {
      paymentMethod = {
        ...c.paymentMethod,
        sufficientAllowance: sufficientAllowance,
        sufficientBalance: sufficientBalance,
      };
      c.paymentMethod = paymentMethod;

      await c.save();
      try {
      } catch (err) {
        console.log(err);
        return res
          .status(400)
          .json({ error: "an error occured in updating the client" });
      }
    } else {
      paymentMethod = c.paymentMethod;
    }
  } else {
    paymentMethod = null;
  }

  const data: VendorClientSubscriptionDetails = {
    vendor: v!.name || "",
    plan: v!.plan || "",
    amount: v!.amount || 0,
    token: "USDT", // get the token name via api or something and put heere
    status: c!.status,
    nextDate: c?.nextDate || null,
    tokenAddress: v?.tokenAddress || "",
    vendorContract: v?.vendorContract || "",
    paymentMethod: paymentMethod,
    billingInfo: c?.billingInfo || null,
    invoices: c?.invoices || [],
    webhookUrl: v!.webhookUrl || "",
    returnUrl: v!.returnUrl || "",
  };
  return res.send(data);
};

export const changePaymentMethod = async (
  req: CustomRequest,
  res: Response
) => {
  // update the new payment method in vendorclient
  // look for the given vendor id and client id in scheduledPayments entity
  // update the scheduledPayment to deduct from the new address
  const { newAddress } = req.body;
  if (!newAddress)
    return res
      .status(401)
      .json({ error: "User Address field cannot be empty" });

  const decoded = req.decoded;
  const vendorId = decoded.vendor;
  const clientId = decoded.vendorClient;
  const v = await findVendorById(vendorId);
  let c = await findVendorClientById(clientId);

  if (!v || !c)
    return res.status(404).json({ error: "Vendor or client id not found" });
  if (!c?.paymentMethod?.wallet)
    return res
      .status(401)
      .json({ error: "The user does not have a current payment method" });
  const sp = await findScheduledPayment(vendorId, clientId);
  if (!sp)
    return res.status(404).json({ error: "Unable to find scheduled payment" });

  const isScheduledPaymentUpdated = await updateScheduledPayment(
    sp,
    newAddress
  );
  if (!isScheduledPaymentUpdated)
    return res
      .status(500)
      .json({ error: "An error occured in updating the scheduled payment" });

  c!.paymentMethod!.wallet = newAddress;
  try {
    c = await c.save();
  } catch {
    return res
      .status(500)
      .json({ error: "An error occured in updating the vendor client" });
  }
  return res.send(c);
};

export const cancelSubscription = async (req: CustomRequest, res: Response) => {
  const decoded = req.decoded;
  const vendorId = decoded.vendor;
  const clientId = decoded.vendorClient;
  const v = await findVendorById(vendorId);
  let c = await findVendorClientById(clientId);

  if (!v || !c)
    return res.status(404).json({ error: "Vendor or client id not found" });

  const sp = await findScheduledPayment(vendorId, clientId);
  if (!sp)
    return res.status(404).json({ error: "Unable to find scheduled payment" });

  const isScheduledPaymentDeleted = await deleteScheduledPayment(sp);

  if (!isScheduledPaymentDeleted)
    return res
      .status(500)
      .json({ error: "An error occured in deleting the scheduled payment" });

  const newCompletedPayment: ICompletedPayment = new CompletedPayment({
    vendorContract: sp.vendorContract,
    userAddress: sp.userAddress,
    amount: sp.amount,
    tokenAddress: sp.tokenAddress,
    vendorId: sp.vendorClientId,
    vendorClientId: sp.vendorClientId,
    paymentDate: new Date(),
    status: "cancelled",
    remarks: "Cancelled Plan",
  });
  const isCompletedPaymentAdded = await addCompletedPayment(
    newCompletedPayment
  );

  if (!isCompletedPaymentAdded)
    return res
      .status(500)
      .json({ error: "An error occured in adding the completed payment" });

  c.status = "cancelled";

  try {
    await c.save();
  } catch {
    return res
      .status(500)
      .json({ error: "An error occured in updating the vendor client entity" });
  }

  const newPendingEndSubscription: IPendingEndSubscription =
    new PendingEndSubscription({
      endDate: c.nextDate!,
      vendorId: v._id.toString(),
      vendorClientId: c._id.toString(),
    });
  const addedPendingEndSubscription = await addPendingEndSubscription(
    newPendingEndSubscription
  );

  if (!addedPendingEndSubscription)
    return res.status(500).json({
      error: "An error occured in added the pending end subscription",
    });

  // send a webhook to inform vendor that user cancelled...
  const cancelSubscriptionWebhook = await sendWebHook(
    v.apiKey,
    v.webhookUrl!,
    "SUBSCRIPTION_CANCELLED",
    { vendorId: v._id, vendorClientId: c._id, endDate: c.nextDate! }
  );

  // if (!cancelSubscriptionWebhook)
  //   return res.status(401).json({ error: "Failed to send webhook" });

  return res.status(204).end();
};

export const renewSubscription = async (req: CustomRequest, res: Response) => {
  const { wallet } = req.body;
  if (!wallet)
    return res.status(401).json({ error: "Wallet field cannot be empty" });

  const decoded = req.decoded;
  const vendorId = decoded.vendor;
  const clientId = decoded.vendorClient;
  const v = await findVendorById(vendorId);
  let c = await findVendorClientById(clientId);

  let transactionHash;

  if (!v || !c)
    return res.status(404).json({ error: "Vendor or client id not found" });

  const paymentDetails = {
    vendorContract: v.vendorContract!,
    userAddress: wallet!,
    amount: v.amount!,
    tokenAddress: v.tokenAddress!,
    vendorId: vendorId,
    vendorClientId: clientId,
  };
  const currentDate = new Date();

  let schedluledPaymentDate;

  if (c.nextDate! > currentDate) {
    // means still have time in subscription
    schedluledPaymentDate = c.nextDate;
    const pendingEndSubscriptionToDelete = await findPendingEndSubscription(
      v._id.toString(),
      c._id.toString()
    );
    if (!pendingEndSubscriptionToDelete)
      return res
        .status(404)
        .json({ error: "Pending End Subscription not found" });
    const isDeleted = await deletePendingEndSubscription(
      pendingEndSubscriptionToDelete
    );
    if (!isDeleted)
      return res
        .status(500)
        .json({ error: "Unable to delete Pending End Subscription" });
  } else {
    // means subscription has expired
    const [sufficientAllowance, sufficientBalance] =
      await isAllowanceAndBalanceSufficient(
        wallet,
        v.tokenAddress!,
        v.vendorContract!,
        v.amount!
      );

    if (!sufficientAllowance || !sufficientBalance)
      return res.status(401).json({
        error: "Unable to proceed because of insufficient allowance or balance",
      });

    transactionHash = await sendReduceUserBalanceTransactionasync(
      v.vendorContract!,
      wallet,
      v.amount!.toString()
    );

    if (!transactionHash)
      return res.status(400).json({ error: "Deduction failed" });

    schedluledPaymentDate = moment().add(1, "months").toDate();

    c.nextDate = schedluledPaymentDate;
    c.invoices.push({
      date: currentDate,
      amount: v.amount!, // replace this
      token: "USDT",
      status: "paid",
      hash: `https://goerli.etherscan.io/tx/${transactionHash}`,
      invoice: "https://www.google.com/", // eventually put the actual invoice link
    });

    const newCompletedPayment: ICompletedPayment = new CompletedPayment({
      ...paymentDetails,
      status: "paid",
      hash: transactionHash,
    });
    const isCompletedPaymentAdded = await addCompletedPayment(
      newCompletedPayment
    );
    if (!isCompletedPaymentAdded)
      return res.status(500).json({ error: "Failed to add completed payment" });
  }

  // add the new scheduled payment
  const newScheduledPayment: IScheduledPayment = new ScheduledPayment({
    ...paymentDetails,
    paymentDate: schedluledPaymentDate,
  });
  const isNewScheduledPaymentAdded = await addScheduledPayment(
    newScheduledPayment
  );
  if (!isNewScheduledPaymentAdded)
    return res
      .status(500)
      .json({ error: "An error occured while adding the scheduled payment" });

  // update vendor client
  c.status = "active";
  c.paymentMethod!.wallet = wallet;
  try {
    c = await c.save();
  } catch (err) {
    return res
      .status(500)
      .json({ error: "An error occured while updating vendor client" });
  }
  // send webhook that user renew plan....
  const subscriptionRenewalWebhook = await sendWebHook(
    v.apiKey,
    v.webhookUrl!,
    "SUBSCRIPTION_RENEWED",
    {
      vendorId: v._id,
      vendorClientId: c._id,
      nextDate: c.nextDate!,
    }
  );

  const successfulPaymentWebhook = await sendWebHook(
    v.apiKey,
    v.webhookUrl!,
    "SUCCESSFUL_PAYMENT",
    { ...paymentDetails, paymentDate: currentDate, hash: transactionHash! }
  );

  // if (!subscriptionRenewalWebhook || !successfulPaymentWebhook)
  //   return res.status(401).json({ error: "Failed to send webhook" });
  return res.send(c);
};

export const updateVendorClientPaymentMethod = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const clientId = req.decoded.vendorClient;

    const billingInfo = req.body;

    let vendorClient = await VendorClient.findById(clientId);
    if (!vendorClient)
      return res.status(404).json({ error: "Vendor Client not found" });
    if (!billingInfo.name || !billingInfo.address || !billingInfo.email)
      return res.status(400).json({ error: "Cannot be empty" });

    vendorClient.billingInfo = billingInfo;

    vendorClient = await vendorClient.save();

    return res.send(vendorClient);
  } catch (error) {
    return res.status(500).json({ error: "Failed to update VendorClient" });
  }
};
