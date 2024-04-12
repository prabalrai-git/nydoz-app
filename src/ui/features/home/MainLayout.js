import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import WorkSpaceNavbar from "../../shared/layouts/Header/navbar/WorkSpaceNavbar";
import { useEffect } from "react";
const MainLayout = () => {
    useEffect(() => {
        // Redirect to '/login' without any transition using the browser API
        window.location.href = "/";
    }, []);
    return (_jsxs("div", { children: [_jsx(WorkSpaceNavbar, {}), _jsx(Outlet, {})] }));
};
export default MainLayout;
