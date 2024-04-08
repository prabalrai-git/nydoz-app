import { useState, useCallback, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import API_ROUTE from "../../../service/api";
import { ICompanyResponse } from "../../../types/payload.type";
import CompanyLoader from "../../shared/components/company/CompanyLoader";
import useAuthContext from "../../../context/auth/useAuthContext";
import useHandleShowError from "../../../hooks/useHandleShowError";
import { ISidebarMenu } from "../../../types/app.types";

import {
  Boxes,
  Buildings,
  Gear,
  PersonCheck,
  PersonLock,
} from "react-bootstrap-icons";
import useWebSetting from "../../../context/useWebSetting";
import { MdSpaceDashboard } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";

//
import { Layout, Menu } from "antd";

import FooterLayout from "../../shared/layouts/Footer/Footer";
import WorkSpaceNavbar from "../../shared/layouts/Header/navbar/WorkSpaceNavbar";
import { BsFillFileEarmarkPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { TbReportMoney } from "react-icons/tb";
import { GoSidebarCollapse } from "react-icons/go";
import { CrossStorageClient } from "cross-storage";

const { Header, Content, Sider } = Layout;
const CompanyLayout = () => {
  const { dispatch, companyInfo, userInfo } = useAuthContext();
  const [showSplashScreen, setShowSplashScreen] = useState<boolean>(true);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  // const { companySubdomian } = useParams<string>();

  const { url } = useWebSetting();

  const navigate = useNavigate();

  const companySubdomian = url.split(".")[0].split("//")[1];

  const { fetchDataById, error } = useFetch<ICompanyResponse>(
    API_ROUTE.GET_COMPANY_BY_SUBDOMAIN,
    true
  );

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
      icon: <MdSpaceDashboard size={18} />,
    },

    {
      id: 2,
      title: "Products",
      link: "products/dashboard",
      // icon: <i className="ki-outline ki-abstract-26 fs-2x"></i>,
      icon: <Boxes size={18} />,
    },
    // {
    //   id: 3,
    //   title: "Products Settings",
    //   link: "product-settings/view",
    //   // icon: <Boxes size={20} />,
    //   icon: <RiFolderSettingsFill size={18} />,
    // },
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

  const clientManagementSideBar: ISidebarMenu[] = [
    {
      id: 2,
      title: "Dashboard",
      link: "/company/products/client-management/dashboard",
      icon: <MdSpaceDashboard size={20} />,
    },
    {
      id: 1,
      title: "Visitors",
      link: "/company/products/client-management/visitors",
      icon: <BsFillFileEarmarkPersonFill size={19} />,
    },
    {
      id: 3,
      title: "Clients",
      link: "/company/products/client-management/clients",
      icon: <PersonCheck size={20} />,
    },
    {
      id: 4,
      title: "Transactions",
      link: "/company/products/client-management/transactions/list",
      icon: <TbReportMoney size={20} />,
    },
    {
      id: 5,
      title: "Agents",
      link: "/company/products/client-management/agents",
      icon: <PersonLock size={20} />,
    },
    {
      id: 6,
      title: "Institutions",
      link: "/company/products/client-management/enrolled-institutes/list",
      icon: <Buildings size={18} />,
    },
    {
      id: 7,
      title: "Settings",
      link: "/company/products/client-management/settings/visiting-purposes",
      icon: <Gear size={18} />,
    },
  ];
  const items = window.location.href.includes("client-management")
    ? clientManagementSideBar.map((item) => ({
        key: item.id,
        icon: item.icon,
        label: item.title,
        onClick: () => navigate(item.link),
      }))
    : sidebarMenu.map((item) => ({
        key: item.id,
        icon: item.icon,
        label: item.title,
        onClick: () => navigate(item.link),
      }));

  return (
    <div className=" tw-relative">
      <Layout hasSider>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          // onBreakpoint={(broken) => {
          //   console.log(broken, "broken");
          // }}
          onCollapse={(collapsed, type) => {
            setCollapsed(collapsed);
          }}
          collapsed={collapsed}
          style={{
            overflow: "auto",
            // height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
          className="tw-min-h-[100vh] tw-z-[10000]  "
        >
          <div className="flex-column flex-center fs-12 fw-bolder  mb-3 mt-2 tw-w-11/12 tw-mx-auto ">
            <span className="text-uppercase tw-text-md tw-text-center tw-font-mono tw-text-white tw-mb-4 tw-bg-gray-500 tw-w-full tw-py-5 tw-rounded-lg ">
              {companyInfo?.subdomain || companySubdomian || ""}
            </span>
          </div>

          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            // className="tw-absolute tw-top-0"
            items={items}
          />
          <Link
            to={
              window.location.href.includes("client-management")
                ? "/company/products/dashboard"
                : "/"
            }
            className=""
          >
            <div className="  tw-border-btnPrimary tw-border-[3px]   tw-mt-6 tw-cursor-pointer tw-flex tw-flex-row tw-items-center tw-justify-evenly tw-py-2 tw-rounded-lg tw-text-btnPrimary tw-gap-5 hover:tw-shadow-md tw-w-11/12 tw-mx-auto">
              <IoChevronBack size={20} />
              <p className="    tw-font-bold tw-text-lg">{"Back"}</p>
            </div>
          </Link>
        </Sider>
        <Layout>
          {true && (
            <div
              onClick={() => setCollapsed((prev) => !prev)}
              className="tw-bg-appSideBar tw-fixed  tw-w-[40px] tw-h-[40px] tw-top-[7%]   tw-z-[999999] tw-flex tw-justify-center tw-items-center tw-rounded-tr-lg tw-rounded-br-lg"
              style={{
                left: collapsed ? 0 : 200,
                transition: "left 0.2s ease",
              }}
            >
              <GoSidebarCollapse size={30} color="white" />
            </div>
          )}
          <div>
            <Header>
              <WorkSpaceNavbar />
            </Header>

            <Content
              style={{
                marginTop: "35px",
                // marginLeft: !collapsed ? 200 : 0,
                marginRight: "20px",
              }}
              className={`${
                collapsed ? "xsm:tw-ml-[20px]" : "mmd:tw-ml-[220px]"
              } tw-min-h-[100vh]`}
            >
              {showSplashScreen ? <CompanyLoader /> : <Outlet />}
            </Content>

            <FooterLayout />
          </div>
        </Layout>
      </Layout>
    </div>
  );

  // return (
  //   <div>
  //     {showSplashScreen ? (
  //       <CompanyLoader />
  //     ) : (
  //       <div className="d-flex ">
  //         {/* <NavPills navpills={navpills} /> */}
  //         <ProductSideMenu
  //           title={companyInfo?.subdomain || companySubdomian || ""}
  //           backPath="/"
  //           sidebarMenuList={sidebarMenu}
  //         />
  //         <div
  //           className={width > 768 ? "doc-content" : "doc-content-sm "}
  //           style={{
  //             marginTop: "0px",
  //             marginLeft: "220px",
  //             marginRight: "15px",
  //           }}
  //         >
  //           <div className="ps-2">
  //             <Outlet />
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
};

export default CompanyLayout;
