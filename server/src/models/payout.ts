import mongoose, { Schema, Document } from "mongoose";

export interface IPayout extends Document {
  payoutDate: Date;
  amount: number;
  tokenAddress: string;
  userAddress: string;
  token: string;
  hash: string;
  vendorId: mongoose.Types.ObjectId;
}

export const payoutSchema: Schema = new Schema(
  {
    payoutDate: { type: String, required: true },
    amount: { type: Number, required: true },
    tokenAddress: { type: String, required: true },
    userAddress: { type: String, required: true },
    token: { type: String, required: true },
    hash: { type: String, required: true },
    vendorId: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IPayout>("Payout", payoutSchema);
