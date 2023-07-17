import { useState, useCallback, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import API_ROUTE from "../../../service/api";
import { ICompanyResponse } from "../../../types/payload.type";
import CompanyLoader from "../../shared/components/company/CompanyLoader";
import useAuthContext from "../../../context/auth/useAuthContext";

const CompanyLayout = () => {
    const { dispatch, companyInfo, userInfo } = useAuthContext();
    const [showSplashScreen, setShowSplashScreen] = useState<boolean>(true);
    const { companySubdomian } = useParams<string>();
    const { fetchDataById, error } = useFetch<ICompanyResponse>(
        API_ROUTE.GET_COMPANY_BY_SUBDOMAIN,
        true
    );

    const fetchCompanyInfo = useCallback(async () => {
        try {
            setShowSplashScreen(true);

            const url = `${API_ROUTE.GET_COMPANY_BY_SUBDOMAIN}/${companySubdomian}`;
            // const testUrl = API_ROUTE.GET_COMPANY_BY_SUBDOMAIN_TEST;

            const response = await fetchDataById(url);
            if (response?.data?.payload) {
                const { payload } = response.data;
                console.log(payload, "payload");
                const companyInfo = {
                    id: payload.id,
                    name: payload.name,
                    subdomain: payload.subdomain,
                    company_owner_id: payload.company_owner_id,
                    status_id: payload.status_id,
                };

                const isCompanyAdmin =
                    userInfo?.id === payload.company_owner_id;
                dispatch({
                    type: "SET_COMPANY_INFO",
                    payload: {
                        companyInfo,
                        isCompanyOwner: isCompanyAdmin,
                    },
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setShowSplashScreen(false);
        }
    }, [companySubdomian, fetchDataById, dispatch, userInfo?.id]);

    useEffect(() => {
        console.log(
            companySubdomian,
            companyInfo?.subdomain,
            "companySubdomian"
        );
        if (companySubdomian !== companyInfo?.subdomain) {
            fetchCompanyInfo();
        } else {
            setShowSplashScreen(false);
        }
    }, [fetchCompanyInfo, companySubdomian, companyInfo?.subdomain]);

    return <div>{showSplashScreen ? <CompanyLoader /> : <Outlet />}</div>;
};

export default CompanyLayout;
