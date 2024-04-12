import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import useAuthContext from "../../../context/auth/useAuthContext";
import FooterLayout from "../../shared/layouts/Footer/Footer";
const ProtectAuthLayout = () => {
    const { isLoggedIn, token } = useAuthContext();
    const location = useLocation().pathname;
    return isLoggedIn && token ? (_jsx(Navigate, { to: "/", state: { from: location }, replace: true })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "main-container  ", children: _jsx(Outlet, {}) }), _jsx(FooterLayout, {})] }));
};
export default ProtectAuthLayout;
