import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import useAuthContext from "../../../context/auth/useAuthContext";
import FooterLayout from "../../shared/layouts/Footer/Footer";

const ProtectAuthLayout: React.FC = () => {
  const { isLoggedIn, token } = useAuthContext();
  const location = useLocation().pathname;

  return isLoggedIn && token ? (
    <Navigate to={"/"} state={{ from: location }} replace />
  ) : (
    <>
      <div className="main-container  ">
        <Outlet />
      </div>

      <FooterLayout />
    </>
  );
};

export default ProtectAuthLayout;
