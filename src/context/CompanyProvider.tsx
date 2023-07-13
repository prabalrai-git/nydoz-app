import React, { FC, useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import API_ROUTE from "../service/api";
import { ICompanyResponse } from "../types/payload.type";
import {
    CompanyContext,
    ICompanyContextProps,
    ICompanyInfo,
} from "../context/CompanyContext";
import { AuthContext } from "./AuthContext";
import CompanyLoader from "../ui/shared/components/company/CompanyLoader";

const CompanyProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const { userInfo } = useContext(AuthContext);
    const subdomainFromUrl = window.location.hostname.split(".")[0];
    const [subdomain, setSubdomain] = useState<string | undefined>(undefined);
    const [showSplashScreen, setShowSplashScreen] = useState<boolean>(true);
    const [isCompanyAdmin, setIsCompanyAdmin] = useState(false);

    useEffect(() => {
        setSubdomain(subdomainFromUrl);
    }, [subdomainFromUrl]);

    const [companyInfoState, setCompanyInfoState] = useState<ICompanyInfo>({
        id: undefined,
        subdomain: "",
        name: "",
        company_owner_id: "",
        status_id: "",
    });

    const { fetchDataById, error } = useFetch<ICompanyResponse>(
        API_ROUTE.GET_COMPANY_BY_SUBDOMAIN,
        true
    );

    useEffect(() => {
        console.log("company provider");
        const fetchCompanyInfo = async () => {
            try {
                setShowSplashScreen(true);

                // const url = `${API_ROUTE.GET_COMPANY_BY_SUBDOMAIN}/${subdomain}`;
                const testUrl = API_ROUTE.GET_COMPANY_BY_SUBDOMAIN_TEST;

                const response = await fetchDataById(testUrl);
                if (response?.data?.payload) {
                    const { payload } = response.data;
                    console.log(payload, "payload");
                    setCompanyInfoState({
                        id: payload.id,
                        name: payload.name,
                        subdomain: payload.subdomain,
                        company_owner_id: payload.company_owner_id,
                        status_id: payload.status_id,
                    });
                    if (userInfo?.id === payload.company_owner_id) {
                        setIsCompanyAdmin(true);
                    }
                }
            } catch (error) {
                console.log(error);
            } finally {
                setShowSplashScreen(false);
            }
        };
        fetchCompanyInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const companyContextValue: ICompanyContextProps = {
        companyInfo: companyInfoState,
        isCompanyAdmin: isCompanyAdmin,
    };
    return (
        <CompanyContext.Provider value={companyContextValue}>
            {showSplashScreen ? <CompanyLoader /> : children}
        </CompanyContext.Provider>
    );
};

export default CompanyProvider;
