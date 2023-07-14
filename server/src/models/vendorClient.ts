import mongoose, { Schema, Document } from "mongoose";

export interface IVendorClient extends Document {
  name: string;
  wallet: string;
  email: string;
  vendor: mongoose.Types.ObjectId; // Reference to the Vendor model
}

const vendorClientSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    wallet: { type: String, required: true }, // wallet address 0x....
    email: { type: String, required: true }, 
    vendor: { type: Schema.Types.ObjectId, ref: "Vendor", required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IVendorClient>("VendorClient", vendorClientSchema);
