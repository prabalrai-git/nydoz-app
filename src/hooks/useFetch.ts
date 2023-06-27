import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { PublicAxios, PrivateAxios } from "../service/AxiosInstance";

type FetchDataResponse<T> = {
    data: T | undefined | [];
    loading: boolean;
    error: AxiosError | null;
    fetchData: () => Promise<AxiosResponse<T, unknown> | undefined>;
};

// Define the hook
function useFetch<T>(
    url: string,
    isRequestPrivate: boolean
): FetchDataResponse<T> {
    const [data, setData] = useState<T | undefined>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<AxiosError | null>(null);
    const fetchData = async () => {
        setLoading(true);
        setError(null);
        let response: AxiosResponse<T>;
        try {
            if (isRequestPrivate === true) {
                response = await PublicAxios.get(url);
            } else {
                response = await PrivateAxios.get(url);
            }

            setData(response.data);
            return response;
        } catch (error: AxiosError | unknown) {
            const axiosError = error as AxiosError;
            console.log(axiosError, "axiosError");
            setError(axiosError || "Something Went Wrong.");
            return undefined;
        } finally {
            setLoading(false);
        }
    };

    return { fetchData, data, loading, error };
}

export default useFetch;
