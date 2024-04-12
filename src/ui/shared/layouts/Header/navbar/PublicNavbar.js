import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import MyProducts from "./MyProducts";
import { useOnClickOutside } from "usehooks-ts";
import Images from "../../../../../constants/Images";
const PublicNavbar = () => {
    const productRef = useRef(null);
    useOnClickOutside(productRef, () => setShowProducts(false));
    const [showProducts, setShowProducts] = useState(false);
    const productList = [
        {
            name: "Client Management",
            link: "client-management",
            imageLink: Images.ClientHubLogo,
        },
        {
            name: "Investment Management",
            link: "investment-management",
            imageLink: Images.InvestmentManagementLogo,
        },
    ];
    return (_jsx("nav", { className: ' navbar navbar-expand-lg bg-body-tertiary navbar-wrapper bg-white fixed-top', children: _jsx("div", { className: 'container-lg', children: _jsxs("div", { className: 'inner-container', children: [_jsxs("div", { className: 'left-container', children: [_jsx(NavLink, { className: 'navbar-brand', to: '/', children: _jsx("img", { className: 'navbar-brand-img ', src: Images.CompanyLogo, alt: 'Company Logo' }) }), _jsxs("div", { ref: productRef, className: 'p-relative', children: [_jsx("div", { className: 'nav-item ', children: _jsxs("div", { className: 'd-flex align-items-center  btn btn-light-primary btn-sm ', onClick: () => setShowProducts(() => !showProducts), children: [_jsx("i", { className: 'ki-outline ki-abstract-26 fs-1 me-3 ' }), _jsxs("span", { className: 'fw-bold fs-7', children: ["Products & Services", " ", _jsx("i", { className: 'fas fa-chevron-down ms-2' })] })] }) }), _jsx("div", { children: _jsx(MyProducts, { showProduct: showProducts, children: productList.map((product, index) => (_jsx("div", { children: _jsx(NavLink, { to: product.link, children: _jsxs("div", { className: 'd-flex align-items-center  btn btn-bg-light btn-color-primary btn-sm mb-3', children: [_jsx("img", { className: 'dropdown-img', src: product.imageLink, alt: 'product' }), _jsx("span", { className: 'fw-bold fs-7', children: product.name })] }) }) }, index))) }) })] })] }), _jsx("div", { className: 'right-container', children: _jsx("div", { children: _jsx(NavLink, { className: 'nav-link fw-bold ', to: 'auth/login', children: "Login" }) }) })] }) }) }));
};
export default PublicNavbar;
