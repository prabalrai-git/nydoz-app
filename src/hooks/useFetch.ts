import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { PublicAxios, PrivateAxios } from "../service/AxiosInstance";
import { IData, IErrorData, IPagination } from "../types/axios.type";

type FetchDataResponse<T> = {
    data: T | undefined;
    isloading: boolean;
    error: string | null;
    pagination: IPagination | undefined;
    fetchData: () => Promise<AxiosResponse<IData<T>, unknown> | undefined>;
    fetchDataById: (
        url: string
    ) => Promise<AxiosResponse<IData<T>, unknown> | undefined>;
};

// Define the hook
function useFetch<T>(
    url: string,
    isRequestPrivate: boolean
): FetchDataResponse<T> {
    const [pagination, setPagination] = useState<IPagination | undefined>({
        total: 0,
        per_page: 0,
        last_page: 0,
        current_page: 0,
        from: 0,
        to: 0,
    });
    const [data, setData] = useState<T | undefined>();
    const [isloading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        let response: AxiosResponse<IData<T>>;
        try {
            if (isRequestPrivate === true) {
                response = await PrivateAxios.get(url);
            } else {
                response = await PublicAxios.get(url);
            }

            setData(response.data?.payload);
            setPagination(response.data?.meta_data?.pagination);
            return response;
        } catch (error: AxiosError | unknown) {
            const axiosError = error as AxiosError<IErrorData>;
            if (axiosError?.response?.status === 500) {
                setError("Something went wrong");
                return undefined;
            }
            setError(
                axiosError?.response?.data?.message || "Something went wrong"
            );
            return undefined;
        } finally {
            setIsLoading(false);
        }
    };
    const fetchDataById = async (url: string) => {
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
            setPagination(response.data?.meta_data?.pagination);
            return response;
        } catch (error: AxiosError | unknown) {
            const axiosError = error as AxiosError<IErrorData>;
            if (axiosError?.response?.status === 500) {
                setError("Something went wrong");
                return undefined;
            }
            setError(
                axiosError?.response?.data?.message || "Something went wrong"
            );
            return undefined;
        } finally {
            setIsLoading(false);
        }
    };

    return { fetchData, data, isloading, error, pagination, fetchDataById };
}

export default useFetch;
