import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Statistic } from "antd";
import CompanyBreadcrumb from "../../shared/molecules/CompanyBreadcrumb";
import { MdAttachMoney, MdOutlinePayments } from "react-icons/md";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { GoArrowDown, GoArrowUp, GoPersonFill } from "react-icons/go";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AirplaneFill } from "react-bootstrap-icons";
import { RiFlagFill } from "react-icons/ri";
import { BsPersonFillCheck } from "react-icons/bs";
import API_ROUTE from "../../../service/api";
import TanStackTable from "../../shared/molecules/TanStackTable";
import useFetch from "../../../hooks/useFetch";
import { dailyQuotes } from "../../../constants/DailyQuotes";
const Dashboard = () => {
    const navigate = useNavigate();
    const [quote, setQuote] = useState("");
    const getListUrl = API_ROUTE.TRANSACTION;
    const { data, fetchData } = useFetch(getListUrl, true);
    useEffect(() => {
        fetchData();
        setQuote(dailyQuotes[Math.floor(Math.random() * dailyQuotes.length)]);
    }, []);
    const handleEditData = useCallback((item) => {
        navigate("edit", {
            state: { data: item },
        });
    }, [navigate]);
    const tableColumnsTransactions = useMemo(() => [
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
    ], [handleEditData]);
    const ClientTransaction = () => {
        return (_jsx("section", { className: "tw-mt-2", children: _jsxs("div", { className: "card", children: [_jsx("div", { className: "card-header", children: _jsx("h3", { className: "card-title", children: "Recent Transactions" }) }), _jsx("div", { className: "card-body  ", children: data && (_jsx("div", { className: "tw-px-8", children: _jsx(TanStackTable, { columns: tableColumnsTransactions, data: data }) })) })] }) }));
    };
    return (_jsxs("div", { className: "tw-mx-3", children: [_jsx(CompanyBreadcrumb, { title: "Client Management Dashboard", 
                // btnText="Back"
                showBreadcrumb: true }), _jsxs("section", { className: "tw-flex tw-flex-col tw-gap-5", children: [_jsxs("div", { className: "tw-grid tw-grid-rows-3 tw-grid-flow-col  tw-gap-7 lg:tw-grid-cols-2 md:tw-grid-cols-1", children: [_jsx("div", { className: "card card-custom tw-row-span-3", children: _jsx("div", { className: "card-body tw-flex ", children: _jsxs("div", { className: "tw-flex tw-flex-col tw-gap-10", children: [_jsxs("div", { children: [_jsx("h1", { className: "tw-text-2xl tw-font-semibold", children: "Greetings! How are you doing today?" }), _jsxs("p", { className: "tw-mt-4 tw-text-gray-500", children: ["\"", quote, "\""] })] }), _jsx("div", { children: _jsx(Statistic, { title: "Total Clients", value: 112893 }) }), _jsx("button", { onClick: () => navigate("../clients/add"), className: "tw-self-start tw-bg-btnPrimary hover:tw-bg-btnPrimaryHover tw-text-white tw-p-4 tw-px-8 tw-font-semibold tw-rounded-lg", children: "Create A New Client" })] }) }) }), _jsx("div", { className: "card card-custom ", children: _jsxs("div", { className: "card-body tw-flex tw-gap-4  -tw-mt-4 -tw-mb-4 ", children: [_jsx("div", { className: "tw-bg-appBlue tw-flex tw-justify-center tw-items-center tw-px-4 tw-rounded-lg ", children: _jsx(MdAttachMoney, { size: 20, color: "white" }) }), _jsx(Statistic, { title: "Total Earnings", value: 112893 })] }) }), _jsx("div", { className: "card card-custom", children: _jsxs("div", { className: "card-body tw-flex tw-gap-4 -tw-mt-4 -tw-mb-4 ", children: [_jsx("div", { className: "tw-bg-appBrown tw-flex tw-justify-center tw-items-center tw-px-4 tw-rounded-lg ", children: _jsx(HiOutlineReceiptRefund, { size: 20, color: "white" }) }), _jsx(Statistic, { title: "Total Refunds", value: 112893 })] }) }), _jsx("div", { className: "card card-custom", children: _jsxs("div", { className: "card-body card-body tw-flex tw-gap-4 -tw-mt-4 -tw-mb-4 ", children: [_jsx("div", { className: "tw-bg-appRed tw-flex tw-justify-center tw-items-center tw-px-4 tw-rounded-lg ", children: _jsx(MdOutlinePayments, { size: 20, color: "white" }) }), _jsx(Statistic, { title: "Total Payable Amount", value: 112893 })] }) })] }), _jsxs("div", { className: "tw-grid tw-grid-cols-4 tw-gap-8 tw-mt-2 xsm:tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-4", children: [_jsx("div", { className: "card card-custom", children: _jsxs("div", { className: "card-body tw-flex tw-gap-4 -tw-mt-4 -tw-mb-4 ", children: [_jsx("div", { className: "tw-bg-appLightGreen tw-flex tw-justify-center tw-items-center tw-px-5 tw-rounded-lg tw-text-btnPrimary ", children: _jsx(GoArrowUp, { size: 20 }) }), _jsx(Statistic, { title: "Total Sales", value: 112893 })] }) }), _jsx("div", { className: "card card-custom", children: _jsxs("div", { className: "card-body tw-flex tw-gap-4 -tw-mt-4 -tw-mb-4 ", children: [_jsx("div", { className: "tw-bg-appLightGreen tw-flex tw-justify-center tw-items-center tw-px-5 tw-rounded-lg tw-text-btnPrimary ", children: _jsx(GoArrowUp, { size: 20 }) }), _jsx(Statistic, { title: "Total Sales", value: 112893 })] }) }), _jsx("div", { className: "card card-custom", children: _jsxs("div", { className: "card-body tw-flex tw-gap-4 -tw-mt-4 -tw-mb-4 ", children: [_jsx("div", { className: "tw-bg-appLightGreen tw-flex tw-justify-center tw-items-center tw-px-5 tw-rounded-lg tw-text-btnPrimary ", children: _jsx(GoArrowUp, { size: 20 }) }), _jsx(Statistic, { title: "Total Sales", value: 112893 })] }) }), _jsx("div", { className: "card card-custom", children: _jsxs("div", { className: "card-body tw-flex tw-gap-4 -tw-mt-4 -tw-mb-4 ", children: [_jsx("div", { className: "tw-bg-appLightGreen tw-flex tw-justify-center tw-items-center tw-px-5 tw-rounded-lg tw-text-btnPrimary ", children: _jsx(GoArrowUp, { size: 20 }) }), _jsx(Statistic, { title: "Total Sales", value: 112893 })] }) })] }), _jsxs("div", { className: "tw-grid tw-grid-cols-4 tw-gap-7 xsm:tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-4", children: [_jsx("div", { className: "card card-custom", children: _jsxs("div", { className: "card-body tw-flex tw-gap-4 -tw-mt-4 -tw-mb-4 ", children: [_jsx("div", { className: "tw-bg-appLightRed tw-flex tw-justify-center tw-items-center tw-px-5 tw-rounded-lg tw-text-appRed ", children: _jsx(GoArrowDown, { size: 20 }) }), _jsx(Statistic, { title: "Total Sales", value: 112893 })] }) }), _jsx("div", { className: "card card-custom", children: _jsxs("div", { className: "card-body tw-flex tw-gap-4 -tw-mt-4 -tw-mb-4 ", children: [_jsx("div", { className: "tw-bg-appLightRed tw-flex tw-justify-center tw-items-center tw-px-5 tw-rounded-lg tw-text-appRed ", children: _jsx(GoArrowDown, { size: 20 }) }), _jsx(Statistic, { title: "Total Sales", value: 112893 })] }) }), _jsx("div", { className: "card card-custom", children: _jsxs("div", { className: "card-body tw-flex tw-gap-4 -tw-mt-4 -tw-mb-4 ", children: [_jsx("div", { className: "tw-bg-appLightRed tw-flex tw-justify-center tw-items-center tw-px-5 tw-rounded-lg tw-text-appRed ", children: _jsx(GoArrowDown, { size: 20 }) }), _jsx(Statistic, { title: "Total Sales", value: 112893 })] }) }), _jsx("div", { className: "card card-custom", children: _jsxs("div", { className: "card-body tw-flex tw-gap-4 -tw-mt-4 -tw-mb-4 ", children: [_jsx("div", { className: "tw-bg-appLightRed tw-flex tw-justify-center tw-items-center tw-px-5 tw-rounded-lg tw-text-appRed ", children: _jsx(GoArrowDown, { size: 20 }) }), _jsx(Statistic, { title: "Total Sales", value: 112893 })] }) })] }), _jsx("div", { className: "card card-custom tw-mt-3", children: _jsx(ClientTransaction, {}) })] })] }));
};
export default Dashboard;
