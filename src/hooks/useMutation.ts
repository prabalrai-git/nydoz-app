import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { PublicAxios, PrivateAxios } from "../service/AxiosInstance";

type P = NonNullable<unknown>;

type PostDataResponse<T> = {
    data: T | undefined;
    isLoading: boolean;
    error: AxiosError | null;
    postData: (payload: P) => Promise<AxiosResponse<T, unknown> | undefined>;
};

function useMutation<T>(
    url: string,
    isRequestPrivate: boolean
): PostDataResponse<T> {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<AxiosError | null>(null);
    const [data, setData] = useState<T | undefined>();

    const postData = async (payload: P) => {
        setIsLoading(true);
        setError(null);
        let response: AxiosResponse<T>;

        try {
            if (isRequestPrivate === true) {
                response = await PublicAxios.post(url, payload);
            } else {
                response = await PrivateAxios.post(url, payload);
            }
            setData(response.data);
            return response;
        } catch (error) {
            const axiosError = error as AxiosError;
            console.log(axiosError, "axiosError");
            setError(
                axiosError?.response?.data?.message || "Something went wrong"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return { postData, data, isLoading, error };
}

export default useMutation;
