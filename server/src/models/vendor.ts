import mongoose, { Schema, Document } from "mongoose";

export interface IVendor extends Document {
  name: string;
  email: string;
  password: string;
  apiKey: string;
  webhookUrl?: string;
}

const VendorSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    apiKey: { type: String, required: true, unique: true },
    webhookUrl: { type: String, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model<IVendor>("Vendor", VendorSchema);
