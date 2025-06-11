import { Vendor } from './Vendor';

export interface Payout {
  _id: string;
  payoutDate: Date;
  amount: number;
  tokenAddress: string;
  userAddress: string;
  token: string;
  hash: string;
  vendorId: string; // mongoose.Types.ObjectId;
}

export interface GetPayoutsApiResponse {
  payouts: Payout[];
  vendor: Vendor;
  pendingBalance: string;
  owner: string;
}

export interface RequestPayoutParams {
  amount: number;
  tokenAddress: string;
  userAddress: string;
  token: string;
  hash: string;
}
