import { Request, Response } from "express";
import { IVendor } from "../models/vendor";
import { findVendorById, findVendorClientById } from "../utility/findFromDb";
import { VendorClientSubscriptionDetails } from "../../../shared/types/VendorClientSubscriptionDetails";
import models from "../models";
const Web3 = require("web3");
import RecurringPayments from "../contractABIs/RecurringPayments.json";
import FakeUSDT from "../contractABIs/FakeUSDT.json";
import { CustomRequest } from "../types/requests";
import { IScheduledPayment } from "../models/scheduledPayment";
import { ICompletedPayment } from "../models/completedPayment";
const jwt = require("jsonwebtoken");
const moment = require("moment");

const { Vendor, VendorClient } = models;
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
  if (!v || !c)
    return res.status(401).json({ error: "Vendor or client id not found" });
  // need check whether balance and allowance is sufficient here also
  // if there is a change, then need to update the client also
  let paymentMethod;
  if (c.paymentMethod) {
    // call api to check this
    const userAddress = c.paymentMethod.wallet;
    const web3 = new Web3(process.env.WEB3_PROVIDER);
    const tokenContract = new web3.eth.Contract(FakeUSDT.abi, v.tokenAddress);
    const balance = await tokenContract.methods.balanceOf(userAddress).call();
    const allowance = await tokenContract.methods
      .allowance(userAddress, v.vendorContract)
      .call();

    const sufficientAllowance = parseFloat(allowance) >= v.amount!;
    const sufficientBalance = parseFloat(balance) >= v.amount!;
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
    vendor: v!.name,
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

  // decrypt the token to get the info
};

export const initiateSubscription = async (
  req: CustomRequest,
  res: Response
) => {
  // function does 4 things:
  // 1. Deduct the balance from user
  // 2. Update vendorclient (billinginfo,paymentmethod, nextdate, status, etc)
  // 3. schedules the next payment (API to aws or something)
  // 4. send a webhook
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

  // const vendorContract = "0xEff966e8fA76014FFBb88B1F356e991058eDdfee";
  // const userAddress = "0x1B54FF756E2a04707826b95041C0e9123C6B4F23";
  // const amount = "15000000"; // 15 USDT
  const vendorContract = vendor?.vendorContract!;
  const amount = vendor.amount!.toString(); // 15 USDT

  // 1. reduces user balance
  const transactionHash = await sendReduceUserBalanceTransactionasync(
    vendorContract,
    userAddress,
    amount
  );

  if (!transactionHash)
    return res.status(400).json({ error: "Deduction failed" });

  // 2. update vendorClient
  try {
    vendorClient.billingInfo = billingInfo;
    vendorClient.paymentMethod = paymentMethod;
    vendorClient.nextDate = moment().add(1, "months").toDate();
    vendorClient.status = "active";
    vendorClient.invoices = [
      {
        date: new Date(),
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
  // 3. schedule next payment

  // 4. send a webhook to vendor that subscription should begin and payment received

  // return at end
  return res.send(vendorClient);
};

// change payment method of client
export const changePaymentMethod = async (req: Request, res: Response) => {
  // update the new payment method in vendorclient
  // look for the given vendor id and client id in scheduledPayments entity
  // update the scheduledPayment to deduct from the new address
};

// the cron job runs this every X minutes
export const cronReduceBalances = async (req: Request, res: Response) => {
/* 
- Filter to see scheduledPayments who which are due within X minutes
- Loop through all those payments and for each of it:
  - Check balance and allowance. If sufficient,
  - Execute the reduce balance function, and if successful:
    - "move" the data to completedPayments with status "paid"
    - delete the data for that in scheduledPayment
    - Send a webhook to vendor that it is paid
    - Add a new scheduledPayment for next month
  - Else, if unsuccessful or insufficient allowance/balance:
    - "move" the data to completedPayment with status "failed"
    - delete the data for that in scheduledPayments
    - Send a webhook to vendor that payment failed
    - Update that client entity status to "cancelled" (we take it as they cancel if they failed to pay)
*/
  
};

export const cancelSubscription = async (req: Request, res: Response) => {
  // cancel subscription details ....
  // look for the given vendor id and client id in scheduledPayments
  // delete that data
  // send a webhook to let vendor know
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

const findScheduledPayments = async (vendorId: string, vendorClientId: string) =>{
  // find in scheduled payments...
}

const addScheduledPayment = async (scheduledPaymentDetails: IScheduledPayment) =>{
  // add it...
}

const deleteScheduledPayment = async(scheduledPaymentId: string) =>{
  // delete it....
}

// generally only used for changing payment method, hence just change userAddress
const updateScheduledPayment = async(scheduledPaymentId: string, userAddress: string) =>{
  // update it...
}

const addCompletedPayment = async(completedPaymentDetails: ICompletedPayment ) =>{
  // add the Finished payments; details should be everything in scheduledPayment along with hash and status
}

const sendReduceUserBalanceTransactionasync = async (
  vendorAddress: string,
  userAddress: string,
  amount: string
): Promise<string | null> => {
  try {
    // Create a Web3 instance connected to a provider (e.g., Infura)
    console.log(process.env.WEB3_PROVIDER);
    console.log(process.env.OWNER_WALLET_ADDRESS);
    console.log(process.env.OWNER_PRIVATE_KEY);

    const web3 = new Web3(process.env.WEB3_PROVIDER);

    // Contract address and ABI of master contract
    const contractAddress = "0x8880DA75707ea777c0bdFBbF679b56cfac41a7d7";
    const contract = new web3.eth.Contract(
      RecurringPayments.abi,
      contractAddress
    );

    // Sender's account address and private key
    const senderAddress = process.env.OWNER_WALLET_ADDRESS;
    const senderPrivateKey = process.env.OWNER_PRIVATE_KEY;

    // Transaction data
    const contractMethod = contract.methods.reduceUserBalance(
      vendorAddress,
      userAddress,
      amount
    );
    const transactionData = contractMethod.encodeABI();

    // Nonce and gas price
    const nonce = await web3.eth.getTransactionCount(senderAddress);
    const gasPrice = await web3.eth.getGasPrice();
    const gasPriceHex = web3.utils.toHex(gasPrice);
    const gasLimitHex = web3.utils.toHex(300000); // Adjust the gas limit as needed

    // Create the transaction object
    const transactionObject = {
      from: senderAddress,
      to: contractAddress,
      nonce: web3.utils.toHex(nonce),
      gasPrice: gasPriceHex,
      gasLimit: gasLimitHex,
      data: transactionData,
    };

    // Sign the transaction
    const signedTransaction = await web3.eth.accounts.signTransaction(
      transactionObject,
      senderPrivateKey
    );

    // Broadcast the signed transaction
    const receipt = await web3.eth.sendSignedTransaction(
      signedTransaction.rawTransaction
    );

    console.log("Transaction receipt:", receipt);

    // Check if the transaction was successful
    if (receipt.status === true) {
      return receipt.transactionHash;
    } else {
      return null; // Return null if the transaction failed
    }
  } catch (error) {
    console.error("Error:", error);
    return null; // Return false if an error occurred
  }
};
