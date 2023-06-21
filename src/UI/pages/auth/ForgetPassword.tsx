import CompanyLogo from "../../../assets/media/svg/CompanyLogo.svg";
import Poster from "./Poster";

const ForgetPassword = () => {
    return (
        <div className='d-flex flex-column flex-root' id='kt_app_root'>
            <div className='d-flex flex-column flex-lg-row flex-column-fluid '>
                {/* first Side group */}
                <div className='d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1'>
                    <div className='d-flex flex-center flex-column flex-lg-row-fluid'>
                        <div className='w-lg-500px p-10 card shadow-sm'>
                            <form
                                className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
                                id='kt_password_reset_form'
                                data-kt-redirect-url='../../demo31/dist/authentication/layouts/corporate/new-password.html'
                                action='#'>
                                <div className=' mb-6'>
                                    <h1 className='text-dark fw-bolder mb-3'>
                                        Forgot Password ?
                                    </h1>

                                    <div className='text-gray-500 fw-semibold fs-6'>
                                        Enter your email to reset your password.
                                    </div>
                                </div>

                                <div className='fv-row mb-8 fv-plugins-icon-container'>
                                    <input
                                        type='text'
                                        placeholder='Email'
                                        name='email'
                                        className='form-control bg-transparent'
                                    />
                                    <div className='d-flex flex-wrap justify-content-end mt-6 pb-lg-0'>
                                        <a
                                            href='../../demo31/dist/authentication/layouts/corporate/sign-in.html'
                                            className='btn btn-light me-4'>
                                            Cancel
                                        </a>
                                        <button
                                            type='button'
                                            id='kt_password_reset_submit'
                                            className='btn btn-primary '>
                                            <span className='indicator-label'>
                                                Submit
                                            </span>
                                            <span className='indicator-progress'>
                                                Please wait...
                                                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='w-lg-500px d-flex flex-stack px-10 mx-auto'>
                        <div className='me-10'>
                            <button
                                className='btn btn-flex btn-link btn-color-gray-700 btn-active-color-primary rotate fs-base'
                                data-kt-menu-trigger='click'
                                data-kt-menu-placement='bottom-start'
                                data-kt-menu-offset='0px, 0px'>
                                <img
                                    data-kt-element='current-lang-flag'
                                    className='w-20px h-20px rounded me-3'
                                    src='assets/media/flags/united-states.svg'
                                    alt=''
                                />
                                <span
                                    data-kt-element='current-lang-name'
                                    className='me-1'>
                                    English
                                </span>
                                <i className='ki-outline ki-down fs-5 text-muted rotate-180 m-0'></i>
                            </button>
                            <div
                                className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px py-4 fs-7'
                                data-kt-menu='true'
                                id='kt_auth_lang_menu'></div>
                        </div>
                        <div className='d-flex fw-semibold text-primary fs-base gap-5'>
                            <a
                                href='../../demo31/dist/pages/team.html'
                                target='_blank'>
                                Terms
                            </a>
                            <a
                                href='../../demo31/dist/pages/pricing/column.html'
                                target='_blank'>
                                Plans
                            </a>
                            <a
                                href='../../demo31/dist/pages/contact.html'
                                target='_blank'>
                                Contact Us
                            </a>
                        </div>
                    </div>
                </div>
                {/* second group */}
                <Poster />
            </div>
        </div>
    );
};

export default ForgetPassword;
