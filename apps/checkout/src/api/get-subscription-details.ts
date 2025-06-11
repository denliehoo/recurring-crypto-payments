import { apiRequest } from '@core/api';
import { API_URL } from '@core/constants';
import { VendorClientSubscriptionDetails } from '@core/types';

export const apiGetSubscriptionDetails = async () =>
  apiRequest<VendorClientSubscriptionDetails>({
    method: 'get',
    subPath: API_URL.EXTERNAL_PAGE_DETAILS,
  });
