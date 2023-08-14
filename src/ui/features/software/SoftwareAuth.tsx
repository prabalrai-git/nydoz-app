import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuthContext from "../../../context/auth/useAuthContext";
import {
    IProductResponse,
    IMyCompanyPayload,
} from "../../../types/payload.type";

interface IProps {
    children: React.ReactNode;
    permissionRequired?: string;
    softwareSlug: string;
}

const SoftwareAuthRoute = (props: IProps) => {
    const { children, softwareSlug } = props;
    const { companyInfo, userCompanyAndItsProducts } = useAuthContext();
    const [hasSoftwareAccess, setSoftwareAccess] = useState<boolean>(false);

    // check company Access to software

    useEffect(() => {
        if (companyInfo?.id && userCompanyAndItsProducts) {
            const companyHasAccess = userCompanyAndItsProducts.companies.find(
                (company: IMyCompanyPayload) => company.id === companyInfo.id
            );
            if (companyHasAccess) {
                const softwareHasAccess = companyHasAccess.products.find(
                    (product: IProductResponse) => product.slug === softwareSlug
                );
                if (softwareHasAccess) {
                    setSoftwareAccess(true);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [companyInfo?.id, softwareSlug]);

    useEffect(() => {
        console.log("hasSoftwareAccess", hasSoftwareAccess);
    }, [hasSoftwareAccess]);

    return <>{hasSoftwareAccess ? children : <Navigate to='/' />}</>;
};

export default SoftwareAuthRoute;
