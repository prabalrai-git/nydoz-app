import { useState, useCallback, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import API_ROUTE from "../../../service/api";
import { ICompanyResponse } from "../../../types/payload.type";
import CompanyLoader from "../../shared/components/company/CompanyLoader";
import useAuthContext from "../../../context/auth/useAuthContext";
import { Link } from "react-router-dom";
import { FileBarGraph, Folder, Person } from "react-bootstrap-icons";
import CompanyBreadcrumb from "../../shared/molecules/CompanyBreadcrumb";
import useHandleShowError from "../../../hooks/useHandleShowError";

const CompanyLayout = () => {
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
                        <li
                            className='nav-item my-6 me-3 me-lg-6'
                            role='presentation'>
                            <Link
                                className='nav-link d-flex justify-content-between flex-column flex-center overflow-hidden active w-80px h-85px py-4 hover-green'
                                data-bs-toggle='pill'
                                to='dashboard'
                                aria-selected='true'
                                role='tab'>
                                <div className='nav-icon'>
                                    <FileBarGraph size='30' color='#70b541' />
                                </div>
                                <span className='nav-text text-gray-700 fw-bold fs-6 lh-1'>
                                    Dashboard
                                </span>
                                <span className='bullet-custom position-absolute bottom-0 w-100 h-4px bg-primary'></span>
                            </Link>
                        </li>
                        <li
                            className='nav-item my-6 me-3 me-lg-6 '
                            role='presentation'>
                            <Link
                                className='nav-link d-flex justify-content-between flex-column flex-center overflow-hidden active w-80px h-85px py-4 hover-green '
                                data-bs-toggle='pill'
                                to={`profile/${companyInfo?.id}`}
                                aria-selected='true'
                                role='tab'>
                                <div className='nav-icon'>
                                    <Person size='30' color='#70b541' />
                                </div>
                                <span className='nav-text text-gray-700 fw-bold fs-6 lh-1'>
                                    Profile
                                </span>
                                <span className='bullet-custom position-absolute bottom-0 w-100 h-4px bg-primary'></span>
                            </Link>
                        </li>
                        <li
                            className='nav-item my-6 me-3 me-lg-6'
                            role='presentation'>
                            <Link
                                className='nav-link d-flex justify-content-between flex-column flex-center overflow-hidden active w-80px h-85px py-4 hover-green'
                                data-bs-toggle='pill'
                                to='products/view'
                                aria-selected='true'
                                role='tab'>
                                <div className='nav-icon'>
                                    <Folder size='30' color='#70b541' />
                                </div>

                                <span className='nav-text text-gray-700 fw-bold fs-6 lh-1'>
                                    Products
                                </span>
                                <span className='bullet-custom position-absolute bottom-0 w-100 h-4px bg-primary'></span>
                            </Link>
                        </li>
                    </ul>

                    <Outlet />
                </div>
            )}
        </div>
    );
};

export default CompanyLayout;
