import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import useAuthContext from "../../../context/auth/useAuthContext";
import Header from "../../shared/layouts/Header/Header";

const ProtectAuthLayout: React.FC = () => {
    const { isLoggedIn, token } = useAuthContext();
    const location = useLocation().pathname;

    return isLoggedIn && token ? (
        <Navigate to={"/"} state={{ from: location }} replace />
    ) : (
        <>
            <Header />
            <Outlet />
        </>
    );
};

export default ProtectAuthLayout;
