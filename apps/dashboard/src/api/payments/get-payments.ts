import { apiRequest } from '@core/api';
import { API_URL } from '@core/constants';
import type { ScheduledPayment } from '@core/types';

export const apiGetPayments = () =>
  apiRequest<ScheduledPayment[]>({
    method: 'get',
    subPath: API_URL.PAYMENTS.LIST,
  });
