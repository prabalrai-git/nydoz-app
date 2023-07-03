import { useState } from "react";
import { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";
import { PublicAxios, PrivateAxios } from "../service/AxiosInstance";
import { IData, IErrorData } from "../types/axios.type";

type P = NonNullable<unknown>;

type PostDataResponse<T> = {
    data: T | undefined;
    isLoading: boolean;
    error: string | null;
    postData: (
        payload: P,
        config?: AxiosRequestConfig
    ) => Promise<AxiosResponse<IData<T>, unknown> | undefined>;
};

function useMutation<T>(
    url: string,
    isRequestPrivate: boolean
): PostDataResponse<T> {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
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
            console.log(axiosError, "axiosError");
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

    return { postData, data, isLoading, error };
}

export default useMutation;
