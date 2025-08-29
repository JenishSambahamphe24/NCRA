import { AxiosError, AxiosRequestConfig } from "axios";

import axiosInstance from "./baseHttp.lib";

interface GetRequestParams {
  endpoint: string;
  config?: AxiosRequestConfig;
}

interface PostRequestParams {
  endpoint: string;
  data?: unknown;
  config?: AxiosRequestConfig;
}

export const fetch = async <ResponseDataType>({
  endpoint,
  config,
}: GetRequestParams) => {
  try {
    const response = await axiosInstance.get<ResponseDataType>(
      endpoint,
      config,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.title || "Request failed", {
        cause: error.response?.status,
      });
    }
    throw error;
  }
};

export const store = async <ResponseDataType>({
  endpoint,
  data,
  config,
}: PostRequestParams) => {
  try {
    const response = await axiosInstance.post<ResponseDataType>(
      endpoint,
      data,
      config,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.title || "Request failed", {
        cause: error.response?.status,
      });
    }
    throw error;
  }
};

export const replace = async <ResponseDataType>({
  endpoint,
  data,
  config,
}: PostRequestParams) => {
  try {
    const response = await axiosInstance.put<ResponseDataType>(
      endpoint,
      data,
      config,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.title || "Request failed", {
        cause: error.response?.status,
      });
    }
    throw error;
  }
};

export const update = async <ResponseDataType>({
  endpoint,
  data,
  config,
}: PostRequestParams) => {
  try {
    const response = await axiosInstance.patch<ResponseDataType>(
      endpoint,
      data,
      config,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.title || "Request failed", {
        cause: error.response?.status,
      });
    }
    throw error;
  }
};

export const remove = async <ResponseDataType>({
  endpoint,
  config,
}: GetRequestParams) => {
  try {
    const response = await axiosInstance.delete<ResponseDataType>(
      endpoint,
      config,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.title || "Request failed", {
        cause: error.response?.status,
      });
    }
    throw error;
  }
};
