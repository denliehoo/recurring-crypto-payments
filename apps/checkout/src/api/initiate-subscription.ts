import { apiRequest } from '@core/api';
import { API_URL } from '@core/constants';
import type { InitiateSubscription } from '@core/types/checkout';

export const apiInitiateSubscription = (params: InitiateSubscription) =>
  apiRequest({
    method: 'post',
    subPath: API_URL.EXTERNAL_PAGE_INITIATE_SUBSCRIPTION,
    data: params,
  });
