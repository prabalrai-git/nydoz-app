import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { ArrowDown } from "react-bootstrap-icons";
import useFetch from "../../../hooks/useFetch";
function ServerSelect(props) {
    const { baseUrl, setselectedListItem, placeholder } = props;
    const [selectedItemText, setSelectedItemText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [fetchUrl, setfetchUrl] = useState(`${baseUrl}?page=${currentPage}&per_page=15`);
    const [fetchNewData, setfetchNewData] = useState(false);
    const [showListBox, setShowListBox] = useState(false);
    const [allValue, setAllValue] = useState([]);
    const { data, isloading, fetchDataById } = useFetch(`${baseUrl}/api/Server/GetAllServers`, true);
    const handleChangeUrl = () => {
        setfetchNewData(true);
        setfetchUrl(`${baseUrl}?page=${currentPage + 1}&per_page=15`);
        setCurrentPage(currentPage + 1);
    };
    useEffect(() => {
        fetchDataById(fetchUrl);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchUrl]);
    const handleScroll = (e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
        if (scrollHeight - scrollTop === clientHeight) {
            handleChangeUrl();
        }
    };
    const handleInputClick = (item) => {
        setShowListBox(false);
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
        setfetchNewData(!fetchNewData);
        setShowListBox(!showListBox);
    };
    useEffect(() => {
        if (fetchNewData)
            fetchDataById(fetchUrl);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchNewData]);
    return (_jsxs("div", { className: "server-select", children: [_jsxs("div", { className: "input-group ", children: [_jsx("input", { type: "text", value: selectedItemText, onChange: (e) => setSelectedItemText(e.target.value), className: "form-control", placeholder: placeholder }), _jsx("span", { onClick: () => handleOpenList(), className: "input-group-text cursor-pointer", children: _jsx(ArrowDown, {}) })] }), _jsxs("div", { className: showListBox
                    ? "list-box-container list-box-show"
                    : "list-box-container list-box-hide", onScroll: (e) => handleScroll(e), children: [allValue?.map((item, index) => (_jsx("li", { onClick: () => handleInputClick(item), className: "server-select-li", children: item.first_name }, index))), isloading && (_jsx("li", { className: "server-select-li", children: _jsx("span", { className: "loader", children: "Loading..." }) }))] })] }));
}
export default ServerSelect;
