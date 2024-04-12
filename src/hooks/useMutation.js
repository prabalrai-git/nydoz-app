import { useState } from "react";
import { PublicAxios, PrivateAxios } from "../service/AxiosInstance";
function useMutation(url, isRequestPrivate) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errList, setErrList] = useState();
    const [data, setData] = useState();
    const postData = async (payload, config) => {
        setIsLoading(true);
        setError(null);
        let response;
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
            }
            else {
                response = await PublicAxios.post(url, payload, config);
            }
            setData(response?.data?.payload);
            return response;
        }
        catch (error) {
            const axiosError = error;
            if (axiosError?.response?.status === 500) {
                setError("Something went wrong");
                return undefined;
            }
            setError(axiosError?.response?.data?.message || "Something went wrong");
            setErrList(axiosError?.response?.data?.errors);
            return undefined;
        }
        finally {
            setIsLoading(false);
        }
    };
    const updateData = async (id, payload) => {
        setIsLoading(true);
        setError(null);
        let response;
        const updateUrl = `${url}/${id}`;
        try {
            response = await PrivateAxios.put(updateUrl, payload);
            setData(response?.data?.payload);
            return response;
        }
        catch (error) {
            const axiosError = error;
            if (axiosError?.response?.status === 500) {
                setError("Something went wrong");
                return undefined;
            }
            setError(axiosError?.response?.data?.message || "Something went wrong");
            setErrList(axiosError?.response?.data?.errors);
            return undefined;
        }
        finally {
            setIsLoading(false);
        }
    };
    const update = async (url, payload) => {
        setIsLoading(true);
        setError(null);
        let response;
        try {
            response = await PrivateAxios.put(url, payload);
            setData(response?.data?.payload);
            return response;
        }
        catch (error) {
            const axiosError = error;
            if (axiosError?.response?.status === 500) {
                setError("Something went wrong");
                return undefined;
            }
            setError(axiosError?.response?.data?.message || "Something went wrong");
            setErrList(axiosError?.response?.data?.errors);
            return undefined;
        }
        finally {
            setIsLoading(false);
        }
    };
    const deleteData = async (payload) => {
        setIsLoading(true);
        setError(null);
        let response;
        try {
            const deleteUrl = `${url}/${payload}`;
            response = await PrivateAxios.delete(deleteUrl);
            setData(response?.data?.payload);
            return response;
        }
        catch (error) {
            const axiosError = error;
            if (axiosError?.response?.status === 500) {
                setError("Something went wrong");
                return undefined;
            }
            setError(axiosError?.response?.data?.message || "Something went wrong");
            setErrList(axiosError?.response?.data?.errors);
            return undefined;
        }
        finally {
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
