import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
import Images from "../../../../../../constants/Images";
const AllPublicProductsDropdown = () => {
    const productList = [
        {
            name: "Client Management",
            path: "client-management",
            imageLink: Images.ClientHubLogo,
        },
        {
            name: "Investment Management",
            path: "investment-mangement",
            imageLink: Images.InvestmentManagementLogo,
        },
    ];
    return (_jsx(_Fragment, { children: productList.map((product, index) => (_jsx("div", { children: _jsx(NavLink, { to: product.imageLink, children: _jsxs("div", { className: 'd-flex align-items-center  btn btn-bg-light btn-color-primary btn-sm mb-3', children: [_jsx("img", { className: 'dropdown-img', src: product.imageLink, alt: 'product' }), _jsx("span", { className: 'fw-bold fs-7', children: product.name })] }) }) }, index))) }));
};
export default AllPublicProductsDropdown;
