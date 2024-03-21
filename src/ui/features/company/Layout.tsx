import { useState, useCallback, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import API_ROUTE from "../../../service/api";
import { ICompanyResponse } from "../../../types/payload.type";
import CompanyLoader from "../../shared/components/company/CompanyLoader";
import useAuthContext from "../../../context/auth/useAuthContext";
import useHandleShowError from "../../../hooks/useHandleShowError";
import { ISidebarMenu } from "../../../types/app.types";
import ProductSideMenu from "../../shared/layouts/sidebar/SideMenu";

import { Boxes, Gear } from "react-bootstrap-icons";
import { useWindowSize } from "usehooks-ts";
import useWebSetting from "../../../context/useWebSetting";
import { MdSpaceDashboard } from "react-icons/md";
import { RiFolderSettingsFill } from "react-icons/ri";
import { FaCircleUser } from "react-icons/fa6";

const CompanyLayout = () => {
  const { dispatch, companyInfo, userInfo } = useAuthContext();
  const [showSplashScreen, setShowSplashScreen] = useState<boolean>(true);
  // const { companySubdomian } = useParams<string>();

  const { url } = useWebSetting();

  const companySubdomian = url.split(".")[0].split("//")[1];

  const { fetchDataById, error } = useFetch<ICompanyResponse>(
    API_ROUTE.GET_COMPANY_BY_SUBDOMAIN,
    true
  );
  const { width } = useWindowSize();
  useHandleShowError(error);

  const fetchCompanyInfo = useCallback(async () => {
    try {
      setShowSplashScreen(true);

      const url = `${API_ROUTE.GET_COMPANY_BY_SUBDOMAIN}/${companySubdomian}`;
      // const testUrl = API_ROUTE.GET_COMPANY_BY_SUBDOMAIN_TEST;

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
    } finally {
      setShowSplashScreen(false);
    }
  }, [companySubdomian, fetchDataById, dispatch, userInfo?.id]);

  useEffect(() => {
    if (companySubdomian !== companyInfo?.subdomain) {
      fetchCompanyInfo();
    } else {
      setShowSplashScreen(false);
    }
  }, [fetchCompanyInfo, companySubdomian, companyInfo?.subdomain]);

  const sidebarMenu: ISidebarMenu[] = [
    {
      id: 1,
      title: "Dashboard",
      link: "dashboard",
      // icon: <House size={20} />,
      icon: <MdSpaceDashboard size={18} />,
    },

    {
      id: 2,
      title: "Products",
      link: "products/dashboard",
      // icon: <i className="ki-outline ki-abstract-26 fs-2x"></i>,
      icon: <Boxes size={18} />,
    },
    {
      id: 3,
      title: "Products Settings",
      link: "product-settings/view",
      // icon: <Boxes size={20} />,
      icon: <RiFolderSettingsFill size={18} />,
    },
    {
      id: 4,
      title: "Profile",
      link: `profile/${companyInfo?.id}`,
      // icon: <PersonBadge size={20} />,
      icon: <FaCircleUser size={18} />,
    },
    {
      id: 5,
      title: "Settings",
      link: "settings/dashboard",
      icon: <Gear size={18} />,
    },
  ];

  return (
    <div>
      {showSplashScreen ? (
        <CompanyLoader />
      ) : (
        <div className="d-flex ">
          {/* <NavPills navpills={navpills} /> */}
          <ProductSideMenu
            title={companyInfo?.subdomain || companySubdomian || ""}
            backPath="/"
            sidebarMenuList={sidebarMenu}
          />
          <div
            className={width > 768 ? "doc-content" : "doc-content-sm "}
            style={{
              marginTop: "0px",
              marginLeft: "220px",
              marginRight: "15px",
            }}
          >
            <div className="ps-2">
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyLayout;
