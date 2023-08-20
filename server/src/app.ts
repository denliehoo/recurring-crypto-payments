require("dotenv").config();

import express, { Request, Response } from "express";
import routes from "./routes";
import models, { connectDb } from "./models";
import { hashPassword } from "./utility/credentials";
import mongoose from "mongoose";
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/vendors", routes.vendor);
app.use("/vendorclients", routes.vendorClient);
app.use("/payments", routes.payments);
app.use("/externalPage", routes.externalPage);

const port = process.env.PORT || 3030;

app.get("/", async (req: Request, res: Response) => {
  res.send("RecurCrypt Server");
});

connectDb().then(async () => {
  // change to true/false if want to reset and seed db
  if (false) {
    console.log("Re-seeding database!");
    // drops all collection
    // dropAllCollections()

    // clear database
    await Promise.all([
      models.Vendor.deleteMany({}),
      models.VendorClient.deleteMany({}),
      models.CompletedPayment.deleteMany({}),
      models.ScheduledPayment.deleteMany({}),
    ]);
    await seedDataBase();
  }

  app.listen(port, () => console.log(`Server listening on port ${port}!`));
});

const seedDataBase = async () => {
  const testPassword = await hashPassword("Testing1234!");
  const testApiKeys =
    "sk-ac469da4-37bf-4930-9750-38e36d209877d20b4e27-dac5-4959-ad54-42940bf05f7e3a0cda4a-dd1b-4c04-802b-7676ea76ed2b";
  const testVendor = new models.Vendor({
    name: "Test Company",
    email: "test@test.com",
    isVerified: true,
    password: testPassword,
    apiKey: testApiKeys,
    tokenAddress: "0xC2CA4DFa527902c440d71F162403A3BB93045a24",
    vendorContract: "0xEf8dfbCa537FEF7B71d0F37b404E8fc770Ac807E",
    amount: 15000000, // 15 USDT
    plan: "Testing Company Premium Plan",
    webhookUrl: "http://localhost:3001/payments/recurcrypt/webhook",
    returnUrl: "http://localhost:3000/returnUrl",
  });

  await testVendor.save();

  const vendorClient = new models.VendorClient({
    vendor: testVendor._id.toString(),
  });
  await vendorClient.save();

  // const scheduledPaymentDetails = {
  //   vendorContract: testVendor.vendorContract,
  //   userAddress: "0x1B54FF756E2a04707826b95041C0e9123C6B4F23", // temp hard code
  //   amount: testVendor.amount,
  //   tokenAddress: testVendor.tokenAddress,
  //   vendorId: testVendor._id.toString(),
  //   vendorClientId: vendorClient._id.toString(),
  // };
  // const scheduledPayment1 = new models.ScheduledPayment({
  //   ...scheduledPaymentDetails,
  //   paymentDate: new Date(),
  // });
  // const scheduledPayment2 = new models.ScheduledPayment({
  //   ...scheduledPaymentDetails,
  //   paymentDate: new Date(Date.now() + 5 * 60000), // 5 minutes from now
  // });
  // // this shouldnt be inside when calling the CRON API since its >60mins
  // const scheduledPayment3 = new models.ScheduledPayment({
  //   ...scheduledPaymentDetails,
  //   paymentDate: new Date(Date.now() + 60 * 24 * 60000), // 1 day from now
  // });
  // scheduledPayment1.save();
  // scheduledPayment2.save();
  // scheduledPayment3.save();
};

const dropAllCollections = async () => {
  try {
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    const collectionNames = collections.map((collection) => collection.name);

    // Drop each collection
    for (const collectionName of collectionNames) {
      await mongoose.connection.db.dropCollection(collectionName);
      console.log(`Dropped collection: ${collectionName}`);
    }

    console.log("All collections dropped successfully");
  } catch (error) {
    console.error("Error dropping collections:", error);
  }
};
