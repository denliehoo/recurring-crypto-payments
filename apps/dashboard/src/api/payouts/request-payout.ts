import { apiRequest } from '@core/api';
import { API_URL } from '@core/constants';
import { RequestPayoutParams } from '@core/types';

export const apiRequestPayout = (vendorId: string, params: RequestPayoutParams) =>
  apiRequest({
    method: 'post',
    subPath: API_URL.PAYMENT_CREATE_PAYOUT + `/${vendorId}`,
    data: params,
  });
