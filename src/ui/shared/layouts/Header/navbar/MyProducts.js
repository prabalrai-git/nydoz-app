import { jsx as _jsx } from "react/jsx-runtime";
const MyProducts = (props) => {
    const { showProduct, children } = props;
    return (_jsx("div", { className: showProduct
            ? "dropdown-content d-block"
            : "dropdown-content d-none", children: _jsx("div", { className: 'dropdown-wrapper', children: children }) }));
};
export default MyProducts;
