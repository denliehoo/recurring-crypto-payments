require("dotenv").config();

import express, { Request, Response } from "express";
import routes from "./routes";
import models, { connectDb } from "./models";
import { hashPassword } from "./utility/credentials";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express :)");
});

app.use(express.json());

app.use("/vendors", routes.vendor);
app.use("/vendorclients", routes.vendorClient);

const port = 3030;

connectDb().then(async () => {
  // change to true/false if want to reset and seed db
  if (true) {
    console.log("Re-seeding database!");

    // clear database
    await Promise.all([
      // models.Project.deleteMany({}),
      models.Vendor.deleteMany({}),
      models.VendorClient.deleteMany({}),
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
    name: "Test User",
    email: "test@test.com",
    password: testPassword,
    apiKey: testApiKeys,
  });

  await testVendor.save();

  const vendorClient = new models.VendorClient({
    name: "Vendor Client1",
    email: "vendorclient@test.com",
    wallet: "0xtesting1234",
    vendor: testVendor._id.toString(),
  });
  await vendorClient.save();
};
