import { apiRequest } from '@core/api';
import { API_URL } from '@core/constants';

interface IApiPostLogin {
  email: string;
  password: string;
}

export const apiPostLogin = (params: IApiPostLogin) =>
  apiRequest({
    method: 'post',
    subPath: API_URL.VENDORS_LOGIN,
    data: params,
  });
