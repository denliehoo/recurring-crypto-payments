import { apiRequest } from '@core/api';
import { API_URL } from '@core/constants';
import { UpdateVendor } from '@core/types';

export interface IUpdateConfigurations extends UpdateVendor {}

export const apiUpdateConfigurations = async (params: IUpdateConfigurations) =>
  await apiRequest({
    method: 'put',
    subPath: API_URL.VENDOR,
    data: params,
  });
