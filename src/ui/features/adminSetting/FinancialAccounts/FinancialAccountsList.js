import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState, useEffect } from "react";
import API_ROUTE from "../../../../service/api";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";
import useAuthContext from "../../../../context/auth/useAuthContext";
import TanStackTable from "../../../shared/molecules/TanStackTable";
import AddFinancialAccount from "./AddFinancialAccount";
const FinancialAccountsList = () => {
    const navigate = useNavigate();
    const { companyInfo } = useAuthContext();
    const [selectedData, setSelectedData] = useState();
    const [show, setShow] = useState(false);
    const [openAddDocument, setOpenAddDocument] = useState(false);
    const [fetchAgain, setFetchAgain] = useState(false);
    const companyId = companyInfo?.id;
    const searchFilter = [
        "institute_name",
        "account_name",
        "account_number",
        "swift_code",
    ];
    const getListUrl = API_ROUTE.FINANCIAL_ACCOUNT;
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
            accessorKey: "institute_name",
            header: () => (_jsx("div", { children: _jsx("span", { children: "Institute Name" }) })),
            cell: (info) => {
                return _jsx("div", { children: info.getValue() });
            },
        },
        {
            accessorKey: "institute_site",
            header: () => (_jsx("div", { children: _jsx("span", { children: "Institute Site" }) })),
            cell: (info) => {
                return _jsx("div", { children: info.getValue() });
            },
        },
        {
            accessorKey: "account_name",
            header: () => (_jsx("div", { children: _jsx("span", { children: "Account Name" }) })),
            cell: (info) => {
                return _jsx("div", { children: info.getValue() });
            },
        },
        {
            accessorKey: "account_number",
            header: () => (_jsx("div", { children: _jsx("span", { children: "Account Number" }) })),
            cell: (info) => {
                return _jsx("div", { children: info.getValue() });
            },
        },
        {
            accessorKey: "swift_code",
            header: () => (_jsx("div", { children: _jsx("span", { children: "Swift Code" }) })),
            cell: (info) => {
                return _jsx("div", { children: info.getValue() });
            },
        },
        {
            accessorKey: "branch_name",
            header: () => (_jsx("div", { children: _jsx("span", { children: "Branch Name" }) })),
            cell: (info) => {
                return _jsx("div", { children: info.getValue() });
            },
        },
        {
            accessorKey: "branch_address",
            header: () => (_jsx("div", { children: _jsx("span", { children: "Branch Address" }) })),
            cell: (info) => {
                return _jsx("div", { children: info.getValue() });
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
    return (_jsxs("div", { className: "card", children: [_jsxs("div", { className: "card-header", children: [_jsx("h3", { className: "card-title", children: "All Financial Accounts" }), _jsx("div", { className: "card-toolbar", children: _jsx("button", { onClick: handleOpenNewModal, className: "btn tw-bg-btnPrimary hover:tw-bg-btnPrimaryHover btn-sm", children: _jsx("span", { className: "mx-2 tw-text-white", children: "Add Financial Account " }) }) })] }), data && (_jsx("div", { className: "tw-p-6 tw-px-8", children: _jsx(TanStackTable, { columns: tableColumns, data: data, setPage: setPage, setPageSize: setPageSize, setFetchAgain: setFetchAgain, pagination: pagination }) })), _jsx(AddFinancialAccount, { setFetchAgain: setFetchAgain, companyId: companyId || "", handleClose: handleAddDocumentClose, show: openAddDocument, selectedData: selectedData, setSelectedData: setSelectedData })] }));
};
export default FinancialAccountsList;
