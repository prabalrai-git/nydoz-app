import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthContext from "../../../context/auth/useAuthContext";

type Props = {
    children: JSX.Element;
};

const ProtectAuth: React.FC<Props> = ({ children }) => {
    // const { userInfo, token } = useContext(AuthContext);
    const { isLoggedIn, token } = useAuthContext();
    const location = useLocation().pathname;

    return isLoggedIn && token ? (
        <Navigate to={"/"} state={{ from: location }} replace />
    ) : (
        children
    );
};

export default ProtectAuth;
