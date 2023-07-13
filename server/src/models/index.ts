import mongoose from "mongoose";
import User from "./user";

const dbUrl = process.env.DB_URL;

if (!dbUrl) {
  throw new Error("DB_URL environment variable is not set");
}

const connectDb = () => {
  return mongoose.connect(dbUrl); //refactor this eventually
};

const models = { User }; // import more models here in the future

export { connectDb };

export default models;
