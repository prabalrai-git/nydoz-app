import { Outlet } from "react-router-dom";
import Avatar from "../../../assets/media/avatars/300-1.jpg";

// {
//   "status": "string",
//   "message": "string",
//   "payload": {
//     "id": 0,
//     "name": "string",
//     "subdomain": "string",
//     "owner_id": 0,
//     "status_id": 0,
//     "email": "string",
//     "address": "string",
//     "country": "string",
//     "state": "string",
//     "city": "string",
//     "postal_code": "string",
//     "country_calling_code": "string",
//     "phone_number": "string",
//     "contact_person": "string",
//     "website": "string",
//     "registration_type": "string",
//     "registration_number": "string",
//     "logo": "string",
//     "cover_image": "string"
//   }
// }

const ProfileLayout = () => {
    return (
        <div className='card-single-row'>
            <div className='card mb-5 mb-xxl-8 mt-5'>
                <div className='card-body pt-9 pb-0'>
                    <div className='d-flex flex-wrap flex-sm-nowrap'>
                        <div className='me-7 mb-4'>
                            <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                                <img src={Avatar} alt='image' />
                                <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-body h-20px w-20px'></div>
                            </div>
                        </div>

                        <div className='flex-grow-1'>
                            <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                                <div className='d-flex flex-column'>
                                    <div className='d-flex align-items-center mb-2'>
                                        <a
                                            href='#'
                                            className='text-gray-900 text-hover-primary fs-2 fw-bold me-1'>
                                            Max Smith
                                        </a>
                                        <a href='#'>
                                            <i className='ki-outline ki-verify fs-1 text-primary'></i>
                                        </a>
                                    </div>

                                    <div className='d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2'>
                                        <a
                                            href='#'
                                            className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'>
                                            <i className='ki-outline ki-profile-circle fs-4 me-1'></i>
                                            Developer
                                        </a>
                                        <a
                                            href='#'
                                            className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'>
                                            <i className='ki-outline ki-geolocation fs-4 me-1'></i>
                                            SF, Bay Area
                                        </a>
                                        <a
                                            href='#'
                                            className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'>
                                            <i className='ki-outline ki-sms fs-4 me-1'></i>
                                            max@kt.com
                                        </a>
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
                                                Projects
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
                            <a
                                className='nav-link text-active-primary ms-0 me-10 py-5'
                                href='../../demo31/dist/pages/user-profile/clients.html'>
                                Project
                            </a>
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
                            <a
                                className='nav-link text-active-primary ms-0 me-10 py-5'
                                href='../../demo31/dist/pages/user-profile/projects.html'>
                                Activity
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default ProfileLayout;
