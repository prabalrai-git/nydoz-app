import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useCallback } from "react";
import API_ROUTE from "../../../../service/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CompanyBreadcrumb from "../../../shared/molecules/CompanyBreadcrumb";
import SearchPaginationList from "../../../shared/components/SearchPaginationList";
import { GoEye, GoPersonFill } from "react-icons/go";
import { FaPhoneAlt, FaRegEdit } from "react-icons/fa";
import { RiFlagFill } from "react-icons/ri";
import { BsPersonFillCheck } from "react-icons/bs";
import { Tag } from "antd";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { GrTransaction } from "react-icons/gr";
const ClientList = () => {
    const navigate = useNavigate();
    const searchFilter = ["first_name", "last_name"];
    const handleEditData = useCallback((item) => {
        navigate("edit", {
            state: { data: item },
        });
    }, [navigate]);
    const handleView = useCallback((id) => {
        navigate(`./${id}`, {
            state: { clientId: id },
        });
    }, [navigate]);
    const tableColumns = useMemo(() => [
        {
            accessorKey: "sn",
            header: () => _jsx("div", { children: "S.N" }),
            cell: (info) => info.row.index + 1,
        },
        {
            accessorKey: "Name",
            header: () => (_jsxs("div", { className: "tw-flex tw-gap-2", children: [_jsx(GoPersonFill, { size: 16 }), _jsx("p", { children: "Name" })] })),
            cell: (info) => {
                return (_jsx("div", { className: "d-flex align-items-center", children: _jsxs("div", { className: "d-flex justify-content-start flex-column", children: [_jsxs("a", { href: "#", className: "text-dark fw-bold text-hover-primary mb-1 fs-6 tw-capitalize", children: [info?.row?.original?.first_name, " ", info?.row?.original?.last_name] }), _jsx("span", { className: "text-muted fw-semibold d-block fs-7", children: info?.row?.original?.email.toString() })] }) }));
            },
        },
        // {
        //   accessorKey: "going_to_foreign",
        //   header: () => (
        //     <div className="tw-flex tw-gap-2">
        //       <AirplaneFill size={14} />
        //       <p>Going Aboard</p>
        //     </div>
        //   ),
        //   cell: (info) => {
        //     return (
        //       <div className="text-center tw-flex tw-justify-start">
        //         {info.getValue<string>() ? (
        //           // <span className="badge badge-success">YES</span>
        //           <Tag color="green">Yes</Tag>
        //         ) : (
        //           <Tag color="red">No</Tag>
        //           // <span className="badge badge-danger px-3">NO</span>
        //         )}
        //       </div>
        //     );
        //   },
        // },
        {
            accessorKey: "phone_nos",
            header: () => (_jsxs("div", { className: "tw-flex tw-gap-2", children: [_jsx(FaPhoneAlt, { size: 14 }), _jsx("span", { children: "Mobile Number" })] })),
            cell: (info) => {
                return (_jsx("div", { children: info.getValue()?.length > 0 &&
                        info.getValue()[0] }));
            },
        },
        {
            accessorKey: "visiting_country",
            header: () => (_jsxs("div", { className: "tw-flex tw-gap-2", children: [_jsx(RiFlagFill, { size: 16 }), _jsx("span", { children: "Visiting Country" })] })),
            cell: (info) => {
                return (_jsx("div", { className: "text-center tw-flex tw-justify-start", children: info.getValue() ? (info.getValue()) : (_jsx("span", { className: "badge badge-warning px-3", children: "NA" })) }));
            },
        },
        {
            accessorKey: "agent",
            header: () => (_jsxs("div", { className: "tw-flex tw-gap-2", children: [_jsx(BsPersonFillCheck, { size: 18 }), _jsx("span", { children: "Agent" })] })),
            cell: (info) => {
                return (_jsx("div", { children: info.getValue() ? (_jsxs("div", { children: [_jsxs("span", { children: [" ", info.getValue()?.first_name] }), _jsxs("span", { children: [" ", info.getValue()?.last_name] })] })) : (_jsx(Tag, { children: "NA" })
                    // <span className="badge badge-warning px-3">NA</span>
                    ) }));
            },
        },
        {
            accessorKey: "action",
            header: () => (_jsx("div", { className: "text-center", children: _jsx("span", { children: "Actions" }) })),
            cell: (info) => (_jsx("div", { className: "d-flex justify-content-center  tw-h-9", children: _jsxs(DropdownButton, { variant: "secondary", size: "sm", id: "dropdown-basic-button", title: "Action", children: [_jsx(Dropdown.Item, { onClick: () => handleView(info?.row?.original?.id), children: _jsxs("button", { title: "view", className: "tw-flex tw-justify-between tw-gap-2 tw-font-bold ", children: [_jsx(GoEye, { color: "green", size: 15 }), _jsx("p", { children: "View" })] }) }), _jsx(Dropdown.Item, { onClick: () => handleEditData(info?.row?.original), children: _jsxs("button", { title: "Edit", className: "tw-flex tw-gap-2 tw-items-center tw-font-bold", children: [_jsx(FaRegEdit, { color: "blue", size: 15 }), _jsx("p", { children: "Edit" })] }) }), _jsx(Dropdown.Item, { onClick: () => {
                                navigate(`../transactions/add?client_id=${info?.row?.original?.id}`);
                            }, children: _jsxs("button", { title: "Add Transaction", className: "tw-flex tw-gap-2 tw-items-center tw-font-bold", children: [_jsx(GrTransaction, { color: "brown", size: 15 }), _jsx("p", { children: "Add Transaction" })] }) })] }) })),
            footer: (info) => info.column.id,
        },
    ], [handleEditData]);
    return (_jsxs("div", { className: " px-3", children: [_jsx(CompanyBreadcrumb, { title: "Client List", btnText: "Back", showBreadcrumb: true }), _jsx("section", { children: _jsxs("div", { className: "card", children: [_jsxs("div", { className: "card-header", children: [_jsx("h3", { className: "card-title", children: "Client's List" }), _jsx("div", { className: "card-toolbar", children: _jsx(Link, { to: `add`, className: "btn tw-bg-btnPrimary hover:tw-bg-btnPrimaryHover btn-sm", children: _jsx("span", { className: "mx-2 tw-text-white", children: "Add Client" }) }) })] }), _jsx("div", { className: "card-body", children: _jsx(SearchPaginationList, { searchParamsArray: searchFilter, baseUrl: API_ROUTE.CM_CLIENTS, columns: tableColumns }) })] }) })] }));
};
export default ClientList;
