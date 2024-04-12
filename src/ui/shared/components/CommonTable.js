import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag, Tooltip } from "antd";
import Highlighter from "react-highlight-words";
import { IoMdPerson } from "react-icons/io";
import { FaEdit, FaPlane } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { RiFlagFill } from "react-icons/ri";
import { BsPersonFillCheck } from "react-icons/bs";
import { Select } from "antd";
import { MdDeleteForever } from "react-icons/md";
const data = [
    {
        key: 1,
        name: "John Brown",
        goingAbroad: true,
        mobile: "9818158172",
        visitingCountry: "India",
        agent: "Nydoz",
    },
    {
        key: 2,
        name: "John Brown",
        goingAbroad: false,
        mobile: "9818158172",
        visitingCountry: "India",
        agent: "Nydoz",
    },
    {
        key: 3,
        name: "John Brown",
        goingAbroad: true,
        mobile: "9818158172",
        visitingCountry: "India",
        agent: "Nydoz",
    },
    {
        key: 4,
        name: "John Brown",
        goingAbroad: false,
        mobile: "9818158172",
        visitingCountry: "India",
        agent: "Nydoz",
    },
    {
        key: 5,
        name: "John Brown",
        goingAbroad: true,
        mobile: "9818158172",
        visitingCountry: "India",
        agent: "Nydoz",
    },
    {
        key: 6,
        name: "John Brown",
        goingAbroad: true,
        mobile: "9818158172",
        visitingCountry: "China",
        agent: "hello world",
    },
];
const CommonTable = () => {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close, }) => (_jsxs("div", { style: { padding: 8 }, onKeyDown: (e) => e.stopPropagation(), children: [_jsx(Input, { ref: searchInput, placeholder: `Search ${dataIndex}`, value: selectedKeys[0], onChange: (e) => setSelectedKeys(e.target.value ? [e.target.value] : []), onPressEnter: () => handleSearch(selectedKeys, confirm, dataIndex), style: { marginBottom: 8, display: "block" } }), _jsxs(Space, { children: [_jsx(Button, { type: "primary", className: "tw-bg-blue-400", onClick: () => handleSearch(selectedKeys, confirm, dataIndex), icon: _jsx(SearchOutlined, {}), size: "small", style: { width: 90 }, children: "Search" }), _jsx(Button, { type: "link", size: "small", onClick: () => {
                                close();
                            }, children: "Close" })] })] })),
        filterIcon: (filtered) => (_jsx(SearchOutlined, { style: { color: filtered ? "#1677ff" : undefined } })),
        onFilter: (value, record) => record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) => searchedColumn === dataIndex ? (_jsx(Highlighter, { highlightStyle: { backgroundColor: "#ffc069", padding: 0 }, searchWords: [searchText], autoEscape: true, textToHighlight: text ? text.toString() : "" })) : (text),
    });
    const columns = [
        {
            title: "S.N",
            dataIndex: "key",
            key: "key",
            sorter: (a, b) => a.key - b.key,
        },
        {
            title: () => {
                return (_jsxs("div", { className: "tw-flex tw-justify-left tw-items-center tw-gap-2", children: [_jsx(IoMdPerson, {}), _jsx("p", { children: "Name" })] }));
            },
            dataIndex: "name",
            key: "name",
            render: (value) => (_jsxs("div", { className: "tw-h-[40px]", children: [_jsx("p", { className: "tw-text-base tw-font-semibold", children: value }), _jsx("p", { className: "tw-text-[12px] tw-text-gray-500 tw-lowercase", children: "demo@gmail.com" })] })),
            // width: "30%",
            // ...getColumnSearchProps("name"),
        },
        {
            title: () => {
                return (_jsxs("div", { className: "tw-flex tw-justify-left tw-items-center tw-gap-2 ", children: [_jsx(FaPlane, { size: 14 }), _jsx("p", { children: "Going Abroad" })] }));
            },
            dataIndex: "goingAbroad",
            key: "goingAbroad",
            render: (text, a) => {
                // return <h1>hello</h1>;
                return !text ? _jsx(Tag, { color: "red", children: "No" }) : _jsx(Tag, { color: "green", children: "Yes" });
            },
        },
        {
            title: () => {
                return (_jsxs("div", { className: "tw-flex tw-justify-left tw-items-center tw-gap-2 ", children: [_jsx(FaPhone, { size: 12 }), _jsx("p", { children: "Mobile Number" })] }));
            },
            dataIndex: "mobile",
            key: "mobile",
        },
        {
            title: () => {
                return (_jsxs("div", { className: "tw-flex tw-justify-left tw-items-center tw-gap-2 ", children: [_jsx(RiFlagFill, {}), _jsx("p", { children: "Visiting Country" })] }));
            },
            dataIndex: "visitingCountry",
            key: "visitingCountry",
        },
        {
            title: () => {
                return (_jsxs("div", { className: "tw-flex tw-justify-left tw-items-center tw-gap-2 ", children: [_jsx(BsPersonFillCheck, { size: 16 }), _jsx("p", { children: "Agent" })] }));
            },
            dataIndex: "agent",
            key: "agent",
        },
        {
            title: "Action",
            dataIndex: "goingAbroad",
            key: "goingAbroad",
            render: () => (_jsxs("div", { className: "tw-flex tw-gap-3 tw-justify-center", children: [_jsx(Tooltip, { title: "Edit", children: _jsx("div", { className: "tw-bg-appBlue tw-w-[35px] tw-flex tw-justify-center tw-p-2 tw-rounded-lg hover:tw-bg-appBlueHover tw-cursor-pointer", children: _jsx(FaEdit, { color: "white", size: 15 }) }) }), _jsx(Tooltip, { title: "Delete", children: _jsx("div", { className: "tw-bg-red-500 tw-w-[35px] tw-flex tw-justify-center tw-p-2 tw-rounded-lg hover:tw-bg-red-700 tw-cursor-pointer", children: _jsx(MdDeleteForever, { color: "white", size: 18 }) }) })] })),
        },
    ];
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "tw-flex tw-mb-5 tw-justify-end tw-gap-5 tw-h-[40px] tw-absolute tw-right-10 tw-z-50 ", children: [_jsx(Select, { showSearch: true, allowClear: true, style: { width: 350, height: 40 }, placeholder: "Search by", optionFilterProp: "children", filterOption: (input, option) => (option?.label ?? "").includes(input), options: [
                            {
                                value: "1",
                                label: "Name",
                            },
                            {
                                value: "2",
                                label: "Mobile Number",
                            },
                        ] }), _jsx(Input, { allowClear: true, style: { width: 350 }, placeholder: "Search value" }), _jsx("button", { className: "tw-bg-appBlue hover:tw-bg-appBlueHover tw-text-white tw-font-bold tw-px-6 tw-rounded-lg", children: "Search" })] }), _jsx(Table, { bordered: true, className: "tw-uppercase ", columns: columns, dataSource: data, pagination: {
                    position: ["topLeft"],
                    pageSize: 5,
                    total: 100,
                } })] }));
};
export default CommonTable;
