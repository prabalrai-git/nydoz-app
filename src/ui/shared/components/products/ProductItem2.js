import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
const ProductItem2 = (props) => {
    const { product, link } = props;
    const { id, name, logo, description } = product;
    return (_jsx(Link, { to: link ? `${link}/${id}` : `product/${id}`, title: "Click to view product's details", className: 'nav-link nav-link-border-solid  border ', children: _jsx("div", { className: 'card card-flush flex-row-fluid p-41 mw-100', children: _jsxs("div", { className: 'card-body text-center', children: [_jsx("div", { className: 'symbol symbol-100px w-100px bg-light', children: _jsx(Image, { src: logo, alt: "logo" }) }), _jsx("div", { className: 'mt-6 mb-2', children: _jsxs("div", { className: 'text-center', children: [_jsx("span", { className: 'fw-bold text-gray-800 cursor-pointer text-hover-primary fs-3 fs-xl-1 ', children: name }), _jsx("span", { className: 'text-gray-400 fw-semibold d-block fs-6 mt-n1', children: description })] }) })] }) }) }, id));
};
export default ProductItem2;
