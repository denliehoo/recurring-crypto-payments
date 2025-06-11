import { BillingInfo, PaymentMethod } from './VendorClientSubscriptionDetails';

export interface InitiateSubscription {
  billingInfo: BillingInfo;
  paymentMethod: PaymentMethod;
  userAddress: string;
}
