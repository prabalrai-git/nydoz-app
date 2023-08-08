import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import useAuthContext from "../../../context/auth/useAuthContext";
import PublicNavbar from "../../shared/layouts/Header/navbar/PublicNavbar";

const ProtectAuthLayout: React.FC = () => {
    const { isLoggedIn, token } = useAuthContext();
    const location = useLocation().pathname;

    return isLoggedIn && token ? (
        <Navigate to={"/"} state={{ from: location }} replace />
    ) : (
        <>
            <PublicNavbar />
            <div className='main-container '>
                <Outlet />
            </div>
        </>
    );
};

export default ProtectAuthLayout;
