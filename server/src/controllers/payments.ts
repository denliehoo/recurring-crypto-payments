import { Request, Response } from "express";
import Vendor, { IVendor } from "../models/vendor";
// import { VendorClientSubscriptionDetails } from "../../../shared/types/VendorClientSubscriptionDetails";
const jwt = require("jsonwebtoken");

export const manageSubscription = async (req: Request, res: Response) => {
  // should mandate that the API is called with some sort of token
  // from the vendor

  // return redirect to webpage to handle payments
  // send the link as localhost3001/manage-subscription/xxxxxtokenherexxx
  // then, when in that page, send that token as in the api to decrypt
  // and get vendor and vendor client info, and then return them
  // relevant details (in getSubscriptionPageDetails)
  const data = {
    vendor: "64b65102922feb7846fc2324",
    vendorClient: "64b65102922feb7846fc2326",
  };

  const token = generateJWT(data);
  res.send(token);
};

export const getSubscriptionPageDetails = async (
  req: Request,
  res: Response
) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_KEY, (err: any, decoded: any) => {
      if (err) {
        return res.sendStatus(401);
        // return res.sendStatus(403) // Forbidden
      }
      // if the current time is greater than the expiration time (meaning token expired, redirect to login)
      if (Math.floor(Date.now() / 1000) > decoded.exp) {
        return res.status(401).json({ error: "Token expired" });
      }
      // continue from here....

      // const data: VendorClientSubscriptionDetails = {
      //   vendor: "Company Test Name",
      //   plan: "Company Name Premium Subscription",
      //   amount: "20",
      //   token: "USDT",
      //   status: "inactive", // enum: active, inactive, cancelled
      //   nextDate: null, //do a timestamp instead
      //   tokenAddress: "0xC2CA4DFa527902c440d71F162403A3BB93045a24",
      //   vendorContract: vendorContract,
      //   paymentMethod: null,
      //   billingInfo: null,
      //   invoices: [],
      // }
      return res.send(decoded);
    });
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // decrypt the token to get the info
};

export const initiateSubscription = async (req: Request, res: Response) => {
  // attempt to deduct from wallet
  // if deduct from wallet, set next payment date
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
