import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useCallback } from "react";
import API_ROUTE from "../../../../service/api";
import BASE_URL from "../../../../constants/AppSetting";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CompanyBreadcrumb from "../../../shared/molecules/CompanyBreadcrumb";
import SearchPaginationList from "../../../shared/components/SearchPaginationList";
import { GoEye, GoPersonFill } from "react-icons/go";
import { FaPhoneAlt, FaRegEdit } from "react-icons/fa";
import { RiFlagFill } from "react-icons/ri";
import { Image, Space } from "antd";
import { GrView } from "react-icons/gr";
import { DownloadOutlined, RotateLeftOutlined, RotateRightOutlined, SwapOutlined, ZoomInOutlined, ZoomOutOutlined, } from "@ant-design/icons";
const AgentList2 = () => {
    const navigate = useNavigate();
    const searchFilter = ["first_name", "email", "mobile"];
    const handleEditData = useCallback((item) => {
        navigate("edit", {
            state: { data: item },
        });
    }, [navigate]);
    const onDownload = (src) => {
        fetch(src)
            .then((response) => response.blob())
            .then((blob) => {
            const url = URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url;
            link.download = "image.png";
            document.body.appendChild(link);
            link.click();
            URL.revokeObjectURL(url);
            link.remove();
        });
    };
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
                const url = `${BASE_URL}${info?.row?.original?.profile_picture}`;
                return (_jsxs("div", { className: "d-flex align-items-center", children: [_jsx("div", { className: "symbol symbol-40px me-3", children: _jsx(Image, { className: "tw-object-cover tw-rounded-lg", width: 40, height: 40, preview: {
                                    mask: _jsx(GrView, {}),
                                    toolbarRender: (_, { transform: { scale }, actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn, }, }) => (_jsxs(Space, { size: 12, className: "toolbar-wrapper", children: [_jsx(DownloadOutlined, { onClick: () => onDownload(url) }), _jsx(SwapOutlined, { rotate: 90, onClick: onFlipY }), _jsx(SwapOutlined, { onClick: onFlipX }), _jsx(RotateLeftOutlined, { onClick: onRotateLeft }), _jsx(RotateRightOutlined, { onClick: onRotateRight }), _jsx(ZoomOutOutlined, { disabled: scale === 1, onClick: onZoomOut }), _jsx(ZoomInOutlined, { disabled: scale === 50, onClick: onZoomIn })] })),
                                }, src: url }) }), _jsxs("div", { className: "d-flex justify-content-start flex-column", children: [_jsxs("a", { href: "#", className: "text-dark fw-bold text-hover-primary mb-1 fs-6", children: [info?.row?.original?.first_name, " ", info?.row?.original?.last_name] }), _jsx("span", { className: "text-muted fw-semibold d-block fs-7", children: info?.row?.original?.email })] })] }));
            },
        },
        {
            accessorKey: "mobile",
            header: () => (_jsxs("div", { className: "tw-flex tw-gap-2", children: [_jsx(FaPhoneAlt, { size: 14 }), _jsx("span", { children: "Mobile Number" })] })),
            cell: (info) => {
                return _jsx("div", { children: info.getValue() });
            },
        },
        {
            accessorKey: "country",
            header: () => (_jsxs("div", { className: "tw-flex tw-gap-2", children: [_jsx(RiFlagFill, { size: 16 }), _jsx("span", { children: "Country" })] })),
            cell: (info) => {
                return _jsx("div", { children: info.getValue() });
            },
        },
        {
            accessorKey: "action",
            header: () => (_jsx("div", { className: "text-center", children: _jsx("span", { children: "Actions" }) })),
            cell: (info) => (_jsx("div", { className: "text-center", children: _jsxs(DropdownButton, { variant: "secondary", size: "sm", id: "dropdown-basic-button", title: "Action", children: [_jsx(Dropdown.Item, { children: _jsxs("div", { className: "tw-flex tw-gap-2 tw-font-bold tw-items-center ", children: [_jsx(GoEye, { color: "green", size: 15 }), _jsx("p", { children: "View" })] }) }), _jsx(Dropdown.Item, { children: _jsxs("div", { onClick: () => handleEditData(info?.row?.original), className: "tw-flex tw-gap-2 tw-items-center tw-font-bold", children: [_jsx(FaRegEdit, { color: "blue", size: 15 }), _jsx("p", { children: "Edit" })] }) })] }) })),
            footer: (info) => info.column.id,
        },
    ], [handleEditData]);
    return (_jsxs("div", { className: " px-3", children: [_jsx(CompanyBreadcrumb, { title: "Agents", btnText: "Back", showBreadcrumb: true }), _jsx("section", { children: _jsxs("div", { className: "card", children: [_jsxs("div", { className: "card-header", children: [_jsx("h3", { className: "card-title", children: "Agent's List" }), _jsx("div", { className: "card-toolbar", children: _jsx(Link, { to: `add`, className: "btn tw-bg-btnPrimary hover:tw-bg-btnPrimaryHover btn-sm", children: _jsx("span", { className: "mx-2 tw-text-white", children: "Add Agent" }) }) })] }), _jsx("div", { className: "tw-p-6 tw-px-8", children: _jsx(SearchPaginationList, { searchParamsArray: searchFilter, baseUrl: API_ROUTE.CM_AGENTS, columns: tableColumns }) })] }) })] }));
};
export default AgentList2;