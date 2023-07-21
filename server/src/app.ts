require("dotenv").config();

import express, { Request, Response } from "express";
import routes from "./routes";
import models, { connectDb } from "./models";
import { hashPassword } from "./utility/credentials";
const cors = require("cors");

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express :)");
});

app.use(express.json());
app.use(cors());

app.use("/vendors", routes.vendor);
app.use("/vendorclients", routes.vendorClient);
app.use("/payments", routes.payments);

const port = 3030;

connectDb().then(async () => {
  // change to true/false if want to reset and seed db
  if (false) {
    console.log("Re-seeding database!");

    // clear database
    await Promise.all([
      // models.Project.deleteMany({}),
      models.Vendor.deleteMany({}),
      models.VendorClient.deleteMany({}),
      models.CompletedPayment.deleteMany({}),
      models.ScheduledPayment.deleteMany({}),
      // models.Task.deleteMany({}),
    ]);
    await seedDataBase();
  }

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});

const seedDataBase = async () => {
  const testPassword = await hashPassword("Testing1234!");
  const testApiKeys =
    "sk-ac469da4-37bf-4930-9750-38e36d209877d20b4e27-dac5-4959-ad54-42940bf05f7e3a0cda4a-dd1b-4c04-802b-7676ea76ed2b";
  const testVendor = new models.Vendor({
    name: "Test Company",
    email: "test@test.com",
    password: testPassword,
    apiKey: testApiKeys,
    tokenAddress: "0xC2CA4DFa527902c440d71F162403A3BB93045a24",
    vendorContract: "0xEff966e8fA76014FFBb88B1F356e991058eDdfee",
    amount: 15000000, // 15 USDT
    plan: "Testing Company Premium Plan",
  });

  await testVendor.save();

  const vendorClient = new models.VendorClient({
    vendor: testVendor._id.toString(),
  });
  await vendorClient.save();
};
