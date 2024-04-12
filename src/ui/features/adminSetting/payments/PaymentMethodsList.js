import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState, useEffect } from "react";
import API_ROUTE from "../../../../service/api";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from "react-router-dom";
// import SearchPaginationList from "../../../shared/components/SearchPaginationList";
import useAuthContext from "../../../../context/auth/useAuthContext";
import useFetch from "../../../../hooks/useFetch";
import TanStackTable from "../../../shared/molecules/TanStackTable";
import DynamicForm from "./AddPaymentMethods";
import { Tag } from "antd";
const PaymentList = () => {
    const navigate = useNavigate();
    const [tableData, setTableData] = useState(undefined);
    const { companyInfo } = useAuthContext();
    const [selectedData, setSelectedData] = useState();
    const [show, setShow] = useState(false);
    const [openAddDocument, setOpenAddDocument] = useState(false);
    const [fetchAgain, setFetchAgain] = useState(false);
    const getListUrl = API_ROUTE.PAYMENT_METHODS;
    const companyId = companyInfo?.id;
    const { data, fetchData, setPage, setPageSize, pagination } = useFetch(getListUrl, true);
    // useEffect(() => {
    //   if (data) {
    //     if (tableData?.length > 0) {
    //       setTableData((prev) => {
    //         [...prev, ...data];
    //       });
    //     } else {
    //       setTableData(data);
    //     }
    //     console.log(data, "new data", tableData);
    //   }
    // }, [data, tableData]);
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
            accessorKey: "name",
            header: () => (_jsx("div", { children: _jsx("span", { children: "Name" }) })),
            cell: (info) => {
                return _jsx("div", { children: info.getValue() });
            },
        },
        {
            accessorKey: "is_account_required",
            header: () => (_jsx("div", { children: _jsx("span", { children: "Account Required" }) })),
            cell: (info) => {
                return (_jsx("div", { children: info.getValue() === false ? (_jsx(Tag, { color: "red", children: "False" })) : (_jsx(Tag, { color: "green", children: "True" })) }));
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
    return (_jsxs("div", { className: "card", children: [_jsxs("div", { className: "card-header", children: [_jsx("h3", { className: "card-title", children: "All Payment Methods" }), _jsx("div", { className: "card-toolbar", children: _jsx("button", { onClick: handleOpenNewModal, className: "btn tw-bg-btnPrimary hover:tw-bg-btnPrimaryHover btn-sm", children: _jsx("span", { className: "mx-2 tw-text-white", children: "Add Payment Method" }) }) })] }), data && (_jsx("div", { className: "tw-p-6 tw-px-8", children: _jsx(TanStackTable, { columns: tableColumns, data: data, setPage: setPage, setPageSize: setPageSize, setFetchAgain: setFetchAgain, pagination: pagination }) })), _jsx(DynamicForm, { setFetchAgain: setFetchAgain, companyId: companyId || "", handleClose: handleAddDocumentClose, show: openAddDocument, selectedData: selectedData, setSelectedData: setSelectedData })] }));
};
export default PaymentList;
