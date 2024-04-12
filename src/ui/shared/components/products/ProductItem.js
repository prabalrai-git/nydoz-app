import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Image } from "react-bootstrap";
const ProductItem = (props) => {
    const { product } = props;
    const { id, name, logo, description } = product;
    return (_jsxs("div", { className: 'card border-hover-primary m-6', children: [_jsxs("div", { className: 'card-header border-0 pt-9', children: [_jsx("div", { className: 'card-title m-0', children: _jsx("div", { className: 'symbol symbol-100px w-100px bg-light', children: _jsx(Image, { src: logo, alt: "logo" }) }) }), _jsx("div", { className: 'card-toolbar', children: _jsx("span", { className: 'badge badge-light-primary fw-bold me-auto px-4 py-3', children: "View More" }) })] }), _jsxs("div", { className: 'card-body p-9', children: [_jsx("div", { className: 'fs-3 fw-bold text-dark', children: name }), _jsx("p", { className: 'text-gray-400 fw-semibold fs-5 mt-1 mb-7', children: description })] })] }, id));
};
export default ProductItem;
