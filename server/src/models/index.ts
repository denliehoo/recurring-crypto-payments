import mongoose from "mongoose";
import Vendor from "./vendor";
import VendorClient from "./vendorClient";
import ScheduledPayment from "./scheduledPayment";
import CompletedPayment from "./completedPayment";
import Payout from "./payout";
import PendingEndSubscription from "./pendingEndSubscription";

const dbUrl = process.env.DB_URL;

if (!dbUrl) {
  throw new Error("DB_URL environment variable is not set");
}

const connectDb = () => {
  return mongoose.connect(dbUrl); //refactor this eventually
};

// import more models here in the future
const models = {
  Vendor,
  VendorClient,
  ScheduledPayment,
  CompletedPayment,
  Payout,
  PendingEndSubscription,
};

export { connectDb };

export default models;
