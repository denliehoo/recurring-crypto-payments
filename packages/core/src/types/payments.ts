export interface ScheduledPayment {
  vendorContract: string;
  userAddress: string;
  amount: number;
  tokenAddress: string;
  paymentDate: Date;
  vendorId: string; // mongoose.Types.ObjectId;
  vendorClientId: string; // mongoose.Types.ObjectId;
  _id: string;
}

export interface CompletedPayment extends ScheduledPayment {
  status: 'paid' | 'failed' | 'cancelled';
  hash: string | null;
  remarks: string | null;
}
