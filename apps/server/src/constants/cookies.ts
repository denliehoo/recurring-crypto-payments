export enum ESubdomain {
  DASHBOARD = 'dashboard',
  CHECKOUT = 'checkout',
}

export const DOMAIN_TOKEN_MAPPING: Record<ESubdomain, string> = {
  [ESubdomain.DASHBOARD]: 'dashboard-token',
  [ESubdomain.CHECKOUT]: 'checkout-token',
};
