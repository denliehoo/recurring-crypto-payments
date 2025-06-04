import { BillingInfo, Invoice, PaymentMethod } from './VendorClientSubscriptionDetails';

// TODO: Refactor types properly (reusability), status should be enum
export interface VendorClient {
  _id: string;
  vendor: string;
  billingInfo: BillingInfo | null;
  paymentMethod: PaymentMethod | null;
  nextDate: Date | null;
  invoices: Invoice[];
  status: 'inactive' | 'active' | 'cancelled' | 'ended';
}
