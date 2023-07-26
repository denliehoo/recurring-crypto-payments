export interface Vendor {
  name?: string;
  email: string;
  password?: string;
  apiKey: string;
  webhookUrl?: string;
  tokenAddress?: string;
  amount?: number;
  vendorContract?: string;
  plan?: string; // plan name
}
