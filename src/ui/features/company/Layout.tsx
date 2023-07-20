import React, { useState, useCallback, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import API_ROUTE from "../../../service/api";
import { ICompanyResponse } from "../../../types/payload.type";
import CompanyLoader from "../../shared/components/company/CompanyLoader";
import useAuthContext from "../../../context/auth/useAuthContext";
import { NavLink } from "react-router-dom";
import {
    BagCheck,
    ChatRight,
    FileBarGraph,
    Folder,
    Person,
    PersonFillGear,
} from "react-bootstrap-icons";
import CompanyBreadcrumb from "../../shared/molecules/CompanyBreadcrumb";
import useHandleShowError from "../../../hooks/useHandleShowError";

interface INavMenu {
    id: number;
    title: string;
    link: string;
    icon: React.ReactNode;
}

const CompanyLayout = () => {
    const { dispatch, companyInfo, userInfo } = useAuthContext();
    const [showSplashScreen, setShowSplashScreen] = useState<boolean>(true);
    const { companySubdomian } = useParams<string>();
    const { fetchDataById, error } = useFetch<ICompanyResponse>(
        API_ROUTE.GET_COMPANY_BY_SUBDOMAIN,
        true
    );

    useHandleShowError(error);

    const NavMenu: INavMenu[] = [
        {
            id: 1,
            title: "Dashboard",
            link: "dashboard",
            icon: <FileBarGraph size='30' color='#70b541' />,
        },
        {
            id: 2,
            title: "Profile",
            link: `profile/${companyInfo?.id}`,
            icon: <Person size='30' color='#70b541' />,
        },
        {
            id: 3,
            title: "Products",
            link: "products/view",
            icon: <BagCheck size='30' color='#70b541' />,
        },
        {
            id: 4,
            title: "Documents",
            link: "documents",
            icon: <Folder size='30' color='#70b541' />,
        },
        {
            id: 5,
            title: "Roles",
            link: "roles",
            icon: <PersonFillGear size='30' color='#70b541' />,
        },
        {
            id: 6,
            title: "Social Links",
            link: "social-links",
            icon: <ChatRight size='30' color='#70b541' />,
        },
    ];

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
            // console.log(error);
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

    return (
        <div>
            {showSplashScreen ? (
                <CompanyLoader />
            ) : (
                <div>
                    <div>
                        <CompanyBreadcrumb
                            title={companyInfo?.name || "HOME"}
                            btnText='Back'
                            showBreadcrumb={true}
                        />
                    </div>
                    <ul className='nav nav-pills nav-pills-custom '>
                        {NavMenu.map((item: INavMenu) => (
                            <li
                                key={item.id}
                                className='nav-item my-6 me-3 me-lg-6'
                                role='presentation'>
                                <NavLink
                                    className='nav-link d-flex justify-content-between flex-column flex-center overflow-hidden  w-80px h-85px py-4 hover-green'
                                    data-bs-toggle='pill'
                                    to={item.link}
                                    aria-selected='true'
                                    role='tab'>
                                    <div className='nav-icon'>{item?.icon}</div>
                                    <span className='nav-text text-gray-700 fw-bold fs-6 lh-1'>
                                        {item?.title}
                                    </span>
                                    <span className='bullet-custom position-absolute bottom-0 w-100 h-4px bg-primary'></span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    <Outlet />
                </div>
            )}
        </div>
    );
};

export default CompanyLayout;
