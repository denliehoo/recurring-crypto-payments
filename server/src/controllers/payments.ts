import { Request, Response } from "express";
import Vendor, { IVendor } from "../models/vendor";

export const manageSubscription = async (req: Request, res: Response) => {
  // just use the client id as a checkout session
  // return redirect to webpage to handle payments
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
