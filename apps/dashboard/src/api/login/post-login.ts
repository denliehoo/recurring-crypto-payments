import { apiRequest } from '@core/api';
import { API_URL } from '@core/constants';
import type { IApiPostLogin } from '@core/types/auth';

export const apiPostLogin = (params: IApiPostLogin) =>
  apiRequest({
    method: 'post',
    subPath: API_URL.AUTH.LOGIN,
    data: params,
  });
