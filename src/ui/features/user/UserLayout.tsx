import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthContext from "../../../context/auth/useAuthContext";
import { Outlet } from "react-router-dom";
import Header2 from "../../shared/layouts/Header/Header2";

const ProtectedUserLayout: React.FC = () => {
    const { isLoggedIn, token } = useAuthContext();
    const location = useLocation().pathname;
    return (
        <div>
            <Header2 />
            {isLoggedIn && token ? (
                <Outlet />
            ) : (
                <Navigate
                    to={"/auth/login"}
                    state={{ from: location }}
                    replace
                />
            )}
        </div>
    );
};

export default ProtectedUserLayout;
