import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import CompanyBreadcrumb from "../../../shared/molecules/CompanyBreadcrumb";
import { Tabs, Tag } from "antd";
import SearchPaginationList from "../../../shared/components/SearchPaginationList";
import API_ROUTE from "../../../../service/api";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GoPersonFill } from "react-icons/go";
import { AirplaneFill } from "react-bootstrap-icons";
import { FaPhoneAlt, FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line, RiFlagFill } from "react-icons/ri";
import { BsPersonFillCheck } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";
import { GrMoney } from "react-icons/gr";
import { Dropdown, DropdownButton, Spinner } from "react-bootstrap";
import { SiGoogledocs } from "react-icons/si";
import ClientsDocuments from "./ClientsDocuments";
const ClientDetails = () => {
    const [clientBasicInfo, setClientBasicInfo] = useState();
    const { clientId } = useParams();
    const { fetchData, isloading, data, pagination } = useFetch(`${API_ROUTE.GET_TRANSACTION}/${clientId}`, true);
    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        if (data && !isloading) {
            const clientData = {
                agent: `${data.agent.first_name} ${data.agent.last_name}`,
                applied_position: data.applied_position,
                country: data.country,
                deal_amount: numberWithCommas(data.deal_amount.toString()),
                salary_currency_code: data.salary_currency_code,
                // Convert deal_amount to string
                email: data.email.toString(),
                enroll_institute: "",
                enroll_opening: "",
                expected_salary_pa: numberWithCommas(data.expected_salary_pa.toString()),
                expected_take_off_date: data.expected_take_off_date.split(" ")[0],
                name: `${data.first_name} ${data.last_name}`,
                phone: data.phone_nos.toString(),
                state: data.state,
                street_address: data.street_address,
                visa_type: data.visa_type.name,
                visiting_country: data.visiting_country,
                visiting_country_state: data.visiting_country_state,
            };
            setClientBasicInfo(clientData);
        }
    }, [data]);
    const searchFilter = [
        "payment_method",
        "physical_bill_number",
        "financial_account",
        "transaction_type",
    ];
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const navigate = useNavigate();
    const handleEditData = useCallback((item) => {
        navigate("../../transactions/edit", {
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
        // {
        //   accessorKey: "custom_field_values",
        //   header: () => (
        //     <div className="tw-flex tw-gap-2">
        //       {/* <Flag size={16} className="mx-2" /> */}
        //       <BsPersonFillCheck size={18} />
        //       <span>Custom Field Values</span>
        //     </div>
        //   ),
        //   cell: (info) => {
        //     return (
        //       <div>
        //         {info.getValue<Partial<IAgentResponse>>() ? (
        //           <div>
        //             <span>
        //               {" "}
        //               {info.getValue<Partial<IAgentResponse>>()?.first_name}
        //             </span>
        //             <span>
        //               {" "}
        //               {info.getValue<Partial<IAgentResponse>>()?.last_name}
        //             </span>
        //           </div>
        //         ) : (
        //           <Tag>NA</Tag>
        //         )}
        //       </div>
        //     );
        //   },
        // },
        {
            accessorKey: "action",
            header: () => (_jsx("div", { className: "text-center", children: _jsx("span", { children: "Actions" }) })),
            cell: (info) => (_jsx("div", { className: "tw-flex tw-justify-center", children: _jsxs(DropdownButton, { variant: "secondary", size: "sm", id: "dropdown-basic-button", title: "Action", children: [_jsx(Dropdown.Item, { onClick: () => handleEditData(info?.row?.original), children: _jsxs("button", { title: "Edit", className: "tw-flex tw-justify-between tw-gap-2 tw-font-bold ", children: [_jsx(FaRegEdit, { color: "blue", size: 15 }), _jsx("p", { children: "Edit" })] }) }), _jsx(Dropdown.Item, { onClick: () => window.alert("will delete later"), children: _jsxs("button", { className: "tw-flex tw-justify-between tw-gap-2 tw-font-bold", children: [_jsx(RiDeleteBin5Line, { color: "red", size: 15 }), _jsx("p", { children: "Delete" })] }) })] }) })),
            footer: (info) => info.column.id,
        },
    ], [handleEditData]);
    const ClientTransaction = () => {
        return (_jsx("section", { className: "tw-mt-10", children: _jsxs("div", { className: "card", children: [_jsx("div", { className: "card-header", children: _jsx("h3", { className: "card-title", children: " Transactions" }) }), _jsx("div", { className: "card-body  ", children: _jsx(SearchPaginationList, { searchParamsArray: searchFilter, baseUrl: `${API_ROUTE.GET_TRANSACTION}/${clientId}/transactions`, columns: tableColumnsTransactions }) })] }) }));
    };
    const navpills = [
        {
            id: 2,
            title: "Clients Douments",
            icon: _jsx(SiGoogledocs, { size: 18, className: "tw-mr-2 tw-self-center" }),
            children: _jsx(ClientsDocuments, {}),
        },
        {
            id: 1,
            title: "Clients Transactions",
            icon: _jsx(GrMoney, { size: 18, className: "tw-mr-2 tw-self-center" }),
            children: _jsx(ClientTransaction, {}),
        },
    ];
    return (_jsx(_Fragment, { children: data ? (_jsxs(_Fragment, { children: [_jsx(CompanyBreadcrumb, { title: "Clients Details", btnText: "Back", showBreadcrumb: false }), _jsxs("div", { className: "tw-px-2", children: [_jsx("section", { className: "tw-mt-10", children: _jsxs("div", { className: "card", children: [_jsx("div", { className: "card-header", children: _jsx("h3", { className: "card-title", children: "Basic Information" }) }), _jsx("div", { className: "card-body tw-grid xl:tw-grid-cols-5 sm:tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 tw-gap-9  ", children: clientBasicInfo &&
                                            Object.entries(clientBasicInfo).map(([key, value], index) => (_jsxs("div", { className: "  ", children: [_jsx("p", { className: "tw-mr-2 tw-mb-2 tw-uppercase tw-text-sm tw-font-semibold tw-text-gray-400", children: key.replace(/_/g, " ") }), value ? (_jsx("p", { className: "tw-text-base tw-capitalize", children: value.toString() })) : (_jsx(Tag, { color: "red", children: "N/A" })), " "] }, index))) })] }) }), _jsx(Tabs
                        // type="card"
                        , { 
                            // type="card"
                            className: "tw-py-10 ", defaultActiveKey: "2", items: navpills.map((item) => {
                                return {
                                    key: item.id,
                                    label: item.title,
                                    children: item.children,
                                    icon: item.icon,
                                };
                            }) })] })] })) : (isloading && (_jsx("div", { className: "text-center my-6 px-3", children: _jsx(Spinner, { variant: "warning" }) }))) }));
};
export default ClientDetails;
