import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
import useAuthContext from "../../../context/auth/useAuthContext";
const CompanyMenu = (props) => {
    const { NavMenu } = props;
    const { isCompanyOwner } = useAuthContext();
    return (_jsx("ul", { className: 'nav nav-pills nav-pills-custom ', children: NavMenu.map((item) => {
            if (item.isCompanyOwnerRequired) {
                if (item.isCompanyOwnerRequired && isCompanyOwner) {
                    return (_jsx("li", { className: 'nav-item my-6 me-3 me-lg-6', role: 'presentation', children: _jsxs(NavLink, { className: 'nav-link d-flex justify-content-between flex-column flex-center overflow-hidden  w-80px h-85px py-4 hover-green', "data-bs-toggle": 'pill', to: item.link, "aria-selected": 'true', role: 'tab', children: [_jsx("div", { className: 'nav-icon', children: item?.icon }), _jsx("span", { className: 'nav-text text-gray-700 fw-bold fs-6 lh-1', children: item?.title }), _jsx("span", { className: 'bullet-custom position-absolute bottom-0 w-100 h-4px bg-primary' })] }) }, item.id));
                }
                else {
                    return null;
                }
            }
            else {
                return (_jsx("li", { className: 'nav-item my-6 me-3 me-lg-6', role: 'presentation', children: _jsxs(NavLink, { className: 'nav-link d-flex justify-content-between flex-column flex-center overflow-hidden  w-80px h-85px py-4 hover-green', "data-bs-toggle": 'pill', to: item.link, "aria-selected": 'true', role: 'tab', children: [_jsx("div", { className: 'nav-icon', children: item?.icon }), _jsx("span", { className: 'nav-text text-gray-700 fw-bold fs-6 lh-1', children: item?.title }), _jsx("span", { className: 'bullet-custom position-absolute bottom-0 w-100 h-4px bg-primary' })] }) }, item.id));
            }
        }) }));
};
export default CompanyMenu;
