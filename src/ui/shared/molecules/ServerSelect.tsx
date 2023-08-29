import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { ArrowDown } from "react-bootstrap-icons";
import useFetch from "../../../hooks/useFetch";

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
    showData: string;
}

function ServerSelect<T extends CommonItem>(props: IProps<T>) {
    const { baseUrl, setselectedListItem, placeholder } = props;
    const [selectedItemText, setSelectedItemText] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [fetchUrl, setfetchUrl] = useState<string>(
        `${baseUrl}?page=${currentPage}&per_page=15`
    );
    const [fetchNewData, setfetchNewData] = useState<boolean>(false);
    const [showListBox, setShowListBox] = useState<boolean>(false);
    const [allValue, setAllValue] = useState<T[]>([]);
    const { data, isloading, fetchDataById } = useFetch<T[]>(
        `${baseUrl}/api/Server/GetAllServers`,
        true
    );

    const handleChangeUrl = () => {
        console.log("handleChangeUrl");
        setfetchNewData(true);

        setfetchUrl(`${baseUrl}?page=${currentPage + 1}&per_page=15`);
        setCurrentPage(currentPage + 1);
    };

    useEffect(() => {
        fetchDataById(fetchUrl);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchUrl]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        console.log("handleScroll");
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
        if (scrollHeight - scrollTop === clientHeight) {
            handleChangeUrl();
        }
    };

    const handleInputClick = (item: T) => {
        setShowListBox(false);
        console.log(item);
        setselectedListItem(item);
        setSelectedItemText(item.first_name);
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

    return (
        <div className='server-select'>
            <div className='input-group '>
                <input
                    type='text'
                    value={selectedItemText}
                    onChange={(e) => setSelectedItemText(e.target.value)}
                    className='form-control'
                    placeholder={placeholder}
                />
                <span
                    onClick={() => handleOpenList()}
                    className='input-group-text cursor-pointer'>
                    <ArrowDown />
                </span>
            </div>
            <div
                className={
                    showListBox
                        ? "list-box-container list-box-show"
                        : "list-box-container list-box-hide"
                }
                onScroll={(e: React.UIEvent<HTMLDivElement>) =>
                    handleScroll(e)
                }>
                {allValue?.map((item, index: number) => (
                    <li
                        key={index}
                        onClick={() => handleInputClick(item)}
                        className='server-select-li'>
                        {item.first_name}
                    </li>
                ))}
                {isloading && (
                    <li className='server-select-li'>
                        <span className='loader'>Loading...</span>
                    </li>
                )}
            </div>
        </div>
    );
}

export default ServerSelect;
