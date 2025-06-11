import { apiRequest } from '@core/api';
import { API_URL } from '@core/constants';

interface IApiRegister {
  email: string;
  password: string;
}

export const apiRegister = (params: IApiRegister) =>
  apiRequest({
    method: 'post',
    subPath: API_URL.VENDOR,
    data: params,
  });
