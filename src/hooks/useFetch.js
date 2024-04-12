import { useCallback, useState, useMemo, } from "react";
import { PublicAxios, PrivateAxios } from "../service/AxiosInstance";
import { RESULT_PER_PAGE } from "../constants/AppSetting";
// Define the hook
function useFetch(url, isRequestPrivate) {
    const paginationConst = useMemo(() => {
        return {
            total: 0,
            per_page: RESULT_PER_PAGE,
            last_page: 0,
            current_page: 1,
            from: 0,
            to: 0,
        };
    }, []);
    const [pagination, setPagination] = useState(paginationConst);
    const [data, setData] = useState();
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        let response;
        try {
            if (isRequestPrivate === true) {
                if (url.includes("?")) {
                    response = await PrivateAxios.get(url);
                    console.log("hit alone");
                }
                else {
                    response = await PrivateAxios.get(url + `?page=${page}&page_size=${pageSize}`);
                }
            }
            else {
                response = await PublicAxios.get(url);
            }
            setData(response.data?.payload);
            if (response.data?.meta_data?.pagination) {
                setPagination(response.data?.meta_data?.pagination);
            }
            else {
                setPagination(paginationConst);
            }
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
    const fetchDataById = useCallback(async (url) => {
        setIsLoading(true);
        setError(null);
        const newUrl = url;
        let response;
        try {
            if (isRequestPrivate === true) {
                response = await PrivateAxios.get(newUrl);
            }
            else {
                response = await PublicAxios.get(newUrl);
            }
            setData(response.data?.payload);
            if (response.data?.meta_data?.pagination) {
                setPagination(response.data?.meta_data?.pagination);
            }
            else {
                setPagination(paginationConst);
            }
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
    }, [isRequestPrivate, paginationConst]);
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
