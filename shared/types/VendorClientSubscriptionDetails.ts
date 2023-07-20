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
  email: string;
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
  // from vendor
  plan: string; // plan name
  amount: number;
  token: string; // token name
  vendorContract: string;
  tokenAddress: string;
  // from client
  status: "active" | "inactive" | "cancelled";
  nextDate: Date | null;
  paymentMethod: PaymentMethod | null;
  billingInfo: BillingInfo | null;
  invoices: Invoice[];
}
