import React, { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { CompanyContext } from "../../../context/CompanyContext";

type Props = {
    children: JSX.Element;
};

const ProtectCompany: React.FC<Props> = ({ children }) => {
    const { companyInfo } = useContext(CompanyContext);
    const location = useLocation().pathname;

    useEffect(() => {
        console.log("protect company", companyInfo);
    }, [companyInfo]);

    return companyInfo?.id ? (
        children
    ) : (
        <Navigate to={"/home"} state={{ from: location }} replace />
    );
};

export default ProtectCompany;
