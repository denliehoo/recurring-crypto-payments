import type { Vendor } from '@core/types/Vendor';
import mongoose, { Schema, type Document } from 'mongoose';

export interface IVendor extends Document, Omit<Vendor, '_id'> {}
// for now we assume that it is a monthly basis
// whereby tokenaddress is which addrss of the token and amount is how much
// per month. Furthermore, we assume that network is Sepolia
const VendorSchema: Schema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    apiKey: { type: String, required: true, unique: true },
    webhookUrl: { type: String },
    returnUrl: { type: String },
    tokenAddress: { type: String },
    amount: { type: Number },
    vendorContract: { type: String },
    plan: { type: String },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.model<IVendor>('Vendor', VendorSchema);
