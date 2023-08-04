import { Dispatch, SetStateAction, useState, useEffect, useRef } from "react";
import { ArrowDown } from "react-bootstrap-icons";
import useFetch from "../../../hooks/useFetch";
import { useOnClickOutside } from "usehooks-ts";

interface IProps<T> {
    baseUrl: string;
    selectedListItem: T | undefined;
    setselectedListItem: Dispatch<SetStateAction<T | undefined>>;
    placeholder: string;
    showDataLabel: keyof T;
    searchBy: string;
    setSelectedItemText: Dispatch<SetStateAction<string>>;
}

function ServerSideSearchSelect<T>(props: IProps<T>) {
    const {
        baseUrl,
        setselectedListItem,
        placeholder,
        searchBy,
        showDataLabel,
    } = props;
    const [queryParameter, setQueryParameter] = useState({
        currentPage: 1,
        per_page: 15,
        searchTerm: "",
    });
    const [fetchUrl, setfetchUrl] = useState<string>(
        `${baseUrl}?page=${queryParameter.currentPage}&per_page=15`
    );
    const [fetchNewData, setfetchNewData] = useState<boolean>(false);
    const [showListBox, setShowListBox] = useState<boolean>(false);
    const [allValue, setAllValue] = useState<T[]>([]);
    const { data, fetchDataById } = useFetch<T[]>(
        `${baseUrl}/api/Server/GetAllServers`,
        true
    );
    const [searchTextValue, setSearchTextValue] = useState<string>("");

    useEffect(() => {
        if (searchTextValue.length <= 3) {
            return;
        } else {
            const timer = setTimeout(() => {
                setfetchUrl(
                    `${baseUrl}?${searchBy}=${searchTextValue}page=${queryParameter.currentPage}&per_page=${queryParameter.per_page}`
                );
                setfetchNewData(true);
            }, 500);
            return () => {
                clearTimeout(timer);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTextValue]);

    const selectRef = useRef(null);
    const handleChangeUrl = () => {
        console.log("handleChangeUrl");
        setfetchNewData(true);
        setfetchUrl(
            `${baseUrl}?${searchBy}=${searchTextValue}page=${
                queryParameter.currentPage + 1
            }&per_page=${queryParameter.per_page}`
        );

        setfetchUrl(
            `${baseUrl}?page=${queryParameter.currentPage + 1}&per_page=15`
        );

        setQueryParameter(() => {
            return {
                ...queryParameter,
                currentPage: queryParameter.currentPage + 1,
            };
        });
    };

    useEffect(() => {
        if (fetchNewData) fetchDataById(fetchUrl);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchUrl]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleScroll = (e: any) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
        if (scrollHeight - scrollTop - clientHeight === 1) {
            handleChangeUrl();
        }
    };

    const handleClickOutside = () => {
        setShowListBox(false);
    };

    const handleInputClick = (item: T) => {
        console.log("handleInputClick", item);
        console.log(item);
        setselectedListItem(item);
        setShowListBox(false);
    };

    useEffect(() => {
        if (data && data?.length > 0 && fetchNewData) {
            setAllValue([...data, ...allValue]);
            setfetchNewData(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const handleOpenList = () => {
        console.log("handleOpenList");
        setfetchNewData(!fetchNewData);
        setShowListBox(!showListBox);
    };

    useEffect(() => {
        if (fetchNewData && allValue.length === 0) fetchDataById(fetchUrl);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchNewData]);

    useOnClickOutside(selectRef, handleClickOutside);
    return (
        <div ref={selectRef} className='server-select'>
            <div className='input-group '>
                <input
                    type='text'
                    value={searchTextValue}
                    onChange={(e) => setSearchTextValue(e.target.value)}
                    className='form-control'
                    placeholder={placeholder}
                />
                <span
                    onClick={handleOpenList}
                    className='input-group-text cursor-pointer'>
                    <ArrowDown />
                </span>
            </div>
            <div
                onScroll={(e) => handleScroll(e)}
                className={
                    showListBox
                        ? "list-box-container list-box-show"
                        : "list-box-container list-box-hide"
                }>
                {allValue?.map((item, index: number) => (
                    <li
                        key={index}
                        onClick={() => handleInputClick(item)}
                        className='server-select-li cursor-pointer'>
                        {item[showDataLabel] as string}
                    </li>
                ))}
            </div>
        </div>
    );
}

export default ServerSideSearchSelect;

// onScroll={(e) => handleScroll(e)}
