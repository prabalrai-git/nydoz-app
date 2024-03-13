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

  const { fetchDataById } = useFetch<IUserCompanyProductsResponse>(
    API_ROUTE.GET_USER_COMPANY_AND_PRODUCTS,
    true
  );

  useEffect(() => {
    fetchDataById(API_ROUTE.GET_USER_COMPANY_AND_PRODUCTS);
  }, [fetchDataById]);

  // console.log(isLoggedIn, token, "hey ohhh");

  return (
    <div>
      <div className="main-container ">
        {isLoggedIn && token ? (
          <>
            <WorkSpaceNavbar />
            <Outlet />
          </>
        ) : (
          <Navigate to={"/auth/login"} state={{ from: location }} replace />
        )}
      </div>
    </div>
  );
};

export default ProtectedUserLayout;
