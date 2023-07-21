import mongoose, { Schema } from 'mongoose';
import { IScheduledPayment, scheduledPaymentSchema } from './scheduledPayment';

export interface ICompletedPayment extends IScheduledPayment {
  status: 'paid' | 'failed';
  hash: string | null;
}

const completedPaymentSchema: Schema = new Schema<ICompletedPayment>({
  status: { type: String, enum: ['paid', 'failed'], required: true },
  hash: {type: String, default: null}
});

completedPaymentSchema.add(scheduledPaymentSchema);

export default mongoose.model<ICompletedPayment>('CompletedPayment', completedPaymentSchema);
