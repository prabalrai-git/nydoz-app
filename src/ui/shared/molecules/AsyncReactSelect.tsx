import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import AsyncSelect from "react-select/async";
import { useUpdateEffect } from "usehooks-ts";

interface CommonItem {
    id: string;
    name: string;
    first_name: string;
}

interface IProps<T extends CommonItem> {
    baseUrl: string;
    selectValue: T | undefined;
    setSelectValue: Dispatch<SetStateAction<T | undefined>>;
    placeholder: string;
    showData: string;
}

function SimpleSelect<T extends CommonItem>(props: IProps<T>) {
    const { baseUrl, selectValue, setSelectValue, placeholder, showData } =
        props;
    const [options, setOptions] = useState<T[] | undefined>([]);
    const [selectOptions, setSelectOptions] = useState<unknown[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [fetchUrl, setfetchUrl] = useState<string>(
        `/api/v1/client-management/agents?page=${currentPage}&per_page=15`
    );
    const { data, fetchDataById } = useFetch<T[]>(fetchUrl, true);

    useEffect(() => {
        fetchDataById(fetchUrl);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchUrl]);

    useEffect(() => {
        console.log("data", data);
        if (data && data?.length > 0 && options) {
            setOptions([...data, ...options]);
        }
        return () => setOptions([]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    // Function to load more data when scrolling to the bottom
    const handleLoadMore = () => {
        console.log("load more");
        const nextPage = currentPage + 1;
        setCurrentPage(() => nextPage);
        setfetchUrl(`${baseUrl}?page=${nextPage}&per_page=15`);
        setIsLoading(false);
    };

    useEffect(() => {
        if (options && options.length > 0) {
            const newOptions = options.map((item) => ({
                value: item.id,
                label: item.first_name,
            }));
            setSelectOptions(newOptions);
        }
    }, [options]);

    return (
        <AsyncSelect
            loadOptions={options?.map((item) => ({
                value: item.id,
                label: item.first_name,
            }))}
            cacheOptions
            isLoading={isLoading}
            onMenuScrollToBottom={handleLoadMore}
            isClearable
            isSearchable
            // Add other props as needed
        />
    );
}

export default SimpleSelect;
