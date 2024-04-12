import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo, useCallback } from "react";
import API_ROUTE from "../../../../service/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AirplaneFill } from "react-bootstrap-icons";
import CompanyBreadcrumb from "../../../shared/molecules/CompanyBreadcrumb";
import SearchPaginationList from "../../../shared/components/SearchPaginationList";
import { RiDeleteBin5Line, RiFlagFill } from "react-icons/ri";
import { GoPersonFill } from "react-icons/go";
import { FaPhoneAlt, FaRegEdit } from "react-icons/fa";
import { BsPersonFillCheck } from "react-icons/bs";
import { Tag } from "antd";
import { DropdownButton, Dropdown } from "react-bootstrap";
const VisitorList = () => {
    const navigate = useNavigate();
    const searchFilter = ["first_name", "last_name", "email", "mobile"];
    const handleEditData = useCallback((item) => {
        navigate("edit", {
            state: { data: item },
        });
    }, [navigate]);
    // useEffect(() => {
    //   fetch(
    //     "http://newcompany.localhost/api/v1/client-management/visitors?page=1&page_size=10&last_name=2",
    //     {
    //       headers: {
    //         Authorization: "Bearer 44|IBXyCrnvhbMhk3gMH9vxsoMGtmXj8Tk9YZXFS3aF",
    //       },
    //     }
    //   )
    //     .then((res) => res.json())
    //     .then((data) => console.log(data, "this is the data form the response"));
    // }, []);
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
                return (_jsx("div", { className: "d-flex align-items-center ", children: _jsxs("div", { className: "d-flex justify-content-start flex-column ", children: [_jsxs("a", { href: "#", className: "text-dark fw-bold text-hover-primary mb-1 fs-6", children: [info?.row?.original?.first_name, info?.row?.original?.last_name] }), _jsx("span", { className: "text-muted fw-semibold d-block fs-7", children: info?.row?.original?.email })] }) }));
            },
        },
        {
            accessorKey: "going_to_foreign",
            header: () => (_jsxs("div", { className: "tw-flex tw-gap-2", children: [_jsx(AirplaneFill, { size: 14 }), _jsx("p", { children: "Going Aboard" })] })),
            cell: (info) => {
                return (_jsx("div", { className: "text-center tw-flex tw-justify-start", children: info.getValue() ? (_jsx(_Fragment, { children: _jsx(Tag, { color: "green", children: "YES" }) })) : (_jsx(Tag, { color: "red", children: "NO" })
                    // <span className="badge badge-danger px-3">NO</span>
                    ) }));
            },
        },
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
                return (_jsx("div", { className: "text-center tw-flex tw-flex-start", children: info.getValue() ? (info.getValue()) : (_jsx(Tag, { children: "NA" })
                    // <span className="badge badge-warning px-3">NA</span>
                    ) }));
            },
        },
        {
            accessorKey: "agent",
            header: () => (_jsxs("div", { className: "tw-flex tw-gap-2", children: [_jsx(BsPersonFillCheck, { size: 18 }), _jsx("span", { children: "Agent" })] })),
            cell: (info) => {
                return (_jsx("div", { children: info.getValue() ? (_jsxs("div", { children: [_jsxs("span", { children: [" ", info.getValue()?.first_name] }), _jsxs("span", { children: [" ", info.getValue()?.last_name] })] })) : (_jsx(Tag, { children: "NA" })) }));
            },
        },
        {
            accessorKey: "action",
            header: () => (_jsx("div", { className: "text-center", children: _jsx("span", { children: "Actions" }) })),
            cell: (info) => (_jsx("div", { className: "tw-flex tw-justify-center", children: _jsxs(DropdownButton, { variant: "secondary", size: "sm", id: "dropdown-basic-button", title: "Action", children: [_jsx(Dropdown.Item, { onClick: () => handleEditData(info?.row?.original), children: _jsxs("button", { title: "Edit", className: "tw-flex tw-justify-between tw-gap-2 tw-font-bold ", children: [_jsx(FaRegEdit, { color: "blue", size: 15 }), _jsx("p", { children: "Edit" })] }) }), _jsx(Dropdown.Item, { onClick: () => window.alert("will delete later"), children: _jsxs("button", { className: "tw-flex tw-justify-between tw-gap-2 tw-font-bold ", children: [_jsx(RiDeleteBin5Line, { color: "red", size: 15 }), _jsx("p", { children: "Delete" })] }) })] }) })),
            footer: (info) => info.column.id,
        },
    ], [handleEditData]);
    return (_jsxs("div", { className: " px-3", children: [_jsx(CompanyBreadcrumb, { title: "Visitor List", btnText: "Back", showBreadcrumb: true }), _jsx("section", { children: _jsxs("div", { className: "card", children: [_jsxs("div", { className: "card-header", children: [_jsx("h3", { className: "card-title", children: "Visitor's List" }), _jsx("div", { className: "card-toolbar", children: _jsx(Link, { to: `add`, className: "btn tw-bg-btnPrimary hover:tw-bg-btnPrimaryHover tw-text-white hover:tw-text-white tw-font-bold btn-sm", children: _jsx("span", { className: "mx-2", children: "Add Visitor" }) }) })] }), _jsx("div", { className: "card-body", children: _jsx(SearchPaginationList, { searchParamsArray: searchFilter, baseUrl: API_ROUTE.CM_VISITORS, columns: tableColumns }) })] }) })] }));
};
export default VisitorList;
