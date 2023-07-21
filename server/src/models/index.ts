import mongoose from "mongoose";
import Vendor from "./vendor";
import VendorClient from "./vendorClient";
import ScheduledPayment from "./scheduledPayment";
import CompletedPayment from "./completedPayment";

const dbUrl = process.env.DB_URL;

if (!dbUrl) {
  throw new Error("DB_URL environment variable is not set");
}

const connectDb = () => {
  return mongoose.connect(dbUrl); //refactor this eventually
};

const models = { Vendor, VendorClient, ScheduledPayment, CompletedPayment }; // import more models here in the future

export { connectDb };

export default models;
