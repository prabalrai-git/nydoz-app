import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import Avatar from "../../../assets/media/avatars/300-1.jpg";
import useFetch from "../../../hooks/useFetch";
import API_ROUTE from "../../../service/api";
import { ICompanyResponse } from "../../../types/payload.type";
import BASE_URL from "../../../constants/AppSetting";
import Heading from "../../shared/molecules/Heading";
import Breadcrumb from "../../shared/molecules/Breadcrumb";
import LoadingSpinner from "../../shared/molecules/LoadingSpinner";
import { Link } from "react-router-dom";

const ProfileLayout = () => {
    const { id } = useParams<{ id: string }>();
    const url = `${API_ROUTE.GET_COMPANY_BY_ID}/${id}`;
    const { data, fetchData } = useFetch<ICompanyResponse>(url, true);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        console.log(data, "data");
    }, [data]);

    return (
        <div>
            <Heading
                btnText='Back'
                showBreadcrumb={true}
                title='Company Profile'>
                <Breadcrumb
                    parent='Company'
                    parentLink='/account/company/list'
                    child={data?.name ?? "Profile"}
                />
            </Heading>
            <div>
                {!data ? (
                    <div className='flex-center w-100'>
                        <LoadingSpinner />
                    </div>
                ) : (
                    <div className='card-single-row'>
                        <div className='card mb-5 mb-xxl-8 mt-5'>
                            <div className='card-body pt-9 pb-0'>
                                <div className='d-flex flex-wrap flex-sm-nowrap'>
                                    <div className='me-7 mb-4'>
                                        <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative shadow shadow-sm p-3'>
                                            <img
                                                src={
                                                    data?.logo
                                                        ? BASE_URL + data?.logo
                                                        : Avatar
                                                }
                                                alt='image'
                                            />
                                            <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-body h-20px w-20px'></div>
                                        </div>
                                    </div>

                                    <div className='flex-grow-1'>
                                        <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                                            <div className='d-flex flex-column'>
                                                <div className='d-flex align-items-center mb-2'>
                                                    <div className='text-gray-900 text-hover-primary fs-2 fw-bold me-1'>
                                                        {data?.name}
                                                    </div>
                                                    <a href='#'>
                                                        <i className='ki-outline ki-verify fs-1 text-primary'></i>
                                                    </a>
                                                </div>

                                                <div className='d-flex flex-wrap fw-semibold fs-6 mb-2 pe-2'>
                                                    <div className='d-flex align-items-center text-gray-600 text-hover-primary me-5 mb-2'>
                                                        <i className='ki-outline ki-profile-circle fs-4 me-1'></i>
                                                        {data?.contact_person}
                                                    </div>

                                                    <div className='d-flex align-items-center text-gray-600 text-hover-primary me-5 mb-2'>
                                                        <i className='ki-outline ki-phone fs-2'></i>
                                                        {data?.phone_number}
                                                    </div>
                                                    <div className='d-flex align-items-center text-gray-600 text-hover-primary mb-2'>
                                                        <i className='ki-outline ki-sms fs-4 me-1'></i>
                                                        {data?.email}
                                                    </div>
                                                </div>
                                                <div className='d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2'>
                                                    <div className='d-flex align-items-center text-gray-600 text-hover-primary me-5 mb-2'>
                                                        <i className='ki-outline ki-profile-circle fs-4 me-1'></i>
                                                        {data?.contact_person}
                                                    </div>
                                                    <div className='d-flex align-items-center text-gray-600 text-hover-primary me-5 mb-2'>
                                                        <i className='ki-outline ki-geolocation fs-4 me-1'></i>
                                                        {data?.address},{" "}
                                                        {data?.city},{" "}
                                                        {data?.state}
                                                    </div>
                                                    <div className='d-flex align-items-center text-gray-600 text-hover-primary mb-2'>
                                                        <i className='ki-outline ki-phone fs-2'></i>
                                                        {data?.country}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='d-flex flex-wrap flex-stack'>
                                            <div className='d-flex flex-column flex-grow-1 pe-8'>
                                                <div className='d-flex flex-wrap'>
                                                    <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                                                        <div className='d-flex align-items-center'>
                                                            <i className='ki-outline ki-arrow-up fs-3 text-success me-2'></i>
                                                            <div
                                                                className='fs-2 fw-bold counted'
                                                                data-kt-countup='true'
                                                                data-kt-countup-value='4500'
                                                                data-kt-countup-prefix='$'
                                                                data-kt-initialized='1'>
                                                                $4,500
                                                            </div>
                                                        </div>

                                                        <div className='fw-semibold fs-6 text-gray-400'>
                                                            Earnings
                                                        </div>
                                                    </div>

                                                    <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                                                        <div className='d-flex align-items-center'>
                                                            <i className='ki-outline ki-arrow-down fs-3 text-danger me-2'></i>
                                                            <div
                                                                className='fs-2 fw-bold counted'
                                                                data-kt-countup='true'
                                                                data-kt-countup-value='80'
                                                                data-kt-initialized='1'>
                                                                80
                                                            </div>
                                                        </div>

                                                        <div className='fw-semibold fs-6 text-gray-400'>
                                                            Products
                                                        </div>
                                                    </div>

                                                    <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                                                        <div className='d-flex align-items-center'>
                                                            <i className='ki-outline ki-arrow-up fs-3 text-success me-2'></i>
                                                            <div
                                                                className='fs-2 fw-bold counted'
                                                                data-kt-countup='true'
                                                                data-kt-countup-value='60'
                                                                data-kt-countup-prefix='%'
                                                                data-kt-initialized='1'>
                                                                %60
                                                            </div>
                                                        </div>

                                                        <div className='fw-semibold fs-6 text-gray-400'>
                                                            Success Rate
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold'>
                                    <li className='nav-item mt-2'>
                                        <a
                                            className='nav-link text-active-primary ms-0 me-10 py-5 active'
                                            href='../../demo31/dist/pages/user-profile/overview.html'>
                                            Overview
                                        </a>
                                    </li>

                                    <li className='nav-item mt-2'>
                                        <Link
                                            className='nav-link text-active-primary ms-0 me-10 py-5'
                                            to={"products"}>
                                            Products
                                        </Link>
                                    </li>

                                    <li className='nav-item mt-2'>
                                        <a
                                            className='nav-link text-active-primary ms-0 me-10 py-5'
                                            href='../../demo31/dist/pages/user-profile/clients.html'>
                                            Clients
                                        </a>
                                    </li>

                                    <li className='nav-item mt-2'>
                                        <a
                                            className='nav-link text-active-primary ms-0 me-10 py-5'
                                            href='../../demo31/dist/pages/user-profile/projects.html'>
                                            Investment
                                        </a>
                                    </li>

                                    <li className='nav-item mt-2'>
                                        <Link
                                            to={`roles`}
                                            className='nav-link text-active-primary ms-0 me-10 py-5'>
                                            Roles
                                        </Link>
                                    </li>
                                    <li className='nav-item mt-2'>
                                        <Link
                                            to={`documents`}
                                            className='nav-link text-active-primary ms-0 me-10 py-5'>
                                            Documents
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='container'>
                            <Outlet />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileLayout;
