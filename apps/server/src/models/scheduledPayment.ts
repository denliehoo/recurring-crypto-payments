import type { ScheduledPayment } from '@core/types';
import mongoose, { Schema, type Document } from 'mongoose';

export interface IScheduledPayment
  extends Omit<ScheduledPayment, 'vendorId' | 'vendorClientId' | '_id'>,
    Document {
  vendorContract: string;
  userAddress: string;
  amount: number;
  tokenAddress: string;
  paymentDate: Date;
  vendorId: mongoose.Types.ObjectId;
  vendorClientId: mongoose.Types.ObjectId;
  // Manually input field for type completion created by {timestamps: true}
  createdAt: Date;
  updatedAt: Date;
}

export const scheduledPaymentSchema: Schema = new Schema(
  {
    vendorContract: { type: String, required: true },
    userAddress: { type: String, required: true },
    amount: { type: Number, required: true },
    tokenAddress: { type: String, required: true },
    paymentDate: { type: Date, required: true },
    vendorId: { type: Schema.Types.ObjectId, required: true },
    vendorClientId: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true },
);

// index paymentDate to improve performance since it will be queried frequently
scheduledPaymentSchema.index({ paymentDate: 1 });

export default mongoose.model<IScheduledPayment>(
  'ScheduledPayment',
  scheduledPaymentSchema,
);
