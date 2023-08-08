import React from "react";
import { useEffect } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import API_ROUTE from "../../../service/api";
import useAuthContext from "../../../context/auth/useAuthContext";
import useFetch from "../../../hooks/useFetch";

import WorkSpaceNavbar from "../../shared/layouts/Header/navbar/WorkSpaceNavbar";
import { IUserCompanyProductsResponse } from "../../../types/payload.type";

const ProtectedUserLayout: React.FC = () => {
    const { isLoggedIn, token } = useAuthContext();
    const location = useLocation().pathname;

    const { data, fetchDataById, isloading } =
        useFetch<IUserCompanyProductsResponse>(
            API_ROUTE.GET_USER_COMPANY_AND_PRODUCTS,
            true
        );

    useEffect(() => {
        console.log(data, "data");
    }, [data]);

    useEffect(() => {
        fetchDataById(API_ROUTE.GET_USER_COMPANY_AND_PRODUCTS);
    }, [fetchDataById]);

    return (
        <div>
            <WorkSpaceNavbar />
            <div className='main-container'>
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
    );
};

export default ProtectedUserLayout;
