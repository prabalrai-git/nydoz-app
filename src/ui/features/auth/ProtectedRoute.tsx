import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

type Props = {
    children: JSX.Element;
};

const Protected: React.FC<Props> = ({ children }) => {
    const { userInfo, token } = useContext(AuthContext);
    const location = useLocation().pathname;

    return userInfo?.id && token ? (
        children
    ) : (
        <Navigate to={"/auth/login"} state={{ from: location }} replace />
    );
};

export default Protected;
