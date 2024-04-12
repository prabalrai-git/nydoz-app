import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
const Breadcrumb = (props) => {
    const { parent, child, parentLink } = props;
    return (_jsxs("ul", { className: 'breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0', children: [_jsx("li", { className: 'breadcrumb-item text-muted', children: _jsx(Link, { to: "/account/dashboard", className: 'text-muted text-hover-primary', children: "Dashboard" }) }), _jsx("li", { className: 'breadcrumb-item', children: _jsx("span", { className: 'bullet bg-gray-400 w-5px h-2px' }) }), _jsx("li", { className: 'breadcrumb-item text-muted', children: _jsx(Link, { to: parentLink, className: 'text-muted text-hover-primary', children: parent }) }), _jsx("li", { className: 'breadcrumb-item', children: _jsx("span", { className: 'bullet bg-gray-400 w-5px h-2px' }) }), _jsx("li", { className: 'breadcrumb-item text-dark', children: child })] }));
};
export default Breadcrumb;
