import React, { useRef, useState, useEffect } from "react";
import { ArrowDown } from "react-bootstrap-icons";
import useFetch from "../../../hooks/useFetch";
import { useUpdateEffect } from "usehooks-ts";

const ServerSelect = ({ baseUrl }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [fetchUrl, setfetchUrl] = useState(
        `${baseUrl}?page=${currentPage}&per_page=15`
    );
    const [newData, setNewData] = useState(true);
    const [showListBox, setShowListBox] = useState<boolean>(false);
    const [selectedListItem, setselectedListItem] = useState();
    const [selectedItemText, setSelectedItemText] = useState("");
    const scrollRef = useRef(null);
    const [allValue, setAllValue] = useState([]);
    const { data, isloading, fetchDataById } = useFetch(
        `${baseUrl}/api/Server/GetAllServers`,
        true
    );
    const prevDataRef = useRef([]);

    const handleChangeUrl = () => {
        console.log("handleChangeUrl");
        setfetchUrl(`${baseUrl}?page=${currentPage + 1}&per_page=15`);
        setCurrentPage(currentPage + 1);
        setNewData(true);
    };

    useEffect(() => {
        fetchDataById(fetchUrl);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchUrl]);

    const handleScroll = (e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
        const element = scrollRef.current;

        if (scrollHeight - scrollTop === clientHeight) {
            handleChangeUrl();
        }
    };

    const handleInputClick = (item) => {
        setShowListBox(false);
        console.log(item);
        setSelectedItemText(item.first_name);
        setselectedListItem(item);
    };

    useEffect(() => {
        if (data?.length > 0 && newData) {
            setAllValue([...data, ...allValue]);
            setNewData(false);
        }
    }, [data]);

    return (
        <div className='server-select'>
            <div className='input-group '>
                <input
                    type='text'
                    value={selectedItemText}
                    onChange={(e) => setSelectedItemText(e.target.value)}
                    className='form-control'
                    placeholder='search...'
                />
                <span
                    onClick={() => setShowListBox(!showListBox)}
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
                onScroll={handleScroll}>
                {allValue?.map((item, index: number) => (
                    <li
                        key={index}
                        onClick={() => handleInputClick(item)}
                        className='server-select-li'>
                        {item.first_name}
                    </li>
                ))}
            </div>
        </div>
    );
};

export default ServerSelect;
