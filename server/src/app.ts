require("dotenv").config();

import express, { Request, Response } from "express";
import routes from "./routes";
import models, { connectDb } from "./models";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express :)");
});

app.use(express.json());

app.use("/vendors", routes.vendor);

const port = 3030;
connectDb().then(async () => {
  // change to true/false if want to reset and seed db
  if (true) {
    console.log("Re-seeding database!");

    // clear database
    await Promise.all([
      // models.Project.deleteMany({}),
      models.Vendor.deleteMany({}),
      // models.Task.deleteMany({}),
    ]);
    // await seedDataBase()
  }

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
