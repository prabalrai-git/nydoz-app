import { Link } from "react-router-dom";
import Avatar from "../../../../assets/media/avatars/300-1.jpg";

const companyOne = () => {
    return (
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
                                    <a href='/'>
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

                            <div className='d-flex my-4'>
                                <a
                                    href='#'
                                    className='btn btn-sm btn-light me-2'
                                    id='kt_user_follow_button'>
                                    <i className='ki-outline ki-check fs-3 d-none'></i>
                                    <span className='indicator-label'>
                                        Follow
                                    </span>
                                </a>
                                <Link
                                    to='/company-details/1'
                                    className='btn btn-sm btn-primary me-3'
                                    data-bs-toggle='modal'
                                    data-bs-target='#kt_modal_offer_a_deal'>
                                    View Details
                                </Link>

                                <div className='me-0'>
                                    <button
                                        className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                                        data-kt-menu-trigger='click'
                                        data-kt-menu-placement='bottom-end'>
                                        <i className='ki-solid ki-dots-horizontal fs-2x me-1'></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default companyOne;
