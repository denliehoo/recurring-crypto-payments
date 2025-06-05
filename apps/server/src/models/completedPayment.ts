import mongoose, { Schema } from 'mongoose';
import { IScheduledPayment, scheduledPaymentSchema } from './scheduledPayment';
import { CompletedPayment } from '@core/types';

export interface ICompletedPayment
  extends IScheduledPayment,
    Omit<CompletedPayment, 'vendorId' | 'vendorClientId' | '_id'> {}

const completedPaymentSchema: Schema = new Schema<ICompletedPayment>({
  status: { type: String, enum: ['paid', 'failed', 'cancelled'], required: true },
  hash: { type: String, default: null },
  remarks: { type: String, default: null },
});

completedPaymentSchema.add(scheduledPaymentSchema);

export default mongoose.model<ICompletedPayment>('CompletedPayment', completedPaymentSchema);
