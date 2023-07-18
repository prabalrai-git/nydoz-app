import React, { FC } from "react";
import useAuthContext from "../../../context/auth/useAuthContext";
import { Navigate } from "react-router-dom";

const OnlyCompanyOwnerRoute: FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { isCompanyOwner } = useAuthContext();

    return (
        <div>
            {isCompanyOwner ? <div>{children}</div> : <Navigate to='/home' />}
        </div>
    );
};

export default OnlyCompanyOwnerRoute;
