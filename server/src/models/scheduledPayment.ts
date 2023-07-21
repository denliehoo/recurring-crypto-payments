import mongoose, { Schema, Document } from 'mongoose';

export interface IScheduledPayment extends Document {
  vendorContract: string;
  userAddress: string;
  amount: number;
  tokenAddress: string;
  paymentDate: Date;
  vendorId: mongoose.Types.ObjectId;
  vendorClientId: mongoose.Types.ObjectId;
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
  { timestamps: true }
);

export default mongoose.model<IScheduledPayment>('ScheduledPayment', scheduledPaymentSchema);
