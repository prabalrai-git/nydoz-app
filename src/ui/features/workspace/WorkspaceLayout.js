import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import API_ROUTE from "../../../service/api";
import useAuthContext from "../../../context/auth/useAuthContext";
import useFetch from "../../../hooks/useFetch";
const ProtectedUserLayout = () => {
    const { isLoggedIn, token } = useAuthContext();
    const location = useLocation().pathname;
    const { fetchDataById } = useFetch(API_ROUTE.GET_USER_COMPANY_AND_PRODUCTS, true);
    useEffect(() => {
        fetchDataById(API_ROUTE.GET_USER_COMPANY_AND_PRODUCTS);
    }, [fetchDataById]);
    // console.log(
    //   document.getElementById("storageIframe")?.contentDocument?.getStorage(),
    //   "new log"
    // );
    return (_jsx("div", { children: _jsx("div", { children: isLoggedIn && token ? (_jsx(_Fragment, { children: _jsx(Outlet, {}) })) : (
            // <Outlet />
            _jsx(Navigate, { to: "/auth/login", state: { from: location }, replace: true })) }) }));
};
export default ProtectedUserLayout;
