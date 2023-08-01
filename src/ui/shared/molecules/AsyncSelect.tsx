import React, {
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
    useCallback,
} from "react";
import useFetch from "../../../hooks/useFetch";
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
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [fetchUrl, setfetchUrl] = useState(baseUrl);
    const { data, isloading, fetchDataById, pagination } = useFetch<T[]>(
        fetchUrl,
        true
    );

    const [allValue, setAllValue] = useState<T[] | undefined>([]);
    const handleClickSelect = () => {
        setfetchUrl(`${baseUrl}?page=${currentPage}&per_page=15`);
    };

    useUpdateEffect(() => {
        fetchDataById(fetchUrl);
    }, [fetchUrl]);

    useEffect(() => {
        if (data && data?.length > 0 && allValue) {
            setAllValue([...data, ...allValue]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const handleloadMore = (currentPage: number) => {
        setCurrentPage(() => currentPage);
        setfetchUrl(`${baseUrl}?page=${currentPage}&per_page=15`);
    };

    return (
        <select
            onClick={handleClickSelect}
            onChange={(e) => {
                if (e.target.value === "LOAD_MORE") {
                    handleloadMore(currentPage + 1);
                } else {
                    const selectedValue = allValue?.find(
                        (item) => item.id === e.target.value
                    );
                    setSelectValue(selectedValue);
                }
            }}
            placeholder='Select Visa Type'
            className='form-select'>
            {allValue?.map((item: T, index: number) => (
                <option key={index} value={item?.id}>
                    {item.first_name}
                </option>
            ))}
            {pagination?.total >
                pagination?.current_page * pagination?.per_page && (
                <option value='LOAD_MORE'>Load more</option>
            )}

            {isloading && (
                <option>
                    <span>Loading...</span>
                </option>
            )}
        </select>
    );
}

export default SimpleSelect;
