import { apiRequest } from '@core/api';
import { API_URL } from '@core/constants';

interface IApiResendVerification {
  email: string;
}

export const apiResendVerification = (params: IApiResendVerification) =>
  apiRequest({
    method: 'post',
    subPath: API_URL.VENDORS_RESEND_VERIFICATION,
    data: params,
  });
