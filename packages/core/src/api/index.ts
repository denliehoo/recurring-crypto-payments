export const testRequest = () => {
  console.log('url is:', process.env.REACT_APP_API_URL);
};

import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';

class ApiCallError extends Error {
  public responseStatus: number;

  constructor(message: string, responseStatus: number) {
    super(message);
    this.responseStatus = responseStatus;
  }
}

interface IAxiosHeaders {
  Authorization?: string;
}

export interface IApiRequest {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  subPath: string;
  data?: any; // body data
  params?: any; // query params
  headers?: IAxiosHeaders;
}

export const apiRequest = async <T>({
  method,
  subPath,
  data = null,
  params,
  headers,
}: IApiRequest): Promise<AxiosResponse<T>> => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('JWT');

  console.log('try call api with', apiUrl, subPath, token);

  try {
    const axiosHeaders = {
      Authorization: token,
      ...headers,
    };

    const config: AxiosRequestConfig = {
      method,
      url: `${apiUrl}${subPath}`,
      headers: axiosHeaders,
      data,
      params,
    };

    const res = await axios(config);
    return res;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 401) {
        window.location.href = '/';
        localStorage.removeItem('JWT');
      }

      throw err;
    }

    throw new Error('Unexpected error during API call: ' + err?.message);
  }
};

/*
  // Now you can use this utility function for any API call with different methods
  const editTask = async () => {
    try {
      const res = await apiCallAuth('put', `/tasks/${selectedRow}`, selectedRowDetails);
      console.log(res);
  
      setIsLoading(false);
      resetState();
      await getTasks();
    } catch (err) {
      console.log(err);
    }
  };
  
  // Example usage for other request types
  const getTask = async (taskId) => {
    try {
      const res = await apiCallAuth('get', `/tasks/${taskId}`, null);
      console.log(res);
      // Handle the response data or perform further actions
    } catch (err) {
      console.log(err);
    }
  };
  
  const deleteTask = async (taskId) => {
    try {
      const res = await apiCallAuth('delete', `/tasks/${taskId}`, null);
      console.log(res);
      // Handle the response data or perform further actions
    } catch (err) {
      console.log(err);
    }
  };
  
  // And so on for other API calls...
  */
