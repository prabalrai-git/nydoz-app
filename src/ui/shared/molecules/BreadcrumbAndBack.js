import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate, useLocation } from "react-router-dom";
import { capitalizeText } from "../../../functions/TextMuatations";
import { NavLink } from "react-router-dom";
const BreadcrumbAndBack = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((path) => path !== "");
    return (_jsxs("div", { className: "app-toolbar-wrapper d-flex flex-stack flex-wrap gap-4 w-100 mb-3 pr-2 ", children: [_jsx("div", { className: "page-title d-flex flex-column justify-content-center gap-1 me-3", children: _jsx("ul", { className: "breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-2", children: pathnames.map((path, index) => {
                        return (_jsxs("li", { className: "breadcrumb-item text-muted", children: [_jsx(NavLink, { to: `../${path}`, className: "text-muted text-hover-primary", children: capitalizeText(path) }), pathnames.length - 1 !== index && (_jsx("span", { className: "bullet bg-gray-400 w-5px h-2px mx-3" }))] }, index));
                    }) }) }), _jsx("div", { className: "d-flex align-items-center gap-2 gap-lg-3", children: _jsx("button", { onClick: () => navigate(-1), className: "btn btn-flex btn-secondary   fs-7 fw-bold btn-sm", children: "Back" }) })] }));
};
export default BreadcrumbAndBack;
