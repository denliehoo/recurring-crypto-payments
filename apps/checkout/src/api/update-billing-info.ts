import { apiRequest } from '@core/api';
import { API_URL } from '@core/constants';
import { BillingInfo } from '@core/types';

export const apiUpdateBillingInfo = (params: BillingInfo) =>
  apiRequest({
    method: 'put',
    subPath: API_URL.EXTERNAL_PAGE_UPDATE_BILLING,
    data: params,
  });
