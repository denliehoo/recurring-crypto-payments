import mongoose, { Schema, Document } from "mongoose";

export interface IPayment {
  date: Date;
  amount: number;
  token: string;
  wallet: string;
}

export interface IVendorClient extends Document {
  name: string;
  wallet: string;
  email: string;
  vendor: mongoose.Types.ObjectId; // Reference to the Vendor model
  nextPaymentDate?: Date | null;
  payments?: IPayment[];
}

const vendorClientSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    wallet: { type: String, required: true }, // wallet address 0x....
    email: { type: String, required: true },
    vendor: { type: Schema.Types.ObjectId, ref: "Vendor", required: true },
    nextPaymentDate: { type: Date, default: null },
    // status: enum: cancelled inactive (never bought before) active
    payments: [
      {
        date: { type: Date, required: true },
        amount: { type: Number, required: true },
        token: { type: String, required: true },
        wallet: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IVendorClient>(
  "VendorClient",
  vendorClientSchema
);
