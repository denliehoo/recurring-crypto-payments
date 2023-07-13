import mongoose from "mongoose";
import User from "./user";

const connectDb = () => {
  return mongoose.connect("mongodb://127.0.0.1:27017/recurring-crypto-payments"); //refactor this eventually
};

const models = { User }; // import more models here in the future

export { connectDb };

export default models;