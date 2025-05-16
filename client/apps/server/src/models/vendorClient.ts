import mongoose, { Schema, Document } from "mongoose";
import {
  BillingInfo,
  Invoice,
  PaymentMethod,
} from "../../../../../shared/types/VendorClientSubscriptionDetails";

export interface IVendorClient extends Document {
  vendor: mongoose.Types.ObjectId; // Reference to the Vendor model
  billingInfo: BillingInfo | null;
  paymentMethod: PaymentMethod | null;
  nextDate: Date | null;
  invoices: Invoice[];
  status: "inactive" | "active" | "cancelled" | "ended";
}
/*
  inactive: user has never subscribed before
  active: user is currently subscribed
  cancelled: user has cancelled subscription, but still has time left in their subscription
  ended: user has cancelled subscription and have no time left in subscription
  Note: if renew, satus will become active again
*/

const vendorClientSchema: Schema = new Schema(
  {
    vendor: { type: Schema.Types.ObjectId, ref: "Vendor", required: true },
    billingInfo: {
      name: { type: String },
      address: { type: String },
      email: { type: String },
    },
    paymentMethod: {
      token: { type: String },
      tokenAddress: { type: String },
      wallet: { type: String },
      sufficientAllowance: { type: Boolean },
      sufficientBalance: { type: Boolean },
    },
    nextDate: { type: Date, default: null },
    invoices: [
      {
        date: { type: Date },
        amount: { type: Number },
        token: { type: String },
        status: { type: String },
        hash: { type: String },
        invoice: { type: String },
      },
    ],
    status: {
      type: String,
      enum: ["inactive", "active", "cancelled", "ended"],
      default: "inactive",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IVendorClient>(
  "VendorClient",
  vendorClientSchema
);
