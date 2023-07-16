import { VendorClientSubscriptionDetails } from "../types/VendorClientSubscriptionDetails";
const today = new Date(); // Get today's date

export const activeSampleData: VendorClientSubscriptionDetails = {
    vendor: "Company Test Name",
    plan: "Company Name Premium Subscription",
    amount: "20",
    token: "USDT",
    status: "active", // enum: active, inactive, cancelled
    nextDate: new Date(today.setDate(today.getDate() + 10)), //do a timestamp instead
    paymentMethod: {
      token: "USDT",
      tokenAddress: "0x....",
      wallet: "0x12...user",
      sufficientAllowance: true,
      sufficientBalance: false,
    },
    billingInfo: {
      name: "Test Customer",
      address: "123 Jurong Street 321 \n#12-30 \nSINGAPORE 123456 SG",
    },
    invoices: [
      {
        date: new Date(2023,4,5),
        amount: 20,
        token: "USDT",
        status: "Paid",
        hash: "www.etherscan.com/xxx",
        invoice: "wwww.invoice.com/xxx",
      },
      {
        date: new Date(2023,5,5),
        amount: 20,
        token: "USDT",
        status: "Paid",
        hash: "www.etherscan.com/xxx",
        invoice: "wwww.invoice.com/xxx",
      },
      {
        date: new Date(2023,6,5),
        amount: 20,
        token: "USDT",
        status: "Paid",
        hash: "www.etherscan.com/xxx",
        invoice: "wwww.invoice.com/xxx",
      },
    ],
  };

  export const cancelledSampleData: VendorClientSubscriptionDetails = {
    vendor: "Company Test Name",
    plan: "Company Name Premium Subscription",
    amount: "20",
    token: "USDT",
    status: "cancelled", // enum: active, inactive, cancelled
    nextDate: new Date(today.setDate(today.getDate() + 10)), //do a timestamp instead
    paymentMethod: {
      token: "USDT",
      tokenAddress: "0x....",
      wallet: "0x12...user",
      sufficientAllowance: true,
      sufficientBalance: false,
    },
    billingInfo: {
      name: "Test Customer",
      address: "123 Jurong Street 321 \n#12-30 \nSINGAPORE 123456 SG",
    },
    invoices: [
        {
          date: new Date(2023,4,5),
          amount: 20,
          token: "USDT",
          status: "Paid",
          hash: "www.etherscan.com/xxx",
          invoice: "wwww.invoice.com/xxx",
        },
        {
          date: new Date(2023,5,5),
          amount: 20,
          token: "USDT",
          status: "Paid",
          hash: "www.etherscan.com/xxx",
          invoice: "wwww.invoice.com/xxx",
        },
        {
          date: new Date(2023,6,5),
          amount: 20,
          token: "USDT",
          status: "Paid",
          hash: "www.etherscan.com/xxx",
          invoice: "wwww.invoice.com/xxx",
        },
      ],
  };

  // means never bought before
  export const inactiveSampleData: VendorClientSubscriptionDetails = {
    vendor: "Company Test Name",
    plan: "Company Name Premium Subscription",
    amount: "20",
    token: "USDT",
    status: "inactive", // enum: active, inactive, cancelled
    nextDate: null, //do a timestamp instead
    paymentMethod: null,
    billingInfo: null,
    invoices: [],
  };