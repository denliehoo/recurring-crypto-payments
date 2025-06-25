// TODO: RENAME API routes properly (follow REST)
// i.e. we should be having /payments/create-payout, it should just be POST /payments

export const API_URL = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    VERIFY_EMAIL: '/auth/verify-email',
    RESEND_VERIFICATION: '/auth/resend-verification',
  },
  DASHBOARD: '/dashboard',

  // DASHBOARD
  GET_VENDOR_CLIENTS: '/vendorclients/get-vendor-clients-by-vendor',
  VENDOR: '/vendors',
  VENDOR_BY_TOKEN: '/vendors/getVendorByToken',
  PAYMENTS_ALL: '/payments/get-all-payments',
  PAYMENT_PAYOUT_DETAILS: '/payments/get-payouts-details',
  PAYMENT_CREATE_PAYOUT: '/payments/create-payout',

  // CHECKOUT
  EXTERNAL_PAGE_DETAILS: '/externalPage/get-subscription-page-details',
  EXTERNAL_PAGE_CANCEL: '/externalPage/cancel-subscription',
  EXTERNAL_PAGE_UPDATE_BILLING:
    '/externalPage/update-vendor-client-billing-info',
  EXTERNAL_PAGE_INITIATE_SUBSCRIPTION: '/externalPage/initiate-subscription',
  EXTERNAL_PAGE_CHANGE_PAYMENT_METHOD: '/externalPage/change-payment-method',
  EXTERNAL_PAGE_RENEW: '/externalPage/renew-subscription',
};
