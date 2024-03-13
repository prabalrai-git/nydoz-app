import { useState } from "react";
import { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";
import { PublicAxios, PrivateAxios } from "../service/AxiosInstance";
import { IData, IErrorData } from "../types/axios.type";

type P = NonNullable<unknown>;

type PostDataResponse<T> = {
  data: T | undefined;
  isLoading: boolean;
  error: string | null;
  errList: Record<string, string[]> | undefined;
  postData: (
    payload: P,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<IData<T>, unknown> | undefined>;
  updateData: (
    id: string,
    payload: P
  ) => Promise<AxiosResponse<IData<T>, unknown> | undefined>;
  update: (
    url: string,
    payload?: P
  ) => Promise<AxiosResponse<IData<T>, unknown> | undefined>;
  deleteData: (
    payload: string
  ) => Promise<AxiosResponse<IData<T>, unknown> | undefined>;
};

function useMutation<T>(
  url: string,
  isRequestPrivate: boolean
): PostDataResponse<T> {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errList, setErrList] = useState<
    Record<string, string[]> | undefined
  >();
  const [data, setData] = useState<T | undefined>();

  const postData = async (payload: P, config?: AxiosRequestConfig) => {
    setIsLoading(true);
    setError(null);
    let response: AxiosResponse<IData<T>>;

    if (!config) {
      config = {
        headers: {
          "content-type": "application/json",
        },
      };
    }
    try {
      if (isRequestPrivate === true) {
        response = await PrivateAxios.post(url, payload, config);
      } else {
        response = await PublicAxios.post(url, payload, config);
      }
      setData(response?.data?.payload);
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<IErrorData>;
      if (axiosError?.response?.status === 500) {
        setError("Something went wrong");
        return undefined;
      }
      setError(axiosError?.response?.data?.message || "Something went wrong");
      setErrList(axiosError?.response?.data?.errors);
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };

  const updateData = async (id: string, payload: P) => {
    setIsLoading(true);
    setError(null);
    let response: AxiosResponse<IData<T>>;
    const updateUrl = `${url}/${id}`;
    try {
      response = await PrivateAxios.put(updateUrl, payload);
      setData(response?.data?.payload);
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<IErrorData>;
      if (axiosError?.response?.status === 500) {
        setError("Something went wrong");
        return undefined;
      }

      setError(axiosError?.response?.data?.message || "Something went wrong");
      setErrList(axiosError?.response?.data?.errors);
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };
  const update = async (url: string, payload?: P) => {
    setIsLoading(true);
    setError(null);
    let response: AxiosResponse<IData<T>>;
    try {
      response = await PrivateAxios.put(url, payload);
      setData(response?.data?.payload);
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<IErrorData>;
      if (axiosError?.response?.status === 500) {
        setError("Something went wrong");
        return undefined;
      }

      setError(axiosError?.response?.data?.message || "Something went wrong");
      setErrList(axiosError?.response?.data?.errors);
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteData = async (payload: string) => {
    setIsLoading(true);
    setError(null);
    let response: AxiosResponse<IData<T>>;

    try {
      const deleteUrl = `${url}/${payload}`;
      response = await PrivateAxios.delete(deleteUrl);
      setData(response?.data?.payload);
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<IErrorData>;
      if (axiosError?.response?.status === 500) {
        setError("Something went wrong");
        return undefined;
      }
      setError(axiosError?.response?.data?.message || "Something went wrong");

      setErrList(axiosError?.response?.data?.errors);

      return undefined;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    postData,
    data,
    isLoading,
    updateData,
    deleteData,
    error,
    errList,
    update,
  };
}

export default useMutation;
