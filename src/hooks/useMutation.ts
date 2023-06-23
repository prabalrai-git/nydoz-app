import { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { PublicAxios } from "../service/AxiosInstance";

type PostDataResponse<T> = {
    data: T | undefined;
    loading: boolean;
    error: AxiosError | null;
};

function useMutation<T>(url: string): PostDataResponse<T> {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<AxiosError | null>(null);
    const [data, setData] = useState<T | undefined>();

    const postData = async (payload: never) => {
        setLoading(true);
        setError(null);
        try {
            const response: AxiosResponse<T> = await axios.post(url, payload);
            setData(response.data);
        } catch (error) {
            const axiosError = error as AxiosError;
            console.log(axiosError, "axiosError");
            setError(axiosError);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error };
}

export default useMutation;
