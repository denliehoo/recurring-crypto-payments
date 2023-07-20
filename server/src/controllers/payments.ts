import { Request, Response } from "express";
import { IVendor } from "../models/vendor";
import { findVendorById, findVendorClientById } from "../utility/findFromDb";
import { VendorClientSubscriptionDetails } from "../../../shared/types/VendorClientSubscriptionDetails";
import models from "../models";
const Web3 = require("web3");
import RecurringPayments from "../contractABIs/RecurringPayments.json";
const jwt = require("jsonwebtoken");

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
  req: Request,
  res: Response
) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_KEY, async (err: any, decoded: any) => {
      if (err) {
        return res.sendStatus(401);
        // return res.sendStatus(403) // Forbidden
      }
      // if the current time is greater than the expiration time (meaning token expired, redirect to login)
      if (Math.floor(Date.now() / 1000) > decoded.exp) {
        return res.status(401).json({ error: "Token expired" });
      }
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
    });
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // decrypt the token to get the info
};

export const initiateSubscription = async (req: Request, res: Response) => {
 // function does 3 things:
 // 1. Deduct the balance from user
 // 2. Update vendorclient (billinginfo,paymentmethod, nextdate, status, etc)
 // 3. schedules the next payment (API to aws or something)


 // get these from body later
 const vendorContract = "0xEff966e8fA76014FFBb88B1F356e991058eDdfee"
 const userAddress = "0x1B54FF756E2a04707826b95041C0e9123C6B4F23"
 const amount = "15000000" // 15 USDT

 // call to reduce balance
 // seems to be working
//  const isBalanceReduced = await sendReduceUserBalanceTransactionasync(vendorContract,userAddress, amount)

//  return res.send(isBalanceReduced)


  // try {
  //   const id = req.params.id;

  //   const { billingInfo, paymentMethod, nextDate, status } = req.body;
  //   let vendorClient = await VendorClient.findById(id);
  //   if (!vendorClient)
  //     return res.status(404).json({ error: "Vendor Client not found" });

  //   vendorClient.billingInfo = billingInfo;
  //   vendorClient.paymentMethod = paymentMethod;
  //   vendorClient.nextDate = nextDate;
  //   vendorClient.status = status;

  //   vendorClient = await vendorClient.save();

  //   return res.send(vendorClient);
  // } catch (error) {
  //   return res.status(500).json({ error: "Failed to update VendorClient" });
  // }
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
  const expirationTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour (in seconds)

  const token = jwt.sign({ ...data, exp: expirationTime }, process.env.JWT_KEY);
  return token;
};

const sendReduceUserBalanceTransactionasync = async (
  vendorAddress: string,
  userAddress: string,
  amount: string
): Promise<boolean> => {
  try {
    // Create a Web3 instance connected to a provider (e.g., Infura)
    console.log(process.env.WEB3_PROVIDER);
    console.log(process.env.OWNER_WALLET_ADDRESS);
    console.log(process.env.OWNER_PRIVATE_KEY);

    const web3 = new Web3(process.env.WEB3_PROVIDER);

    // Contract address and ABI of master contract
    const contractAddress = "0x8880DA75707ea777c0bdFBbF679b56cfac41a7d7";
    const contract = new web3.eth.Contract(RecurringPayments.abi, contractAddress);

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
    const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);

    console.log("Transaction receipt:", receipt);

    // Check if the transaction was successful
    return receipt.status === true;
  } catch (error) {
    console.error("Error:", error);
    return false; // Return false if an error occurred
  }
};


// const sendReduceUserBalanceTransactionasync = async (vendorAddress: string, userAddress: string, amount: string ) => {
//   try {
//     // Create a Web3 instance connected to a provider (e.g., Infura)
//     // refactor this to .env
//     console.log(process.env.WEB3_PROVIDER)
//     console.log(process.env.OWNER_WALLET_ADDRESS)
//       console.log(process.env.OWNER_PRIVATE_KEY)
  
//     const web3 = new Web3(
//       process.env.WEB3_PROVIDER
//     );

//     // Contract address and ABI of master contract
//     const contractAddress = "0x8880DA75707ea777c0bdFBbF679b56cfac41a7d7";
//     const contract = new web3.eth.Contract(
//       RecurringPayments.abi,
//       contractAddress
//     );

//     // Sender's account address and private key
//     const senderAddress = process.env.OWNER_WALLET_ADDRESS;
//     const senderPrivateKey = process.env.OWNER_PRIVATE_KEY;

//     // Transaction data
//     const contractMethod = contract.methods.reduceUserBalance(
//       vendorAddress,
//       userAddress,
//       amount
//     );
//     const transactionData = contractMethod.encodeABI();

//     // Nonce and gas price
//     const nonce = await web3.eth.getTransactionCount(senderAddress);
//     const gasPrice = await web3.eth.getGasPrice();
//     const gasPriceHex = web3.utils.toHex(gasPrice);
//     const gasLimitHex = web3.utils.toHex(300000); // Adjust the gas limit as needed

//     // Create the transaction object
//     const transactionObject = {
//       from: senderAddress,
//       to: contractAddress,
//       nonce: web3.utils.toHex(nonce),
//       gasPrice: gasPriceHex,
//       gasLimit: gasLimitHex,
//       data: transactionData,
//     };

//     // Sign the transaction
//     const signedTransaction = await web3.eth.accounts.signTransaction(
//       transactionObject,
//       senderPrivateKey
//     );

//     // Broadcast the signed transaction
//     const receipt = await web3.eth.sendSignedTransaction(
//       signedTransaction.rawTransaction
//     );

//     console.log("Transaction receipt:", receipt);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };
