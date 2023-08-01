import mongoose, { Schema } from "mongoose";
import { IScheduledPayment, scheduledPaymentSchema } from "./scheduledPayment";

export interface ICompletedPayment extends IScheduledPayment {
  status: "paid" | "failed" | "cancelled";
  hash: string | null;
  remarks: string | null;
}

const completedPaymentSchema: Schema = new Schema<ICompletedPayment>({
  status: { type: String, enum: ["paid", "failed", "cancelled"], required: true },
  hash: { type: String, default: null },
  remarks: { type: String, default: null },

});

completedPaymentSchema.add(scheduledPaymentSchema);

export default mongoose.model<ICompletedPayment>(
  "CompletedPayment",
  completedPaymentSchema
);
