import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef, } from "react";
import { ArrowDown } from "react-bootstrap-icons";
import useFetch from "../../../hooks/useFetch";
import { useOnClickOutside } from "usehooks-ts";
import { RESULT_PER_PAGE } from "../../../constants/AppSetting";
function ServerSelect(props) {
    const { baseUrl, setselectedListItem, placeholder, showDataLabel, showDataLabel2, selectedItemText, setSelectedItemText, } = props;
    // const [selectedItemText, setSelectedItemText] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);
    const [fetchUrl, setfetchUrl] = useState(`${baseUrl}?page=${currentPage}&per_page=${RESULT_PER_PAGE}`);
    const [fetchNewData, setfetchNewData] = useState(false);
    const [showListBox, setShowListBox] = useState(false);
    const [allValue, setAllValue] = useState([]);
    const { data, fetchDataById } = useFetch(`${baseUrl}/api/Server/GetAllServers`, true);
    const selectRef = useRef(null);
    const handleChangeUrl = () => {
        setfetchNewData(true);
        setfetchUrl(`${baseUrl}?page=${currentPage + 1}&per_page=${RESULT_PER_PAGE}`);
        setCurrentPage(currentPage + 1);
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
    const handleInputClick = (item) => (e) => {
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
        setfetchNewData(!fetchNewData);
        setShowListBox(!showListBox);
    };
    useEffect(() => {
        if (fetchNewData && allValue.length === 0)
            fetchDataById(fetchUrl);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchNewData]);
    useOnClickOutside(selectRef, handleClickOutside);
    return (_jsxs("div", { ref: selectRef, className: "server-select", children: [_jsxs("div", { className: "input-group ", children: [_jsx("input", { type: "text", value: selectedItemText, readOnly: true, className: "form-control", placeholder: placeholder }), _jsx("span", { onClick: handleOpenList, className: "input-group-text cursor-pointer", children: _jsx(ArrowDown, {}) })] }), _jsx("div", { onScroll: (e) => handleScroll(e), className: showListBox
                    ? "list-box-container list-box-show"
                    : "list-box-container list-box-hide", children: allValue?.map((item, index) => (_jsxs("li", { onClick: () => handleInputClick(item), className: "server-select-li cursor-pointer", children: ["\u00A0 ", item[showDataLabel], " \u00A0", showDataLabel2 && item[showDataLabel2]] }, index))) })] }));
}
export default ServerSelect;
