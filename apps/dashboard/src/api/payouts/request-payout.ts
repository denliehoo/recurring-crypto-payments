import { apiRequest } from '@core/api';
import { API_URL } from '@core/constants';
import type { RequestPayoutParams } from '@core/types';

export const apiRequestPayout = (params: RequestPayoutParams) =>
  apiRequest({
    method: 'post',
    subPath: API_URL.PAYOUT,
    data: params,
  });
