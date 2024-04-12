import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { ArrowDown } from "react-bootstrap-icons";
import useFetch from "../../../hooks/useFetch";
import { useOnClickOutside } from "usehooks-ts";
function ServerSideSearchSelect(props) {
    const { baseUrl, setselectedListItem, placeholder, searchBy, showDataLabel } = props;
    const [queryParameter, setQueryParameter] = useState({
        currentPage: 1,
        per_page: 15,
        searchTerm: "",
    });
    const [fetchUrl, setfetchUrl] = useState(`${baseUrl}?page=${queryParameter.currentPage}&per_page=15`);
    const [fetchNewData, setfetchNewData] = useState(false);
    const [showListBox, setShowListBox] = useState(false);
    const [allValue, setAllValue] = useState([]);
    const { data, fetchDataById } = useFetch(`${baseUrl}`, true);
    const [searchTextValue, setSearchTextValue] = useState("");
    useEffect(() => {
        if (searchTextValue.length <= 3) {
            return;
        }
        else {
            const timer = setTimeout(() => {
                setfetchUrl(`${baseUrl}?${searchBy}=${searchTextValue}page=${queryParameter.currentPage}&per_page=${queryParameter.per_page}`);
                setfetchNewData(true);
                setShowListBox(true);
            }, 500);
            return () => {
                clearTimeout(timer);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTextValue]);
    const selectRef = useRef(null);
    const handleChangeUrl = () => {
        setfetchNewData(true);
        setfetchUrl(`${baseUrl}?${searchBy}=${searchTextValue}page=${queryParameter.currentPage + 1}&per_page=${queryParameter.per_page}`);
        setfetchUrl(`${baseUrl}?page=${queryParameter.currentPage + 1}&per_page=15`);
        setQueryParameter(() => {
            return {
                ...queryParameter,
                currentPage: queryParameter.currentPage + 1,
            };
        });
    };
    useEffect(() => {
        if (fetchNewData)
            fetchDataById(fetchUrl);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchUrl]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleScroll = (e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
        if (scrollHeight - scrollTop - clientHeight === 1) {
            handleChangeUrl();
        }
    };
    const handleClickOutside = () => {
        setShowListBox(false);
    };
    const handleInputClick = (item) => {
        setselectedListItem(item);
        setSearchTextValue(item[showDataLabel]);
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
        setfetchNewData(!fetchNewData);
        setShowListBox(!showListBox);
    };
    useEffect(() => {
        if (fetchNewData && allValue.length === 0)
            fetchDataById(fetchUrl);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchNewData]);
    useOnClickOutside(selectRef, handleClickOutside);
    return (_jsxs("div", { ref: selectRef, className: "server-select", children: [_jsxs("div", { className: "input-group ", children: [_jsx("input", { type: "text", value: searchTextValue, onChange: (e) => setSearchTextValue(e.target.value), className: "form-control", placeholder: placeholder }), _jsx("span", { onClick: handleOpenList, className: "input-group-text cursor-pointer", children: _jsx(ArrowDown, {}) })] }), _jsx("div", { onScroll: (e) => handleScroll(e), className: showListBox
                    ? "list-box-container list-box-show"
                    : "list-box-container list-box-hide", children: allValue?.map((item, index) => (_jsx("li", { onClick: () => handleInputClick(item), className: "server-select-li cursor-pointer", children: item[showDataLabel] }, index))) })] }));
}
export default ServerSideSearchSelect;
