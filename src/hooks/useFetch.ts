import { useCallback, useState } from "react";
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
};

// Define the hook
function useFetch<T>(
    url: string,
    isRequestPrivate: boolean
): FetchDataResponse<T> {
    const paginationConst: IPagination = {
        total: 0,
        per_page: RESULT_PER_PAGE,
        last_page: 0,
        current_page: 1,
        from: 0,
        to: 0,
    };
    const [pagination, setPagination] = useState<IPagination | undefined>(
        paginationConst
    );
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
            setPagination(
                response.data?.meta_data?.pagination ?? paginationConst
            );
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
                setPagination(
                    response.data?.meta_data?.pagination ?? paginationConst
                );
                return response;
            } catch (error: AxiosError | unknown) {
                const axiosError = error as AxiosError<IErrorData>;
                if (axiosError?.response?.status === 500) {
                    setError("Something went wrong");
                    return undefined;
                }
                setError(
                    axiosError?.response?.data?.message ||
                        "Something went wrong"
                );
                return undefined;
            } finally {
                setIsLoading(false);
            }
        },
        [isRequestPrivate]
    );

    return { fetchData, data, isloading, error, pagination, fetchDataById };
}

export default useFetch;
