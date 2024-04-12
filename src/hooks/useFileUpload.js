import { useState } from "react";
import { PublicAxios, PrivateAxios } from "../service/AxiosInstance";
function useFileUpload(url, isRequestPrivate) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
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
            return undefined;
        }
        finally {
            setIsLoading(false);
        }
    };
    return { postData, data, isLoading, error };
}
export default useFileUpload;
