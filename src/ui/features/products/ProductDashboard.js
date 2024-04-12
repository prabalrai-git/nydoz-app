import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import CompanyBreadcrumb from "../../shared/molecules/CompanyBreadcrumb";
import MyProductList from "../../shared/components/products/MyProducts";
const ProductDashboard = () => {
    return (_jsxs("div", { children: [_jsx(CompanyBreadcrumb, { title: "My Products Dashboard", showBreadcrumb: true, btnText: "Back" }), _jsx("section", { children: _jsxs("div", { className: "card ", children: [_jsxs("div", { className: "card-header", children: [_jsx("h3", { className: "card-title", children: "My Product's List" }), _jsx("div", { className: "card-toolbar", children: _jsx(Link, { type: "button", to: `../../product-settings/view`, className: "btn btn-sm btn-light", children: "View All" }) })] }), _jsx("div", { className: "card-body", children: _jsx(MyProductList, { partialPath: "../" }) })] }) })] }));
};
export default ProductDashboard;
