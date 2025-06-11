import { apiRequest } from '@core/api';
import { API_URL } from '@core/constants';

interface IApiChangePaymentMethod {
  newAddress: string;
}

export const apiChangePaymentMethod = (params: IApiChangePaymentMethod) =>
  apiRequest({
    method: 'put',
    subPath: API_URL.EXTERNAL_PAGE_CHANGE_PAYMENT_METHOD,
    data: params,
  });
