import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthContext from "../../../context/auth/useAuthContext";

type Props = {
  children: JSX.Element;
};

const Protected: React.FC<Props> = ({ children }) => {
  const { isLoggedIn, token } = useAuthContext();
  console.log(isLoggedIn, token, "hi yo guys");
  const location = useLocation().pathname;
  return isLoggedIn && token ? (
    children
  ) : (
    <Navigate to={"/auth/login"} state={{ from: location }} replace />
  );
};

export default Protected;
