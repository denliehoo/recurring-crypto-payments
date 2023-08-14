import mongoose from "mongoose";
import Vendor from "./vendor";
import VendorClient from "./vendorClient";
import ScheduledPayment from "./scheduledPayment";
import CompletedPayment from "./completedPayment";
import Payout from "./payout";
import PendingEndSubscription from "./pendingEndSubscription";

const dbUrl = "mongodb://127.0.0.1:27017/recurring-crypto-payments";
// const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/recurring-crypto-payments";

const connectDb = () => {
  console.log(`connected through db: ${dbUrl}`);
  return mongoose.connect(dbUrl);
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
