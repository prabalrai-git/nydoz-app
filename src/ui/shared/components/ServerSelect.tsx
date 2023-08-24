import {
    Dispatch,
    SetStateAction,
    useState,
    useEffect,
    useRef,
    MouseEvent,
} from "react";
import { ArrowDown } from "react-bootstrap-icons";
import useFetch from "../../../hooks/useFetch";
import { useOnClickOutside } from "usehooks-ts";
import { RESULT_PER_PAGE } from "../../../constants/AppSetting";

interface IProps<T> {
    baseUrl: string;
    selectedListItem: T | undefined;
    setselectedListItem: Dispatch<SetStateAction<T | undefined>>;
    placeholder: string;
    selectedItemText: string;
    setSelectedItemText: Dispatch<SetStateAction<string>>;
    showDataLabel: keyof T;
    showDataLabel2?: keyof T;
    showDataLabelFromArray?: keyof T;
}

function ServerSelect<T>(props: IProps<T>) {
    const {
        baseUrl,
        setselectedListItem,
        placeholder,
        showDataLabel,
        showDataLabel2,
        selectedItemText,
        setSelectedItemText,
    } = props;
    // const [selectedItemText, setSelectedItemText] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [fetchUrl, setfetchUrl] = useState<string>(
        `${baseUrl}?page=${currentPage}&per_page=${RESULT_PER_PAGE}`
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
        setfetchUrl(
            `${baseUrl}?page=${currentPage + 1}&per_page=${RESULT_PER_PAGE}`
        );
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

    const handleInputClick =
        (item: T) => (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
            e.stopPropagation();
            setselectedListItem(item);
            setSelectedItemText(e?.currentTarget?.innerText ?? "");
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
                    value={selectedItemText}
                    readOnly
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
                        &nbsp; {item[showDataLabel] as string} &nbsp;
                        {showDataLabel2 && (item[showDataLabel2] as string)}
                    </li>
                ))}
            </div>
        </div>
    );
}

export default ServerSelect;

// onScroll={(e) => handleScroll(e)}
