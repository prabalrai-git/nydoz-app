import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import API_ROUTE from "../../../../service/api";
import BASE_URL from "../../../../constants/AppSetting";
import CompanyBreadcrumb from "../../../shared/molecules/CompanyBreadcrumb";
import SearchPaginationList from "../../../shared/components/SearchPaginationList";
import { RiFlagFill } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { GoEye } from "react-icons/go";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Image, Space } from "antd";
import { GrView } from "react-icons/gr";
import { DownloadOutlined, RotateLeftOutlined, RotateRightOutlined, SwapOutlined, ZoomInOutlined, ZoomOutOutlined, } from "@ant-design/icons";
import { MdOutlineAddToPhotos } from "react-icons/md";
const List = () => {
    const navigate = useNavigate();
    const searchFilter = ["first_name", "email", "mobile"];
    const handleEditData = useCallback((item) => {
        navigate("../edit", {
            state: { data: item },
        });
    }, [navigate]);
    const handleView = useCallback((id) => {
        navigate(`../view/${id}/details`);
    }, [navigate]);
    const handleOpening = useCallback((id) => {
        navigate(`../view/${id}/add-enrollments-openings`);
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
            header: () => (_jsxs("div", { className: "tw-flex", children: [_jsx("i", { className: "bi bi-building-fill-add fs-7 me-2 tw-self-center" }), _jsx("span", { children: "Institute's Name" })] })),
            cell: (info) => {
                const url = `${BASE_URL}${info?.row?.original?.logo}`;
                return (_jsxs("div", { className: "d-flex align-items-center", children: [_jsx("div", { className: "symbol symbol-40px me-3", children: _jsx(Image, { className: "tw-object-cover tw-rounded-lg", width: 40, height: 40, preview: {
                                    mask: _jsx(GrView, {}),
                                    toolbarRender: (_, { transform: { scale }, actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn, }, }) => (_jsxs(Space, { size: 12, className: "toolbar-wrapper", children: [_jsx(DownloadOutlined, { onClick: () => onDownload(url) }), _jsx(SwapOutlined, { rotate: 90, onClick: onFlipY }), _jsx(SwapOutlined, { onClick: onFlipX }), _jsx(RotateLeftOutlined, { onClick: onRotateLeft }), _jsx(RotateRightOutlined, { onClick: onRotateRight }), _jsx(ZoomOutOutlined, { disabled: scale === 1, onClick: onZoomOut }), _jsx(ZoomInOutlined, { disabled: scale === 50, onClick: onZoomIn })] })),
                                }, src: url }) }), _jsxs("div", { className: "d-flex justify-content-start flex-column", children: [_jsx("div", { className: "text-dark fw-bold text-hover-primary mb-1 fs-7", children: info?.row?.original?.name }), _jsx("a", { href: info?.row?.original?.website, className: "text-muted fw-semibold d-block fs-7", children: info?.row?.original?.website })] })] }));
            },
        },
        {
            accessorKey: "website",
            header: () => (_jsxs("div", { className: "tw-flex", children: [_jsx("i", { className: "bi bi-globe me-2 fs-7 tw-self-center" }), _jsx("span", { children: "Website" })] })),
            cell: (info) => {
                return _jsx("div", { children: info.getValue() });
            },
        },
        {
            accessorKey: "state",
            header: () => (_jsxs("div", { className: "tw-flex", children: [_jsx("i", { className: "bi bi-geo-alt me-2 fs-7 tw-self-center" }), _jsx("span", { children: "State" })] })),
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
            cell: (info) => (_jsx("div", { className: "d-flex justify-content-center tw-flex tw-gap-2", children: _jsxs(DropdownButton, { variant: "secondary", size: "sm", id: "dropdown-basic-button", title: "Action", children: [_jsx(Dropdown.Item, { onClick: () => handleView(info?.row?.original?.id), children: _jsxs("button", { title: "view", className: "tw-flex tw-justify-between tw-gap-2 tw-font-bold ", children: [_jsx(GoEye, { color: "green", size: 15 }), _jsx("p", { children: "View" })] }) }), _jsx(Dropdown.Item, { onClick: () => handleEditData(info?.row?.original), children: _jsxs("button", { title: "Edit", className: "tw-flex tw-justify-between tw-gap-2 tw-font-bold", children: [_jsx(FaRegEdit, { color: "blue", size: 15 }), _jsx("p", { children: "Edit" })] }) }), _jsx(Dropdown.Item, { onClick: () => handleOpening(info?.row?.original?.id), children: _jsxs("button", { title: "view", className: "tw-flex tw-justify-between tw-gap-2 tw-font-bold tw-items-center ", children: [_jsx(MdOutlineAddToPhotos, { color: "#3da7eb", size: 15 }), _jsx("p", { children: " Add Openings" })] }) })] }) })),
            footer: (info) => info.column.id,
        },
    ], [handleEditData, handleOpening, handleView]);
    return (_jsxs("div", { className: " px-3", children: [_jsx(CompanyBreadcrumb, { title: "Institute List", btnText: "Back", showBreadcrumb: true }), _jsx("section", { children: _jsxs("div", { className: "card", children: [_jsxs("div", { className: "card-header", children: [_jsx("h3", { className: "card-title", children: "Institute's List" }), _jsx("div", { className: "card-toolbar", children: _jsx(Link, { to: "../add", className: "btn tw-bg-btnPrimary hover:tw-bg-btnPrimaryHover btn-sm", children: _jsx("span", { className: "mx-2 tw-text-white", children: "Add Institute" }) }) })] }), _jsx("div", { className: "card-body ", children: _jsx(SearchPaginationList, { searchParamsArray: searchFilter, baseUrl: API_ROUTE.CM_ENROLLMENT, columns: tableColumns }) })] }) })] }));
};
export default List;
