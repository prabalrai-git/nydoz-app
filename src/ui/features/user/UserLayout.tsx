import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthContext from "../../../context/auth/useAuthContext";
import { Outlet } from "react-router-dom";
import Header2 from "../../shared/layouts/Header/Header2";
// import Sidebar from "../../shared/layouts/sidebar/Sidebar";
// import UserHeader from "../../shared/layouts/Header/UserHeader";

const ProtectedUserLayout: React.FC = () => {
    const { isLoggedIn, token } = useAuthContext();
    const location = useLocation().pathname;
    return (
        <div>
            <Header2 />
            {/* <UserHeader /> */}
            {/* <Sidebar /> */}
            <div className='doc-content'>
                <div>
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
            </div>
        </div>
    );
};

export default ProtectedUserLayout;
