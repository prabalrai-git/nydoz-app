import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { PublicAxios, PrivateAxios } from "../service/AxiosInstance";

type P = NonNullable<unknown>;

interface IData<T> {
    debug: unknown;
    message: string;
    payload: T | undefined;
    status: string;
}

interface IErrorData {
    code: number;
    message: string;
    status: string;
}

type PostDataResponse<T> = {
    data: T | undefined;
    isLoading: boolean;
    error: string | null;
    postData: (
        payload: P
    ) => Promise<AxiosResponse<IData<T>, unknown> | undefined>;
};

function useMutation<T>(
    url: string,
    isRequestPrivate: boolean
): PostDataResponse<T> {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<T | undefined>();

    const postData = async (payload: P) => {
        setIsLoading(true);
        setError(null);
        let response: AxiosResponse<IData<T>>;

        try {
            if (isRequestPrivate === true) {
                response = await PrivateAxios.post(url, payload);
            } else {
                response = await PublicAxios.post(url, payload);
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
