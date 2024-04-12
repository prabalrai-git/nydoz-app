import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState, useEffect } from "react";
import API_ROUTE from "../../../../service/api";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Tag } from "antd";
import useAuthContext from "../../../../context/auth/useAuthContext";
import useFetch from "../../../../hooks/useFetch";
import TanStackTable from "../../../shared/molecules/TanStackTable";
import AddStatus from "./AddStatus";
const StatusList = () => {
    const navigate = useNavigate();
    const { companyInfo } = useAuthContext();
    const companyId = companyInfo?.id;
    const [selectedData, setSelectedData] = useState();
    const [show, setShow] = useState(false);
    const [openAddDocument, setOpenAddDocument] = useState(false);
    const [fetchAgain, setFetchAgain] = useState(false);
    const getListUrl = API_ROUTE.STATUSES;
    const { data, fetchData, setPage, setPageSize, pagination } = useFetch(getListUrl, true);
    useEffect(() => {
        fetchData();
        setFetchAgain(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (fetchAgain) {
            fetchData();
            setFetchAgain(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchAgain]);
    const searchFilter = ["first_name", "email", "mobile"];
    const handleEditData = (item) => {
        setSelectedData(item);
        handleAddDocumentOpen();
    };
    const tableColumns = useMemo(() => [
        {
            accessorKey: "sn",
            header: () => _jsx("div", { children: "S.N" }),
            cell: (info) => info.row.index + 1,
        },
        {
            accessorKey: "title",
            header: () => (_jsx("div", { children: _jsx("span", { children: "Title" }) })),
            cell: (info) => {
                return _jsx("div", { children: info.getValue() });
            },
        },
        {
            accessorKey: "code",
            header: () => (_jsx("div", { children: _jsx("span", { children: "Code" }) })),
            cell: (info) => {
                return _jsx("div", { children: info.getValue() });
            },
        },
        {
            accessorKey: "background_color_class",
            header: () => (_jsx("div", { children: _jsx("span", { children: "Background Color Class" }) })),
            cell: (info) => {
                return _jsx("div", { children: info.getValue() });
            },
        },
        {
            accessorKey: "text_color_class",
            header: () => (_jsx("div", { children: _jsx("span", { children: "Text Color Class" }) })),
            cell: (info) => {
                return _jsx("div", { children: info.getValue() });
            },
        },
        // {
        //   accessorKey: "action_api_url",
        //   header: () => (
        //     <div>
        //       <span>Action Api URL</span>
        //     </div>
        //   ),
        //   cell: (info) => {
        //     return <div>{info.getValue<string>()}</div>;
        //   },
        // },
        {
            accessorKey: "group_code",
            header: () => (_jsx("div", { children: _jsx("span", { children: "Group Code" }) })),
            cell: (info) => {
                return _jsx("div", { children: info.getValue() });
            },
        },
        {
            accessorKey: "is_group_default",
            header: () => (_jsx("div", { children: _jsx("span", { children: "Is Group Default" }) })),
            cell: (info) => {
                return (_jsx("div", { children: info.getValue() === false ? (_jsx(Tag, { color: "red", children: "False" })) : (_jsx(Tag, { color: "green", children: "True" })) }));
            },
        },
        {
            accessorKey: "action",
            header: () => (_jsx("div", { className: "text-center", children: _jsx("span", { children: "Actions" }) })),
            cell: (info) => (_jsx("div", { className: "text-center", children: _jsxs(DropdownButton, { variant: "secondary", size: "sm", id: "dropdown-basic-button", title: "Action", children: [_jsx(Dropdown.Item, { children: _jsxs(Link, { to: `../view/${info?.row?.original?.id}`, className: "menu-link", children: [_jsx("span", { className: "mx-2", children: "View" }), _jsx("i", { className: "bi bi-box-arrow-up-right text-primary " })] }) }), _jsx(Dropdown.Item, { children: _jsxs("div", { onClick: () => handleEditData(info?.row?.original), className: "menu-link", children: [_jsx("span", { className: "mx-2", children: "Edit" }), _jsx("i", { className: "bi bi-pencil-square text-info" })] }) })] }) })),
            footer: (info) => info.column.id,
        },
    ], [handleEditData]);
    const handleOpenNewModal = () => {
        setSelectedData(undefined);
        handleAddDocumentOpen();
    };
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleAddDocumentClose = () => setOpenAddDocument(false);
    const handleAddDocumentOpen = () => setOpenAddDocument(true);
    return (_jsx("section", { children: _jsxs("div", { className: "card", children: [_jsxs("div", { className: "card-header", children: [_jsx("h3", { className: "card-title", children: "All Statuses" }), _jsx("div", { className: "card-toolbar", children: _jsx("button", { onClick: handleOpenNewModal, className: "btn tw-bg-btnPrimary hover:tw-bg-btnPrimaryHover btn-sm", children: _jsx("span", { className: "mx-2 tw-text-white", children: "Add Status" }) }) })] }), data && (_jsx("div", { className: "tw-p-6 tw-px-8", children: _jsx(TanStackTable, { columns: tableColumns, data: data, setPage: setPage, setPageSize: setPageSize, setFetchAgain: setFetchAgain, pagination: pagination }) })), _jsx(AddStatus, { setFetchAgain: setFetchAgain, companyId: companyId || "", handleClose: handleAddDocumentClose, show: openAddDocument, selectedData: selectedData, setSelectedData: setSelectedData })] }) }));
};
export default StatusList;
