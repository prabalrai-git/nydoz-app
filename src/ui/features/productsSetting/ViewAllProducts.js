import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import useAuthContext from "../../../context/auth/useAuthContext";
import ProductList from "../../shared/components/products/ProductList";
import CompanyBreadcrumb from "../../shared/molecules/CompanyBreadcrumb";
const ViewAllProducts = () => {
    const { isCompanyOwner } = useAuthContext();
    return (_jsxs("div", { children: [_jsx(CompanyBreadcrumb, { title: "Product List", showBreadcrumb: true, btnText: "Back" }), _jsx("section", { children: _jsxs("div", { className: "card ", children: [_jsxs("div", { className: "card-header", children: [_jsx("h3", { className: "card-title", children: "Product's List" }), _jsx("div", { className: "card-toolbar", children: isCompanyOwner && (_jsx(Link, { type: "button", to: `../buy`, className: "btn btn-sm btn-primary", children: "PURCHASE PRODUCTS" })) })] }), _jsx("div", { className: "card-body", children: _jsx(ProductList, {}) })] }) })] }));
};
export default ViewAllProducts;
