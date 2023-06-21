import FacebookLogo from "../../../assets/media/svg/Facebook.svg";
import GoogleLogo from "../../../assets/media/svg/Google.svg";
import RegisterLogo from "../../../assets/media/svg/RegisterLogo.svg";
import CompanyLogo from "../../../assets/media/svg/CompanyLogo.svg";

const Register = () => {
    return (
        <div className='d-flex flex-column flex-root' id='kt_app_root'>
            <div className='d-flex flex-column flex-lg-row flex-column-fluid '>
                <div className='d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1 '>
                    <div className='d-flex flex-center flex-column flex-lg-row-fluid'>
                        <div className='w-lg-500px p-10'>
                            <form
                                className='form w-100'
                                id='kt_sign_up_form'
                                data-kt-redirect-url='../../demo31/dist/authentication/layouts/corporate/sign-in.html'
                                action='#'>
                                <div className=' mb-6'>
                                    <div>
                                        <img
                                            className='mb-4'
                                            src={CompanyLogo}
                                            alt='Company Logo'
                                        />
                                    </div>
                                    <h1 className='text-dark fw-bolder mb-2'>
                                        Create Your Account First
                                    </h1>
                                    <p className='text-muted '>
                                        Start your trial for 10 more days
                                    </p>
                                </div>
                                <div className='row g-3 mb-9'>
                                    <div className='col-md-6'>
                                        <a
                                            href='#'
                                            className='btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100'>
                                            <img
                                                alt='Google Logo'
                                                src={GoogleLogo}
                                                className='h-15px me-3'
                                            />
                                            Sign in with Google
                                        </a>
                                    </div>
                                    <div className='col-md-6'>
                                        <a
                                            href='#'
                                            className='btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100'>
                                            <img
                                                alt='Facebook Logo'
                                                src={FacebookLogo}
                                                className='h-15px me-3'
                                            />
                                            Sign in with Facebook
                                        </a>
                                    </div>
                                </div>
                                <div className='separator separator-content my-3'>
                                    <span className='w-125px text-gray-500 fw-semibold fs-7'>
                                        Or with email
                                    </span>
                                </div>
                                <div className='fv-row mb-6'>
                                    <input
                                        type='text'
                                        placeholder='Full Name'
                                        name='fullName'
                                        className='form-control bg-transparent'
                                    />
                                </div>
                                <div className='fv-row mb-6'>
                                    <input
                                        type='text'
                                        placeholder='Email'
                                        name='email'
                                        autoComplete='off'
                                        className='form-control bg-transparent'
                                    />
                                </div>
                                <div
                                    className='fv-row mb-8'
                                    data-kt-password-meter='true'>
                                    <div className='mb-1'>
                                        <div className='position-relative mb-3'>
                                            <input
                                                className='form-control bg-transparent'
                                                type='password'
                                                placeholder='Password'
                                                name='password'
                                                autoComplete='off'
                                            />
                                            <span
                                                className='btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2'
                                                data-kt-password-meter-control='visibility'>
                                                <i className='ki-outline ki-eye-slash fs-2'></i>
                                                <i className='ki-outline ki-eye fs-2 d-none'></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className='fv-row mb-6'>
                                    <input
                                        placeholder='Repeat Password'
                                        name='confirm-password'
                                        type='password'
                                        autoComplete='off'
                                        className='form-control bg-transparent'
                                    />
                                </div>
                                <div className='fv-row mb-6'>
                                    <label className='form-check form-check-inline'>
                                        <input
                                            className='form-check-input'
                                            type='checkbox'
                                            name='toc'
                                            value='1'
                                        />
                                        <span className='form-check-label fw-semibold text-gray-700 fs-base ms-1'>
                                            I Accept the
                                            <a
                                                href='#'
                                                className='ms-1 link-primary'>
                                                Terms
                                            </a>
                                        </span>
                                    </label>
                                </div>
                                <div className='d-grid mb-4'>
                                    <button
                                        type='submit'
                                        id='kt_sign_up_submit'
                                        className='btn btn-success'>
                                        <span className='indicator-label'>
                                            Sign up
                                        </span>
                                        <span className='indicator-progress'>
                                            Please wait...
                                            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                        </span>
                                    </button>
                                </div>
                                <div className='text-gray-500 text-center fw-semibold fs-6'>
                                    Already have an Account?
                                    <a
                                        href='../../demo31/dist/authentication/layouts/corporate/sign-in.html'
                                        className='link-primary fw-semibold'>
                                        Sign in
                                    </a>
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
                <div
                    className='d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2'

                    // style='background-image: url(assets/media/misc/auth-bg.png)'
                >
                    <div className='d-flex flex-column flex-center py-7 py-lg-15 px-5 px-md-15 w-100'>
                        <img
                            className='d-none d-lg-block mx-auto h-md-300px w-275px w-md-50 w-xl-500px mb-10 mb-lg-20'
                            alt='Logo'
                            src={RegisterLogo}
                        />
                        <h1 className='d-none d-lg-block text-white fs-2qx fw-bolder text-center mb-7'>
                            Fast, Efficient and Productive
                        </h1>
                        <div className='d-none d-lg-block text-white fs-base text-center'>
                            In this kind of post,
                            <a
                                href='#'
                                className='opacity-75-hover text-warning fw-bold me-1'>
                                the blogger
                            </a>
                            introduces a person they’ve interviewed
                            <br />
                            and provides some background information about
                            <a
                                href='#'
                                className='opacity-75-hover text-warning fw-bold me-1'>
                                the interviewee
                            </a>
                            and their
                            <br />
                            work following this is a transcript of the
                            interview.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
