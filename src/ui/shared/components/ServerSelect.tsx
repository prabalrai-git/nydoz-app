import { Dispatch, SetStateAction, useState, useEffect, useRef } from "react";
import { ArrowDown } from "react-bootstrap-icons";
import useFetch from "../../../hooks/useFetch";
import { useOnClickOutside } from "usehooks-ts";

interface CommonItem {
    id: string;
    name: string;
    first_name: string;
}
interface IProps<T extends CommonItem> {
    baseUrl: string;
    selectedListItem: T | undefined;
    setselectedListItem: Dispatch<SetStateAction<T | undefined>>;
    placeholder: string;
    showDataLabel: string;
}

function ServerSelect<T extends CommonItem>(props: IProps<T>) {
    const { baseUrl, selectedListItem, setselectedListItem, placeholder } =
        props;
    const [selectedItemText, setSelectedItemText] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [fetchUrl, setfetchUrl] = useState<string>(
        `${baseUrl}?page=${currentPage}&per_page=15`
    );
    const [fetchNewData, setfetchNewData] = useState<boolean>(false);
    const [showListBox, setShowListBox] = useState<boolean>(false);
    const [allValue, setAllValue] = useState<T[]>([]);
    const { data, fetchDataById } = useFetch<T[]>(
        `${baseUrl}/api/Server/GetAllServers`,
        true
    );
    const selectRef = useRef(null);
    const handleChangeUrl = () => {
        console.log("handleChangeUrl");
        setfetchNewData(true);
        setfetchUrl(`${baseUrl}?page=${currentPage + 1}&per_page=15`);
        setCurrentPage(currentPage + 1);
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
        setSelectedItemText(item.first_name);
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
        if (fetchNewData) fetchDataById(fetchUrl);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchNewData]);

    useOnClickOutside(selectRef, handleClickOutside);
    return (
        <div className='server-select'>
            <div className='input-group '>
                <input
                    ref={selectRef}
                    type='text'
                    value={selectedItemText}
                    onChange={(e) => setSelectedItemText(e.target.value)}
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
                        {item.first_name}
                    </li>
                ))}
            </div>
        </div>
    );
}

export default ServerSelect;

// onScroll={(e) => handleScroll(e)}
