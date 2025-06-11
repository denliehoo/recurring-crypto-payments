import { apiRequest } from '@core/api';
import { API_URL } from '@core/constants';

interface IRenewSubscription {
  wallet: string;
}

export const apiRenewSubscription = (params: IRenewSubscription) =>
  apiRequest({
    method: 'post',
    subPath: API_URL.EXTERNAL_PAGE_RENEW,
    data: params,
  });
