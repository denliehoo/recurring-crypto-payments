import { apiRequest } from '@core/api';
import { API_URL } from '@core/constants';
import { ScheduledPayment } from '@core/types';

export const apiGetPayments = () =>
  apiRequest<ScheduledPayment[]>({
    method: 'get',
    subPath: API_URL.PAYMENTS_ALL,
  });
