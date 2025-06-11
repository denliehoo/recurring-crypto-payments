import { apiRequest } from '@core/api';
import { API_URL } from '@core/constants';

export const apiVerifyEmail = (token: string) =>
  apiRequest({
    method: 'post',
    subPath: API_URL.VERIFY_EMAIL,
    data: null,
    headers: {
      Authorization: token,
    },
  });
