import { Request, Response } from "express";
import { IVendor } from "../models/vendor";
import { findVendorById, findVendorClientById } from "../utility/findFromDb";
import { VendorClientSubscriptionDetails } from "../../../shared/types/VendorClientSubscriptionDetails";
import models from "../models";
const Web3 = require("web3");
import RecurringPayments from "../contractABIs/RecurringPayments.json";
import { CustomRequest } from "../types/requests";
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
  const c = await findVendorClientById(clientId);
  if (!v || !c)
    return res.status(401).json({ error: "Vendor or client id not found" });
  console.log(v);
  console.log(c);
  // need check whether balance and allowance is sufficient here also
  // if there is a change, then need to update the client also

  const data: VendorClientSubscriptionDetails = {
    vendor: v!.name,
    plan: v!.plan || "",
    amount: v!.amount || 0,
    token: "USDT", // get the token name via api or something and put heere
    status: c!.status,
    nextDate: c?.nextDate || null,
    tokenAddress: v?.tokenAddress || "",
    vendorContract: v?.vendorContract || "",
    paymentMethod: c?.paymentMethod || null,
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
  // function does 3 things:
  // 1. Deduct the balance from user
  // 2. Update vendorclient (billinginfo,paymentmethod, nextdate, status, etc)
  // 3. schedules the next payment (API to aws or something)
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

  // return at end
  return res.send(vendorClient);
};

export const changePaymentMethod = async (req: Request, res: Response) => {
  // change payment method of client
};

// the cloud server is the one that calls this (?)
export const paymentReceived = async (req: Request, res: Response) => {
  // add payment to client entity
  // send an api to the webhook url to let them know payments created
};

export const cancelSubscription = async (req: Request, res: Response) => {
  // cancel subscription details ....
  // change next payment date to null
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
