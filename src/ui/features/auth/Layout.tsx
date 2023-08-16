import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import useAuthContext from "../../../context/auth/useAuthContext";
import WorkSpaceNavbar from "../../shared/layouts/Header/navbar/WorkSpaceNavbar";

const ProtectAuthLayout: React.FC = () => {
    const { isLoggedIn, token } = useAuthContext();
    const location = useLocation().pathname;

    return isLoggedIn && token ? (
        <Navigate to={"/"} state={{ from: location }} replace />
    ) : (
        <>
            <WorkSpaceNavbar />
            <div className='main-container '>
                <Outlet />
            </div>
        </>
    );
};

export default ProtectAuthLayout;
