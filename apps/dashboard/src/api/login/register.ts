import { apiRequest } from '@core/api';
import { API_URL } from '@core/constants';
import { IApiPostRegister } from '@core/types/auth';

export const apiRegister = (params: IApiPostRegister) =>
  apiRequest({
    method: 'post',
    subPath: API_URL.AUTH.REGISTER,
    data: params,
  });
