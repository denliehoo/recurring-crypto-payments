import { Request, Response } from "express";
import { IVendor } from "../models/vendor";
import { findVendorById, findVendorClientById } from "../utility/findFromDb";
import { VendorClientSubscriptionDetails } from "../../../shared/types/VendorClientSubscriptionDetails";
import models from "../models";
// import { VendorClientSubscriptionDetails } from "../../../shared/types/VendorClientSubscriptionDetails";
const jwt = require("jsonwebtoken");

const {Vendor, VendorClient} = models
export const manageSubscription = async (req: Request, res: Response) => {
  // should mandate that the API is called with some sort of token
  // from the vendor

  const vendor = await Vendor.find();
  const vendorClient = await VendorClient.find()
  // get these from req.body in the future
  const data = {
    vendor: vendor[0]._id.toString(),
    vendorClient: vendorClient[0]._id.toString(),
  };

  const token = generateJWT(data);
  const baseUrl = 'http://localhost:3001'
  return res.send({url: `${baseUrl}/manage-subscription/${token}`})
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
      const c = await findVendorClientById(clientId)
      if(!v || !c) return res.status(401).json({error: "Vendor or client id not found"})
      console.log(v)
      console.log(c)
      // continue from here....
      const data: VendorClientSubscriptionDetails = {
        vendor: v!.name,
        plan: v!.plan || '',
        amount: v!.amount || 0,
        token: 'USDT', // get the token name via api or something and put heere
        status: c!.status,
        nextDate: c?.nextDate || null,
        tokenAddress: v?.tokenAddress || '',
        vendorContract: v?.vendorContract || '',
        paymentMethod: c?.paymentMethod || null,
        billingInfo: c?.billingInfo || null,
        invoices: c?.invoices || [],
      };
      return res.send(data)
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
