import mongoose, { Schema, Document } from "mongoose";

export interface IVendor extends Document {
  name: string;
  email: string;
  password: string;
  apiKey: string;
  webhookUrl?: string;
  tokenAddress?: string;
  amount?: number;
  vendorContract?: string;
}
// for now we assume that it is a monthly basis
// whereby tokenaddress is which addrss of the token and amount is how much
// per month. Furthermore, we assume that network is Goerli
const VendorSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    apiKey: { type: String, required: true, unique: true },
    webhookUrl: { type: String, unique: true },
    tokenAddress: { type: String },
    amount: { type: Number },
    vendorContract: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IVendor>("Vendor", VendorSchema);
