import axios, { AxiosError } from 'axios';

export const handleApiError = (error: unknown) => {
  const GENERIC_ERROR_MESSAGE = 'An unknown error occured';
  console.error(error);
  if (axios.isAxiosError(error)) {
    if (error.code === AxiosError.ERR_NETWORK) {
      return {
        status: 500,
        message: 'Server Network Error',
      };
    }

    return {
      status: error.status,
      message: error.response?.data?.error || GENERIC_ERROR_MESSAGE,
    };
  }
  return {
    status: 400,
    message: GENERIC_ERROR_MESSAGE,
  };
};
