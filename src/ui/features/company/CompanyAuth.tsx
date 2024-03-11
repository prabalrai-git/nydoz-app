import { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import API_ROUTE from "../../../service/api";
import { ICompanyResponse } from "../../../types/payload.type";
import CompanyLoader from "../../shared/components/company/CompanyLoader";
import useAuthContext from "../../../context/auth/useAuthContext";
import useHandleShowError from "../../../hooks/useHandleShowError";

interface IProps {
  children: React.ReactNode;
}

const CompanyLayout = (props: IProps) => {
  const navigate = useNavigate();

  const { children } = props;
  const { dispatch, companyInfo, userInfo } = useAuthContext();
  const [showSplashScreen, setShowSplashScreen] = useState<boolean>(true);
  const { companySubdomian } = useParams<string>();
  const { fetchDataById, error } = useFetch<ICompanyResponse>(
    API_ROUTE.GET_COMPANY_BY_SUBDOMAIN,
    true
  );
  useHandleShowError(error);

  const fetchCompanyInfo = useCallback(async () => {
    try {
      setShowSplashScreen(true);
      const url = `${API_ROUTE.GET_COMPANY_BY_SUBDOMAIN}/${companySubdomian}`;
      const response = await fetchDataById(url);
      if (response?.data?.payload) {
        const { payload } = response.data;
        const companyInfo = {
          id: payload.id,
          name: payload.name,
          subdomain: payload.subdomain,
          company_owner_id: payload.company_owner_id,
          status_id: payload.status_id,
        };
        const isCompanyAdmin = userInfo?.id === payload.company_owner_id;
        dispatch({
          type: "SET_COMPANY_INFO",
          payload: {
            companyInfo,
            isCompanyOwner: isCompanyAdmin,
          },
        });
      }
    } catch (error) {
      navigate("/");
    } finally {
      setShowSplashScreen(false);
    }
  }, [companySubdomian, fetchDataById, userInfo?.id, dispatch, navigate]);

  useEffect(() => {
    if (companySubdomian !== companyInfo?.subdomain) {
      fetchCompanyInfo();
    } else {
      setShowSplashScreen(false);
    }
  }, [fetchCompanyInfo, companySubdomian, companyInfo?.subdomain]);

  return (
    <div>
      {showSplashScreen ? (
        <>
          <CompanyLoader />
        </>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export default CompanyLayout;
