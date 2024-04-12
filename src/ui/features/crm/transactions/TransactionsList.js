import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useCallback } from "react";
import API_ROUTE from "../../../../service/api";
import { useNavigate } from "react-router-dom";
import { AirplaneFill } from "react-bootstrap-icons";
import CompanyBreadcrumb from "../../../shared/molecules/CompanyBreadcrumb";
import SearchPaginationList from "../../../shared/components/SearchPaginationList";
import { RiDeleteBin5Line, RiFlagFill } from "react-icons/ri";
import { GoPersonFill } from "react-icons/go";
import { FaPhoneAlt, FaRegEdit } from "react-icons/fa";
import { BsPersonFillCheck } from "react-icons/bs";
import { Dropdown, DropdownButton } from "react-bootstrap";
const TransactionList = () => {
    const navigate = useNavigate();
    const searchFilter = ["first_name", "last_name", "email", "mobile"];
    const handleEditData = useCallback((item) => {
        navigate("../edit", {
            state: { data: item },
        });
    }, [navigate]);
    const tableColumns = useMemo(() => [
        {
            accessorKey: "sn",
            header: () => _jsx("div", { children: "S.N" }),
            cell: (info) => info.row.index + 1,
        },
        {
            accessorKey: "payment_method",
            header: () => (_jsxs("div", { className: "tw-flex tw-gap-2", children: [_jsx(GoPersonFill, { size: 16 }), _jsx("p", { children: "Payment Method" })] })),
            cell: (info) => {
                return (_jsx("div", { className: "d-flex align-items-center ", children: info.getValue().name }));
            },
        },
        {
            accessorKey: "financial_account",
            header: () => (_jsxs("div", { className: "tw-flex tw-gap-2", children: [_jsx(AirplaneFill, { size: 14 }), _jsx("p", { children: "Financial Account" })] })),
            cell: (info) => {
                return (_jsx("div", { className: "text-center tw-flex tw-justify-start", children: info.getValue().institute_name }));
            },
        },
        {
            accessorKey: "bill_number",
            header: () => (_jsxs("div", { className: "tw-flex tw-gap-2", children: [_jsx(FaPhoneAlt, { size: 14 }), _jsx("span", { children: "Bill Number" })] })),
            cell: (info) => {
                return _jsx("div", { children: info.getValue() });
            },
        },
        {
            accessorKey: "physical_bill_number",
            header: () => (_jsxs("div", { className: "tw-flex tw-gap-2", children: [_jsx(RiFlagFill, { size: 16 }), _jsx("span", { children: "Physical Bill Number" })] })),
            cell: (info) => {
                return (_jsx("div", { className: "text-center tw-flex tw-flex-start", children: info.getValue() }));
            },
        },
        {
            accessorKey: "amount",
            header: () => (_jsxs("div", { className: "tw-flex tw-gap-2", children: [_jsx(BsPersonFillCheck, { size: 18 }), _jsx("span", { children: "Amount" })] })),
            cell: (info) => {
                return _jsx("div", { children: info.getValue() });
            },
        },
        // {
        //   accessorKey: "payment_receipt_files",
        //   header: () => (
        //     <div className="tw-flex tw-gap-2">
        //       {/* <Flag size={16} className="mx-2" /> */}
        //       <BsPersonFillCheck size={18} />
        //       <span>Payment Receipt Files</span>
        //     </div>
        //   ),
        //   cell: (info) => {
        //     return <div>{info.getValue<string>()}</div>;
        //   },
        // },
        {
            accessorKey: "remarks",
            header: () => (_jsxs("div", { className: "tw-flex tw-gap-2", children: [_jsx(BsPersonFillCheck, { size: 18 }), _jsx("span", { children: "Remarks" })] })),
            cell: (info) => {
                return _jsx("div", { children: info.getValue() });
            },
        },
        {
            accessorKey: "transaction_type",
            header: () => (_jsxs("div", { className: "tw-flex tw-gap-2", children: [_jsx(BsPersonFillCheck, { size: 18 }), _jsx("span", { children: "Transaction Type" })] })),
            cell: (info) => {
                return _jsx("div", { children: info.getValue().name });
            },
        },
        {
            accessorKey: "action",
            header: () => (_jsx("div", { className: "text-center", children: _jsx("span", { children: "Actions" }) })),
            cell: (info) => (_jsx("div", { className: "tw-flex tw-justify-center", children: _jsxs(DropdownButton, { variant: "secondary", size: "sm", id: "dropdown-basic-button", title: "Action", children: [_jsx(Dropdown.Item, { onClick: () => handleEditData(info?.row?.original), children: _jsxs("button", { title: "Edit", className: "tw-flex tw-justify-between tw-gap-2 tw-font-bold ", children: [_jsx(FaRegEdit, { color: "blue", size: 15 }), _jsx("p", { children: "Edit" })] }) }), _jsx(Dropdown.Item, { onClick: () => window.alert("will delete later"), children: _jsxs("button", { className: "tw-flex tw-justify-between tw-gap-2 tw-font-bold", children: [_jsx(RiDeleteBin5Line, { color: "red", size: 15 }), _jsx("p", { children: "Delete" })] }) })] }) })),
            footer: (info) => info.column.id,
        },
    ], [handleEditData]);
    return (_jsxs("div", { className: "px-3", children: [_jsx(CompanyBreadcrumb, { title: "Transactions List", btnText: "Back", showBreadcrumb: true }), _jsx("section", { children: _jsxs("div", { className: "card", children: [_jsx("div", { className: "card-header", children: _jsx("h3", { className: "card-title", children: "Transaction's List" }) }), _jsx("div", { className: "card-body", children: _jsx(SearchPaginationList, { searchParamsArray: searchFilter, baseUrl: API_ROUTE.TRANSACTION, columns: tableColumns }) })] }) })] }));
};
export default TransactionList;
