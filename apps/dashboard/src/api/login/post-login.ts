import { apiRequest } from '@core/api';
import { API_URL } from '@core/constants';

interface IApiPostLogin {
  email: string;
  password: string;
}

interface IApiPostLoginRes {
  token: string;
}

export const apiPostLogin = (params: IApiPostLogin) =>
  apiRequest<IApiPostLoginRes>({
    method: 'post',
    subPath: API_URL.VENDORS_LOGIN,
    data: params,
  });
