import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuthContext from "../../../context/auth/useAuthContext";
const ProductAuthRoute = (props) => {
    const { children, softwareSlug } = props;
    const { companyInfo, userCompanyAndItsProducts } = useAuthContext();
    const [hasSoftwareAccess, setSoftwareAccess] = useState(false);
    // check company Access to software
    useEffect(() => {
        if (companyInfo?.id && userCompanyAndItsProducts) {
            const companyHasAccess = userCompanyAndItsProducts.companies.find((company) => company.id === companyInfo.id);
            if (companyHasAccess) {
                const softwareHasAccess = companyHasAccess.products.find((product) => product.slug === softwareSlug);
                if (softwareHasAccess) {
                    setSoftwareAccess(true);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [companyInfo?.id, softwareSlug]);
    useEffect(() => { }, [hasSoftwareAccess]);
    return _jsx(_Fragment, { children: hasSoftwareAccess ? children : _jsx(Navigate, { to: "/" }) });
};
export default ProductAuthRoute;
