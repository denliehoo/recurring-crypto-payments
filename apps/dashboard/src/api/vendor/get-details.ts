import { API_URL } from '@core/constants';
import { apiRequest } from '@core/api';
import type { Vendor } from '@core/types';

export const apiGetVendorDetails = () =>
  apiRequest<Vendor>({ method: 'get', subPath: API_URL.VENDOR_BY_TOKEN });
