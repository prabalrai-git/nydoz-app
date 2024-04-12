import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
const Breadcrumb = () => {
    return (_jsxs("div", { className: 'app-container bg-white py-3 shadow shadow-sm  container-xxl d-flex flex-stack', children: [_jsxs("div", { className: 'page-title d-flex flex-column justify-content-center flex-wrap me-3 ', children: [_jsx("h1", { className: 'page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0', children: "Home" }), _jsxs("ul", { className: 'breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1', children: [_jsx("li", { className: 'breadcrumb-item text-muted', children: _jsxs("a", { href: '/metronic8/demo1/../demo1/index.html', className: 'text-muted text-hover-primary', children: ["Home", " "] }) }), _jsx("li", { className: 'breadcrumb-item', children: _jsx("span", { className: 'bullet bg-gray-400 w-5px h-2px' }) }), _jsx("li", { className: 'breadcrumb-item text-muted', children: "Projects " })] })] }), _jsx(Link, { to: '/home/company/add', className: 'btn btn-primary btn-sm ms-3', children: "Create Company" })] }));
};
export default Breadcrumb;
