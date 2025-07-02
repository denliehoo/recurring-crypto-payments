import { apiRequest } from '@core/api';
import { API_URL } from '@core/constants';
import { IApiResendVerification } from '@core/types/auth';

export const apiResendVerification = (params: IApiResendVerification) =>
  apiRequest({
    method: 'post',
    subPath: API_URL.AUTH.RESEND_VERIFICATION,
    data: params,
  });
