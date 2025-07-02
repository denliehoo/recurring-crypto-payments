import { apiRequest } from '@core/api';
import { API_URL } from '@core/constants';
import type { GetPayoutsApiResponse } from '@core/types';

export const apiGetPayouts = () =>
  apiRequest<GetPayoutsApiResponse>({
    method: 'get',
    subPath: API_URL.PAYOUT,
  });
