import type { Payout } from '@core/types';
import mongoose, { Schema, type Document } from 'mongoose';

export interface IPayout extends Document, Omit<Payout, 'vendorId' | '_id'> {}

export const payoutSchema: Schema = new Schema(
  {
    payoutDate: { type: Date, required: true },
    amount: { type: Number, required: true },
    tokenAddress: { type: String, required: true },
    userAddress: { type: String, required: true },
    token: { type: String, required: true },
    hash: { type: String, required: true },
    vendorId: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true },
);

export default mongoose.model<IPayout>('Payout', payoutSchema);
