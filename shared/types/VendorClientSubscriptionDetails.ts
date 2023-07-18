export interface PaymentMethod {
  token: string;
  tokenAddress: string;
  wallet: string;
  sufficientAllowance: boolean;
  sufficientBalance: boolean;
}

export interface BillingInfo {
  name: string;
  address: string;
}

export interface Invoice {
  date: Date;
  amount: number;
  token: string;
  status: string;
  hash: string;
  invoice: string;
}

export interface VendorClientSubscriptionDetails {
  vendor: string; // vendor Id
  plan: string; // plan name
  amount: number;
  token: string; // token name
  vendorContract: string;
  tokenAddress: string;
  status: "active" | "inactive" | "cancelled";
  nextDate: Date | null;
  paymentMethod: PaymentMethod | null;
  billingInfo: BillingInfo | null;
  invoices: Invoice[];
}
