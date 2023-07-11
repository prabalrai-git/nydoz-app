import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

type Props = {
    children: JSX.Element;
};

const ProtectAuth: React.FC<Props> = ({ children }) => {
    const { userInfo, token } = useContext(AuthContext);
    const location = useLocation().pathname;

    return userInfo?.id && token ? (
        <Navigate to={"/page-not-found"} state={{ from: location }} replace />
    ) : (
        children
    );
};

export default ProtectAuth;