import {
  useCallback,
  useState,
  useMemo,
  Dispatch,
  SetStateAction,
} from "react";
import { AxiosError, AxiosResponse } from "axios";
import { PublicAxios, PrivateAxios } from "../service/AxiosInstance";
import { IData, IErrorData, IPagination } from "../types/axios.type";
import { RESULT_PER_PAGE } from "../constants/AppSetting";

type FetchDataResponse<T> = {
  data: T | undefined;
  isloading: boolean;
  error: string | null;
  pagination: IPagination;
  fetchData: () => Promise<AxiosResponse<IData<T>, unknown> | undefined>;
  fetchDataById: (
    url: string
  ) => Promise<AxiosResponse<IData<T>, unknown> | undefined>;
  setPage: Dispatch<SetStateAction<number>>;
  setPageSize: Dispatch<SetStateAction<number>>;
};

// Define the hook
function useFetch<T>(
  url: string,
  isRequestPrivate: boolean
): FetchDataResponse<T> {
  const paginationConst: IPagination = useMemo(() => {
    return {
      total: 0,
      per_page: RESULT_PER_PAGE,
      last_page: 0,
      current_page: 1,
      from: 0,
      to: 0,
    };
  }, []);

  const [pagination, setPagination] = useState<IPagination>(paginationConst);
  const [data, setData] = useState<T | undefined>();
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    let response: AxiosResponse<IData<T>>;
    try {
      if (isRequestPrivate === true) {
        response = await PrivateAxios.get(
          url + `?page=${page}&page_size=${pageSize}`
        );
      } else {
        response = await PublicAxios.get(url);
      }

      setData(response.data?.payload);
      if (response.data?.meta_data?.pagination) {
        setPagination(response.data?.meta_data?.pagination);
      } else {
        setPagination(paginationConst);
      }

      return response;
    } catch (error: AxiosError | unknown) {
      const axiosError = error as AxiosError<IErrorData>;
      if (axiosError?.response?.status === 500) {
        setError("Something went wrong");
        return undefined;
      }
      setError(axiosError?.response?.data?.message || "Something went wrong");
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDataById = useCallback(
    async (url: string) => {
      setIsLoading(true);
      setError(null);
      const newUrl = url;
      let response: AxiosResponse<IData<T>>;
      try {
        if (isRequestPrivate === true) {
          response = await PrivateAxios.get(newUrl);
        } else {
          response = await PublicAxios.get(newUrl);
        }

        setData(response.data?.payload);
        if (response.data?.meta_data?.pagination) {
          setPagination(response.data?.meta_data?.pagination);
        } else {
          setPagination(paginationConst);
        }
        return response;
      } catch (error: AxiosError | unknown) {
        const axiosError = error as AxiosError<IErrorData>;
        if (axiosError?.response?.status === 500) {
          setError("Something went wrong");
          return undefined;
        }
        setError(axiosError?.response?.data?.message || "Something went wrong");
        return undefined;
      } finally {
        setIsLoading(false);
      }
    },
    [isRequestPrivate, paginationConst]
  );

  return {
    fetchData,
    data,
    isloading,
    error,
    pagination,
    fetchDataById,
    setPage,
    setPageSize,
  };
}

export default useFetch;
