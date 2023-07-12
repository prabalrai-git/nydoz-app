import React, { FC, useState, useEffect, useMemo } from "react";
import useFetch from "../hooks/useFetch";
import API_ROUTE from "../service/api";
import LoadingPage from "../ui/features/utils/LoadingPage";
import { ICompanyResponse } from "../types/payload.type";
import {
    CompanyContext,
    ICompanyContextProps,
    ICompanyInfo,
} from "../context/CompanyContext";

const CompanyProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [showSplashScreen, setShowSplashScreen] = useState(true);

    const [companyInfo, setCompanyInfo] = useState<ICompanyInfo>({
        id: undefined,
        subdomain: "",
        name: "",
        owner_id: "",
        status_id: "",
    });

    const { fetchDataById, error } = useFetch<ICompanyResponse>(
        API_ROUTE.GET_COMPANY_BY_SUBDOMAIN,
        true
    );

    // useEffect(() => {
    //    if(error){
    //    toast.error()
    //    }
    // }, [error]);

    useEffect(() => {
        const fetchCompanyInfo = async () => {
            try {
                setShowSplashScreen(true);
                const subdomain = window.location.hostname.split(".")[0];
                // const url = `${API_ROUTE.GET_COMPANY_BY_SUBDOMAIN}/${subdomain}`;
                const testUrl = API_ROUTE.GET_COMPANY_BY_SUBDOMAIN_TEST;

                const response = await fetchDataById(testUrl);
                if (response?.data?.payload) {
                    const { payload } = response.data;
                    setCompanyInfo({
                        id: payload.id,
                        name: payload.name,
                        subdomain: payload.subdomain,
                        owner_id: payload.owner_id,
                        status_id: payload.status_id,
                    });
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
        companyInfo,
        handleCompanyInfo: (value: ICompanyInfo) => setCompanyInfo(value),
    };
    return (
        <CompanyContext.Provider value={companyContextValue}>
            {!showSplashScreen ? children : <LoadingPage />}
        </CompanyContext.Provider>
    );
};

export default CompanyProvider;
