import { Request, Response } from "express";
import { IVendor } from "../models/vendor";
import {
  findVendorByEmail,
  findVendorById,
  findVendorClientById,
} from "../utility/findFromDb";
import { VendorClientSubscriptionDetails } from "../../../shared/types/VendorClientSubscriptionDetails";
import models from "../models";
const Web3 = require("web3");
import RecurringPayments from "../contractABIs/RecurringPayments.json";
import RecurringPaymentsVendor from "../contractABIs/RecurringPaymentsVendor.json";
import FakeUSDT from "../contractABIs/FakeUSDT.json";
import { CustomRequest } from "../types/requests";
import { IScheduledPayment } from "../models/scheduledPayment";
import { ICompletedPayment } from "../models/completedPayment";
import axios from "axios";
import { IPayout } from "../models/payout";
const jwt = require("jsonwebtoken");
const moment = require("moment");

const { Vendor, VendorClient, ScheduledPayment, CompletedPayment, Payout } =
  models;
export const manageSubscription = async (req: Request, res: Response) => {
  // should mandate that the API is called with some sort of token
  // from the vendor

  const vendor = await Vendor.find();
  const vendorClient = await VendorClient.find();
  // get these from req.body in the future
  const data = {
    vendor: vendor[0]._id.toString(),
    vendorClient: vendorClient[0]._id.toString(),
  };

  const token = generateJWT(data);
  const baseUrl = "http://localhost:3001";
  return res.send({ url: `${baseUrl}/manage-subscription/${token}` });
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
  console.log(v);
  console.log(c);
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
      console.log("no save needed");
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
  };
  return res.send(data);
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
  console.log(vendorClient);
  console.log(vendor);

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
    return res.status(500).json({ error: "Failed to update VendorClient" });
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

  // return at end
  return res.send(vendorClient);
};

// change payment method of client
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
  console.log(v);
  console.log(c);
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

// the cron job runs this every X minutes
export const cronReduceBalances = async (req: Request, res: Response) => {
  // Get the date 60 minutes into the future
  const futureDate = new Date(new Date().getTime() + 60 * 60000);
  // filter to see all the scheduled payments that are due in less than 60 mins
  const paymentsDue: IScheduledPayment[] = await ScheduledPayment.find({
    paymentDate: {
      $lt: futureDate, // means less than
    },
  });
  if (paymentsDue.length === 0) return res.status(204).end();
  for (let p of paymentsDue) {
    let isSuccessful = false;
    const paymentDetails = {
      vendorContract: p.vendorContract,
      userAddress: p.userAddress,
      amount: p.amount,
      tokenAddress: p.tokenAddress!,
      vendorId: p.vendorId,
      vendorClientId: p.vendorClientId,
    };

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
        const newCompletedPayment: ICompletedPayment = new CompletedPayment({
          ...paymentDetails,
          paymentDate: new Date(),
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
          paymentDate: moment().add(1, "months").toDate(),
        });
        const isNewScheduledPaymentAdded = await addScheduledPayment(
          newScheduledPayment
        );
        if (!isNewScheduledPaymentAdded) continue;

        // Send a webhook to vendor that it is paid
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
      vendorClient.status = "cancelled";
      try {
        vendorClient.save();
      } catch {
        continue;
      }

      // Send a webhook to vendor that payment failed;
    }
  }
  // return a successful response
  return res.send("all done");
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

  if(!isScheduledPaymentDeleted) return res
      .status(500)
      .json({ error: "An error occured in deleting the scheduled payment" });
  
  // "move" the data to completedPayment with status "failed"
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
  
  if (!isCompletedPaymentAdded) return res.status(500).json({ error: "An error occured in adding the completed payment" });

  c.status = 'cancelled';

  try{
    await c.save()
  } catch{
    return res
      .status(500)
      .json({ error: "An error occured in updating the vendor client entity" });
  }     

  // send a webhook to inform vendor that user cancelled...
  // ...

  return res.status(204).end()
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
    }))
    .concat(completedPayments)
    .sort(
      (a: any, b: any) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

  return res.send(results);
};

// helpers
const generateJWT = (data: any) => {
  // Set the expiration time for the JWT token (e.g., 1 hour from now)
  // if want to change the time, change the 3600 (which is 60s * 60 min = 3600s = 1 hr)
  // const expirationTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour (in seconds)
  const expirationTime = Math.floor(Date.now() / 1000) + 36000; // 10 hour (in seconds) temp put this as 10 hrs for testing

  const token = jwt.sign({ ...data, exp: expirationTime }, process.env.JWT_KEY);
  return token;
};

const isAllowanceAndBalanceSufficient = async (
  userAddress: string,
  vendorTokenAddress: string,
  vendorContractAddress: string,
  amount: number
): Promise<[boolean, boolean]> => {
  const web3 = new Web3(process.env.WEB3_PROVIDER!);
  const tokenContract = new web3.eth.Contract(FakeUSDT.abi, vendorTokenAddress);

  const balance: string = await tokenContract.methods
    .balanceOf(userAddress)
    .call();
  const allowance: string = await tokenContract.methods
    .allowance(userAddress, vendorContractAddress)
    .call();

  const sufficientAllowance: boolean = parseFloat(allowance) >= amount;
  const sufficientBalance: boolean = parseFloat(balance) >= amount;

  return [sufficientAllowance, sufficientBalance];
};

const findScheduledPayment = async (
  vendorId: string,
  vendorClientId: string
): Promise<IScheduledPayment | null> => {
  try {
    // Find the scheduled payment with matching vendorId and vendorClientId
    const scheduledPayment = await ScheduledPayment.findOne({
      vendorId,
      vendorClientId,
    });

    // Return the scheduled payment or null if not found
    return scheduledPayment;
  } catch (error) {
    console.error("Error finding scheduled payment:", error);

    // Return null if there was an error
    return null;
  }
};

const addScheduledPayment = async (
  scheduledPayment: IScheduledPayment
): Promise<boolean> => {
  try {
    await scheduledPayment.save();

    return true;
  } catch (error) {
    console.error("Error adding scheduled payment:", error);

    return false;
  }
};

const deleteScheduledPayment = async (
  scheduledPayment: IScheduledPayment
): Promise<boolean> => {
  try {
    await scheduledPayment.deleteOne();

    return true;
  } catch (error) {
    console.error("Error deleting scheduled payment:", error);

    return false;
  }
};

// generally only used for changing payment method, hence just change userAddress
const updateScheduledPayment = async (
  scheduledPayment: IScheduledPayment,
  userAddress: string
): Promise<boolean> => {
  try {
    // Update the userAddress field
    scheduledPayment.userAddress = userAddress;

    await scheduledPayment.save();

    return true;
  } catch (error) {
    console.error("Error updating scheduled payment:", error);

    return false;
  }
};

const addCompletedPayment = async (
  completedPayment: ICompletedPayment
): Promise<boolean> => {
  try {
    await completedPayment.save();

    return true;
  } catch (error) {
    console.error("Error adding completed payment:", error);

    return false;
  }
};

/*
          {
            event: "XXXXX",
            timestamp: "USENEWDATEORSMTH",
            data: {
              // data1: "XXXX",
              // data2 : "YYY"
            }
          }
*/
const sendWebHook = async (url: string, event: string, data: any) => {
  try {
    const headers = {
      Authorization: "authorizationhere....",
    };
    const bodyData = {
      event: event,
      data: data,
    };
    const res = await axios.post(url, bodyData, {
      headers,
    });
  } catch {
    return false;
  }
};

const sendReduceUserBalanceTransactionasync = async (
  vendorAddress: string,
  userAddress: string,
  amount: string
): Promise<string | null> => {
  try {
    // Create a Web3 instance connected to a provider (e.g., Infura)
    const web3 = new Web3(process.env.WEB3_PROVIDER);

    // Contract address and ABI of master contract
    const contractAddress = "0x92971a37d9ea86ad18591A0f86A90E273439F19e";
    const contract = new web3.eth.Contract(
      RecurringPayments.abi,
      contractAddress
    );

    const senderAddress = process.env.OWNER_WALLET_ADDRESS;
    const senderPrivateKey = process.env.OWNER_PRIVATE_KEY;

    const contractMethod = contract.methods.reduceUserBalance(
      vendorAddress,
      userAddress,
      amount
    );
    const transactionData = contractMethod.encodeABI();

    const nonce = await web3.eth.getTransactionCount(senderAddress);
    let gasPrice = await web3.eth.getGasPrice();
    // Add 20% to the gas price to reduce chances of timeout error
    // since higher gas price = faster mined (temporary solution)
    // parseInt to ensure no decimals (which would cause errors)
    gasPrice = Math.ceil(parseInt(gasPrice) * 1.2);
    const gasPriceHex = web3.utils.toHex(gasPrice);
    const gasLimitHex = web3.utils.toHex(300000);

    const transactionObject = {
      from: senderAddress,
      to: contractAddress,
      nonce: web3.utils.toHex(nonce),
      gasPrice: gasPriceHex,
      gasLimit: gasLimitHex,
      data: transactionData,
    };

    const signedTransaction = await web3.eth.accounts.signTransaction(
      transactionObject,
      senderPrivateKey
    );

    // Broadcast the signed transaction
    // wait for up to 100 blocks (default 50); this is to prevent error from being thrown
    // however still need to handle the problem properly in the future
    // e.g. leave it as pending
    const receipt = await web3.eth
      .sendSignedTransaction(signedTransaction.rawTransaction, {
        transactionConfirmationBlocks: 100,
      })
      .on("transactionHash", function (hash: any) {
        // can get the hash even if transaction times out
        // might be useful for edge case
        // console.log(hash);
      });

    console.log("Transaction receipt:", receipt);

    // Check if the transaction was successful
    if (receipt.status === true) {
      return receipt.transactionHash;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

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
