import CompanyLogo from "../../../assets/media/svg/CompanyLogo.svg";
import Poster from "./Poster";

const ResetPassword = () => {
    return (
        <div className='d-flex flex-column flex-root' id='kt_app_root'>
            <div className='d-flex flex-column flex-lg-row flex-column-fluid '>
                {/* first Side group */}
                <div className='card shadow m-1 m-md-3 d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1 '>
                    <div className='d-flex flex-center flex-column flex-lg-row-fluid'>
                        <div className='w-lg-500px p-10'>
                            <form
                                className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
                                id='kt_new_password_form'>
                                <div className='text-center mb-10'>
                                    <img
                                        src={CompanyLogo}
                                        alt='Company Logo'
                                        className='mb-3'
                                    />
                                    <h1 className='text-dark fw-bolder mb-3'>
                                        Setup New Password
                                    </h1>
                                </div>
                                <div
                                    className='fv-row mb-8 fv-plugins-icon-container'
                                    data-kt-password-meter='true'>
                                    <div className='mb-1'>
                                        <div className='position-relative mb-3'>
                                            <input
                                                className='form-control bg-transparent'
                                                type='password'
                                                placeholder='Password'
                                                name='password'
                                            />
                                            <span
                                                className='btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2'
                                                data-kt-password-meter-control='visibility'>
                                                <i className='ki-outline ki-eye-slash fs-2'></i>
                                                <i className='ki-outline ki-eye fs-2 d-none'></i>
                                            </span>
                                        </div>
                                        <div
                                            className='d-flex align-items-center mb-3'
                                            data-kt-password-meter-control='highlight'>
                                            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
                                            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
                                            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
                                            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px'></div>
                                        </div>
                                    </div>
                                    <div className='text-muted'>
                                        Use 8 or more characters with a mix of
                                        letters, numbers &amp; symbols.
                                    </div>
                                    <div className='fv-plugins-message-container invalid-feedback'></div>
                                </div>
                                <div className='fv-row mb-8 fv-plugins-icon-container'>
                                    <input
                                        type='password'
                                        placeholder='Repeat Password'
                                        name='confirm-password'
                                        className='form-control bg-transparent'
                                    />
                                    <div className='fv-plugins-message-container invalid-feedback'></div>
                                </div>
                                <div className='fv-row mb-8 fv-plugins-icon-container'>
                                    <label className='form-check form-check-inline'>
                                        <input
                                            className='form-check-input'
                                            type='checkbox'
                                            name='toc'
                                            value='1'
                                        />
                                        <span className='form-check-label fw-semibold text-gray-700 fs-6 ms-1'>
                                            I Agree &amp;
                                            <a
                                                href='#'
                                                className='ms-1 link-primary'>
                                                Terms and conditions
                                            </a>
                                            .
                                        </span>
                                    </label>
                                    <div className='fv-plugins-message-container invalid-feedback'></div>
                                </div>
                                <div className='d-grid mb-10'>
                                    <button
                                        type='button'
                                        id='kt_new_password_submit'
                                        className='btn btn-primary'>
                                        <span className='indicator-label'>
                                            Submit
                                        </span>
                                        <span className='indicator-progress'>
                                            Please wait...
                                            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                        </span>
                                    </button>
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
                                    alt='edrerwe'
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
                                id='kt_auth_lang_menu'>
                                <div className='menu-item px-3'>
                                    <a
                                        href='#'
                                        className='menu-link d-flex px-5'
                                        data-kt-lang='English'>
                                        <span className='symbol symbol-20px me-4'>
                                            <img
                                                data-kt-element='lang-flag'
                                                className='rounded-1'
                                                src='assets/media/flags/united-states.svg'
                                                alt=''
                                            />
                                        </span>
                                        <span data-kt-element='lang-name'>
                                            English
                                        </span>
                                    </a>
                                </div>
                                <div className='menu-item px-3'>
                                    <a
                                        href='#'
                                        className='menu-link d-flex px-5'
                                        data-kt-lang='Spanish'>
                                        <span className='symbol symbol-20px me-4'>
                                            <img
                                                data-kt-element='lang-flag'
                                                className='rounded-1'
                                                src='assets/media/flags/spain.svg'
                                                alt=''
                                            />
                                        </span>
                                        <span data-kt-element='lang-name'>
                                            Spanish
                                        </span>
                                    </a>
                                </div>
                                <div className='menu-item px-3'>
                                    <a
                                        href='#'
                                        className='menu-link d-flex px-5'
                                        data-kt-lang='German'>
                                        <span className='symbol symbol-20px me-4'>
                                            <img
                                                data-kt-element='lang-flag'
                                                className='rounded-1'
                                                src='assets/media/flags/germany.svg'
                                                alt=''
                                            />
                                        </span>
                                        <span data-kt-element='lang-name'>
                                            German
                                        </span>
                                    </a>
                                </div>
                                <div className='menu-item px-3'>
                                    <a
                                        href='#'
                                        className='menu-link d-flex px-5'
                                        data-kt-lang='Japanese'>
                                        <span className='symbol symbol-20px me-4'>
                                            <img
                                                data-kt-element='lang-flag'
                                                className='rounded-1'
                                                src='assets/media/flags/japan.svg'
                                                alt=''
                                            />
                                        </span>
                                        <span data-kt-element='lang-name'>
                                            Japanese
                                        </span>
                                    </a>
                                </div>
                                <div className='menu-item px-3'>
                                    <a
                                        href='#'
                                        className='menu-link d-flex px-5'
                                        data-kt-lang='French'>
                                        <span className='symbol symbol-20px me-4'>
                                            <img
                                                data-kt-element='lang-flag'
                                                className='rounded-1'
                                                src='assets/media/flags/france.svg'
                                                alt=''
                                            />
                                        </span>
                                        <span data-kt-element='lang-name'>
                                            French
                                        </span>
                                    </a>
                                </div>
                            </div>
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

export default ResetPassword;
