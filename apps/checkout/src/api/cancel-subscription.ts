import { apiRequest } from '@core/api';
import { API_URL } from '@core/constants';

export const apiCancelSubscription = () =>
  apiRequest({
    method: 'post',
    subPath: API_URL.EXTERNAL_PAGE_CANCEL,
  });
