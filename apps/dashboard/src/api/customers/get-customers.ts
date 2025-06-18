import { apiRequest } from '@core/api';
import { API_URL } from '@core/constants';
import type { VendorClient } from '@core/types';

export const apiGetCustomers = () =>
  apiRequest<VendorClient[]>({
    method: 'get',
    subPath: API_URL.GET_VENDOR_CLIENTS,
  });
