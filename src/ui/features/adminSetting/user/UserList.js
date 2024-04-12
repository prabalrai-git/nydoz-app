import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState, useEffect } from "react";
import API_ROUTE from "../../../../service/api";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from "react-router-dom";
import AddUsers from "./AddUser";
import useAuthContext from "../../../../context/auth/useAuthContext";
import useFetch from "../../../../hooks/useFetch";
import TanStackTable from "../../../shared/molecules/TanStackTable";
import { Tag } from "antd";
const UserList = () => {
    const navigate = useNavigate();
    const { companyInfo } = useAuthContext();
    const companyId = companyInfo?.id;
    const [selectedData, setSelectedData] = useState();
    const [show, setShow] = useState(false);
    const [openAddDocument, setOpenAddDocument] = useState(false);
    const [fetchAgain, setFetchAgain] = useState(false);
    const getListUrl = API_ROUTE.USER;
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
            accessorKey: "Name",
            header: () => (_jsx("div", { className: "tw-flex tw-gap-2", children: _jsx("p", { children: "Name" }) })),
            cell: (info) => {
                return (_jsx("div", { className: "d-flex align-items-center", children: _jsx("div", { className: "d-flex justify-content-start flex-column", children: _jsxs("a", { href: "#", className: "text-dark fw-bold text-hover-primary mb-1 fs-6 tw-capitalize", children: [info?.row?.original?.first_name, " ", info?.row?.original?.last_name] }) }) }));
            },
        },
        {
            accessorKey: "mobile",
            header: () => (_jsx("div", { children: _jsx("span", { children: "Mobile" }) })),
            cell: (info) => {
                return _jsx("div", { children: info.getValue() });
            },
        },
        {
            accessorKey: "email",
            header: () => (_jsx("div", { children: _jsx("span", { children: "Email" }) })),
            cell: (info) => {
                return _jsx("div", { children: info.getValue() });
            },
        },
        {
            accessorKey: "status",
            header: () => (_jsx("div", { children: _jsx("span", { children: "Status" }) })),
            cell: (info) => {
                if (info.getValue()?.title) {
                    return info
                        .getValue()
                        .title?.toLowerCase() === "inactive" ? (_jsx(Tag, { color: "red", children: "Inactive" })) : (_jsx(Tag, { color: "green", children: "Active" }));
                }
                else {
                    return _jsx(Tag, { children: "N/A" });
                }
            },
        },
        {
            accessorKey: "action",
            header: () => (_jsx("div", { className: "text-center", children: _jsx("span", { children: "Actions" }) })),
            cell: (info) => (_jsx("div", { className: "text-center", children: _jsx(DropdownButton, { variant: "secondary", size: "sm", id: "dropdown-basic-button", title: "Action", children: _jsx(Dropdown.Item, { children: _jsxs("div", { onClick: () => handleEditData(info?.row?.original), className: "menu-link", children: [_jsx("span", { className: "mx-2", children: "Edit" }), _jsx("i", { className: "bi bi-pencil-square text-info" })] }) }) }) })),
            footer: (info) => info.column.id,
        },
    ], [handleEditData]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleAddDocumentClose = () => setOpenAddDocument(false);
    const handleAddDocumentOpen = () => setOpenAddDocument(true);
    const handleOpenNewModal = () => {
        setSelectedData(undefined);
        handleAddDocumentOpen();
    };
    return (_jsxs("div", { children: [_jsx("section", { children: _jsxs("div", { className: "card", children: [_jsxs("div", { className: "card-header", children: [_jsx("h3", { className: "card-title", children: "All Users" }), _jsx("div", { className: "card-toolbar", children: _jsx("button", { onClick: handleOpenNewModal, className: "btn tw-bg-btnPrimary hover:tw-bg-btnPrimaryHover btn-sm", children: _jsx("span", { className: "mx-2 tw-text-white", children: "Add User" }) }) })] }), data && (_jsx("div", { className: "tw-p-6 tw-px-8", children: _jsx(TanStackTable, { columns: tableColumns, data: data, setPage: setPage, setPageSize: setPageSize, setFetchAgain: setFetchAgain, pagination: pagination }) }))] }) }), _jsx(AddUsers, { setFetchAgain: setFetchAgain, companyId: companyId || "", handleClose: handleAddDocumentClose, show: openAddDocument, selectedData: selectedData, setSelectedData: setSelectedData })] }));
};
export default UserList;
