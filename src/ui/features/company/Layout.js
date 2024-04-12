import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import API_ROUTE from "../../../service/api";
import CompanyLoader from "../../shared/components/company/CompanyLoader";
import useAuthContext from "../../../context/auth/useAuthContext";
import useHandleShowError from "../../../hooks/useHandleShowError";
import { Boxes, Buildings, Gear, PersonCheck, PersonLock, } from "react-bootstrap-icons";
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
import APP_SETTING from "../../../config/AppSetting";
const { Header, Content, Sider } = Layout;
const CompanyLayout = () => {
    const { dispatch, companyInfo, userInfo } = useAuthContext();
    const [showSplashScreen, setShowSplashScreen] = useState(true);
    const [collapsed, setCollapsed] = useState(false);
    // const { companySubdomian } = useParams<string>();
    const { url } = useWebSetting();
    const navigate = useNavigate();
    const companySubdomian = url.split(".")[0].split("//")[1];
    const { fetchDataById, error } = useFetch(API_ROUTE.GET_COMPANY_BY_SUBDOMAIN, true);
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
        }
        catch (error) {
        }
        finally {
            setShowSplashScreen(false);
        }
    }, [companySubdomian, fetchDataById, dispatch, userInfo?.id]);
    useEffect(() => {
        if (companySubdomian !== companyInfo?.subdomain &&
            localStorage.getItem("token")) {
            fetchCompanyInfo();
        }
        else {
            setShowSplashScreen(false);
        }
    }, [
        fetchCompanyInfo,
        companySubdomian,
        companyInfo?.subdomain,
        localStorage.getItem("token"),
    ]);
    const sidebarMenu = [
        {
            id: 1,
            title: "Dashboard",
            link: "dashboard",
            icon: _jsx(MdSpaceDashboard, { size: 18 }),
        },
        {
            id: 2,
            title: "Products",
            link: "products/dashboard",
            // icon: <i className="ki-outline ki-abstract-26 fs-2x"></i>,
            icon: _jsx(Boxes, { size: 18 }),
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
            icon: _jsx(FaCircleUser, { size: 18 }),
        },
        {
            id: 5,
            title: "Settings",
            link: "settings/dashboard",
            icon: _jsx(Gear, { size: 18 }),
        },
    ];
    const clientManagementSideBar = [
        {
            id: 2,
            title: "Dashboard",
            link: "/company/products/client-management/dashboard",
            icon: _jsx(MdSpaceDashboard, { size: 20 }),
        },
        {
            id: 1,
            title: "Visitors",
            link: "/company/products/client-management/visitors",
            icon: _jsx(BsFillFileEarmarkPersonFill, { size: 19 }),
        },
        {
            id: 3,
            title: "Clients",
            link: "/company/products/client-management/clients",
            icon: _jsx(PersonCheck, { size: 20 }),
        },
        {
            id: 4,
            title: "Transactions",
            link: "/company/products/client-management/transactions/list",
            icon: _jsx(TbReportMoney, { size: 20 }),
        },
        {
            id: 5,
            title: "Agents",
            link: "/company/products/client-management/agents",
            icon: _jsx(PersonLock, { size: 20 }),
        },
        {
            id: 6,
            title: "Institutions",
            link: "/company/products/client-management/enrolled-institutes/list",
            icon: _jsx(Buildings, { size: 18 }),
        },
        {
            id: 7,
            title: "Settings",
            link: "/company/products/client-management/settings/visiting-purposes",
            icon: _jsx(Gear, { size: 18 }),
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
    return (_jsx("div", { className: " tw-relative", children: _jsxs(Layout, { hasSider: true, children: [_jsxs(Sider, { breakpoint: "lg", collapsedWidth: "0", 
                    // onBreakpoint={(broken) => {
                    //   console.log(broken, "broken");
                    // }}
                    onCollapse: (collapsed, type) => {
                        setCollapsed(collapsed);
                    }, collapsed: collapsed, style: {
                        overflow: "auto",
                        // height: "100vh",
                        position: "fixed",
                        left: 0,
                        top: 0,
                        bottom: 0,
                    }, className: "tw-min-h-[100vh] tw-z-[10000]  ", children: [_jsx("div", { className: "flex-column flex-center fs-12 fw-bolder  mb-3 mt-2 tw-w-11/12 tw-mx-auto ", children: _jsx("span", { className: "text-uppercase tw-text-md tw-text-center tw-font-mono tw-text-white tw-mb-4 tw-bg-gray-500 tw-w-full tw-py-5 tw-rounded-lg ", children: companyInfo?.subdomain || companySubdomian || "" }) }), _jsx(Menu, { theme: "dark", mode: "inline", defaultSelectedKeys: ["1"], 
                            // className="tw-absolute tw-top-0"
                            items: items }), window.location.href.includes("client-management") ? (_jsx(Link, { to: "/company/products/dashboard", children: _jsxs("div", { className: "  tw-border-btnPrimary tw-border-[3px]   tw-mt-6 tw-cursor-pointer tw-flex tw-flex-row tw-items-center tw-justify-evenly tw-py-2 tw-rounded-lg tw-text-btnPrimary tw-gap-5 hover:tw-shadow-md tw-w-11/12 tw-mx-auto", children: [_jsx(IoChevronBack, { size: 20 }), _jsx("p", { className: "    tw-font-bold tw-text-lg", children: "Back" })] }) })) : (_jsx("a", { href: APP_SETTING.APP_BASE_URL, className: "", children: _jsxs("div", { className: "  tw-border-btnPrimary tw-border-[3px]   tw-mt-6 tw-cursor-pointer tw-flex tw-flex-row tw-items-center tw-justify-evenly tw-py-2 tw-rounded-lg tw-text-btnPrimary tw-gap-5 hover:tw-shadow-md tw-w-11/12 tw-mx-auto", children: [_jsx(IoChevronBack, { size: 20 }), _jsx("p", { className: "    tw-font-bold tw-text-lg", children: "Back" })] }) }))] }), _jsxs(Layout, { children: [true && (_jsx("div", { onClick: () => setCollapsed((prev) => !prev), className: "tw-bg-appSideBar tw-fixed  tw-w-[40px] tw-h-[40px] tw-top-[7%]   tw-z-[999999] tw-flex tw-justify-center tw-items-center tw-rounded-tr-lg tw-rounded-br-lg", style: {
                                left: collapsed ? 0 : 200,
                                transition: "left 0.2s ease",
                            }, children: _jsx(GoSidebarCollapse, { size: 30, color: "white" }) })), _jsxs("div", { children: [_jsx(Header, { children: _jsx(WorkSpaceNavbar, {}) }), _jsx(Content, { style: {
                                        marginTop: "35px",
                                        // marginLeft: !collapsed ? 200 : 0,
                                        marginRight: "20px",
                                    }, className: `${collapsed ? "xsm:tw-ml-[20px]" : "mmd:tw-ml-[220px]"} tw-min-h-[100vh]`, children: showSplashScreen ? _jsx(CompanyLoader, {}) : _jsx(Outlet, {}) }), _jsx(FooterLayout, {})] })] })] }) }));
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
