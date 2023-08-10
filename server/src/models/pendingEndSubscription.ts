import mongoose, { Schema, Document } from "mongoose";

export interface IPendingEndSubscription extends Document {
  endDate: Date;
  vendorId: mongoose.Types.ObjectId;
  vendorClientId: mongoose.Types.ObjectId;
}

export const pendingEndSubcriptionSchema: Schema = new Schema(
  {
    endDate: { type: Date, required: true },
    vendorId: { type: Schema.Types.ObjectId, required: true },
    vendorClientId: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IPendingEndSubscription>(
  "PendingEndSubscription",
  pendingEndSubcriptionSchema
);
