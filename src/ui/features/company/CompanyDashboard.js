import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import MyProductList from "../../shared/components/products/MyProducts";
import useAuthContext from "../../../context/auth/useAuthContext";
import CompanyBreadcrumb from "../../shared/molecules/CompanyBreadcrumb";
import { Link } from "react-router-dom";
import { HiShoppingBag } from "react-icons/hi";
const CompanyDashboard = () => {
    const { companyInfo, isCompanyOwner } = useAuthContext();
    // const sudomainArrays = ["http://localhost:5174/"];
    return (_jsxs("div", { children: [_jsx(CompanyBreadcrumb, { btnText: "Back", title: "Dashboard", showBreadcrumb: true }), _jsxs("section", { className: "card ", children: [_jsxs("div", { className: "card-header", children: [_jsx("h3", { className: "card-title", children: _jsxs("span", { className: "text-capitalize", children: [companyInfo?.subdomain ?? "company", "'s Products"] }) }), _jsx("div", { className: "card-toolbar", children: isCompanyOwner && (_jsxs(Link, { type: "button", to: `/company/product-settings/buy`, className: "btn btn-sm btn-primary tw-flex tw-gap-2 tw-items-center", children: [_jsx(HiShoppingBag, { size: 16 }), _jsx("p", { className: "tw-mt-1", children: "PURCHASE PRODUCTS" })] })) })] }), _jsx("div", { className: "card-body", children: _jsx(MyProductList, { partialPath: "../products/" }) })] })] }));
};
export default CompanyDashboard;
