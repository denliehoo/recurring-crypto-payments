import { apiRequest } from '@core/api';
import { API_URL } from '@core/constants';
import type { DashboardApiResponse } from '@core/types';

interface IGetDashboard {
  utc: number;
}

export const apiGetDashboard = (params: IGetDashboard) =>
  apiRequest<DashboardApiResponse>({
    method: 'get',
    subPath: API_URL.PAYMENTS_DASHBOARD,
    params,
  });
