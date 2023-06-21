import React from "react";

const Register = () => {
    return (
        <div class='d-flex flex-column flex-root' id='kt_app_root'>
            <div class='d-flex flex-column flex-lg-row flex-column-fluid'>
                <div class='d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1'>
                    <div class='d-flex flex-center flex-column flex-lg-row-fluid'>
                        <div class='w-lg-500px p-10'>
                            <form
                                class='form w-100'
                                novalidate='novalidate'
                                id='kt_sign_up_form'
                                data-kt-redirect-url='../../demo31/dist/authentication/layouts/corporate/sign-in.html'
                                action='#'>
                                <div class='text-center mb-11'>
                                    <h1 class='text-dark fw-bolder mb-3'>
                                        Sign Up
                                    </h1>
                                    <div class='text-gray-500 fw-semibold fs-6'>
                                        Your Social Campaigns
                                    </div>
                                </div>
                                <div class='row g-3 mb-9'>
                                    <div class='col-md-6'>
                                        <a
                                            href='#'
                                            class='btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100'>
                                            <img
                                                alt='Logo'
                                                src='assets/media/svg/brand-logos/google-icon.svg'
                                                class='h-15px me-3'
                                            />
                                            Sign in with Google
                                        </a>
                                    </div>
                                    <div class='col-md-6'>
                                        <a
                                            href='#'
                                            class='btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100'>
                                            <img
                                                alt='Logo'
                                                src='assets/media/svg/brand-logos/apple-black.svg'
                                                class='theme-light-show h-15px me-3'
                                            />
                                            <img
                                                alt='Logo'
                                                src='assets/media/svg/brand-logos/apple-black-dark.svg'
                                                class='theme-dark-show h-15px me-3'
                                            />
                                            Sign in with Apple
                                        </a>
                                    </div>
                                </div>
                                <div class='separator separator-content my-14'>
                                    <span class='w-125px text-gray-500 fw-semibold fs-7'>
                                        Or with email
                                    </span>
                                </div>
                                <div class='fv-row mb-8'>
                                    <input
                                        type='text'
                                        placeholder='Email'
                                        name='email'
                                        autocomplete='off'
                                        class='form-control bg-transparent'
                                    />
                                </div>
                                <div
                                    class='fv-row mb-8'
                                    data-kt-password-meter='true'>
                                    <div class='mb-1'>
                                        <div class='position-relative mb-3'>
                                            <input
                                                class='form-control bg-transparent'
                                                type='password'
                                                placeholder='Password'
                                                name='password'
                                                autocomplete='off'
                                            />
                                            <span
                                                class='btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2'
                                                data-kt-password-meter-control='visibility'>
                                                <i class='ki-outline ki-eye-slash fs-2'></i>
                                                <i class='ki-outline ki-eye fs-2 d-none'></i>
                                            </span>
                                        </div>
                                        <div
                                            class='d-flex align-items-center mb-3'
                                            data-kt-password-meter-control='highlight'>
                                            <div class='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
                                            <div class='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
                                            <div class='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
                                            <div class='flex-grow-1 bg-secondary bg-active-success rounded h-5px'></div>
                                        </div>
                                    </div>
                                    <div class='text-muted'>
                                        Use 8 or more characters with a mix of
                                        letters, numbers & symbols.
                                    </div>
                                </div>
                                <div class='fv-row mb-8'>
                                    <input
                                        placeholder='Repeat Password'
                                        name='confirm-password'
                                        type='password'
                                        autocomplete='off'
                                        class='form-control bg-transparent'
                                    />
                                </div>
                                <div class='fv-row mb-8'>
                                    <label class='form-check form-check-inline'>
                                        <input
                                            class='form-check-input'
                                            type='checkbox'
                                            name='toc'
                                            value='1'
                                        />
                                        <span class='form-check-label fw-semibold text-gray-700 fs-base ms-1'>
                                            I Accept the
                                            <a
                                                href='#'
                                                class='ms-1 link-primary'>
                                                Terms
                                            </a>
                                        </span>
                                    </label>
                                </div>
                                <div class='d-grid mb-10'>
                                    <button
                                        type='submit'
                                        id='kt_sign_up_submit'
                                        class='btn btn-primary'>
                                        <span class='indicator-label'>
                                            Sign up
                                        </span>
                                        <span class='indicator-progress'>
                                            Please wait...
                                            <span class='spinner-border spinner-border-sm align-middle ms-2'></span>
                                        </span>
                                    </button>
                                </div>
                                <div class='text-gray-500 text-center fw-semibold fs-6'>
                                    Already have an Account?
                                    <a
                                        href='../../demo31/dist/authentication/layouts/corporate/sign-in.html'
                                        class='link-primary fw-semibold'>
                                        Sign in
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class='w-lg-500px d-flex flex-stack px-10 mx-auto'>
                        <div class='me-10'>
                            <button
                                class='btn btn-flex btn-link btn-color-gray-700 btn-active-color-primary rotate fs-base'
                                data-kt-menu-trigger='click'
                                data-kt-menu-placement='bottom-start'
                                data-kt-menu-offset='0px, 0px'>
                                <img
                                    data-kt-element='current-lang-flag'
                                    class='w-20px h-20px rounded me-3'
                                    src='assets/media/flags/united-states.svg'
                                    alt=''
                                />
                                <span
                                    data-kt-element='current-lang-name'
                                    class='me-1'>
                                    English
                                </span>
                                <i class='ki-outline ki-down fs-5 text-muted rotate-180 m-0'></i>
                            </button>
                            <div
                                class='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px py-4 fs-7'
                                data-kt-menu='true'
                                id='kt_auth_lang_menu'>
                                <div class='menu-item px-3'>
                                    <a
                                        href='#'
                                        class='menu-link d-flex px-5'
                                        data-kt-lang='English'>
                                        <span class='symbol symbol-20px me-4'>
                                            <img
                                                data-kt-element='lang-flag'
                                                class='rounded-1'
                                                src='assets/media/flags/united-states.svg'
                                                alt=''
                                            />
                                        </span>
                                        <span data-kt-element='lang-name'>
                                            English
                                        </span>
                                    </a>
                                </div>
                                <div class='menu-item px-3'>
                                    <a
                                        href='#'
                                        class='menu-link d-flex px-5'
                                        data-kt-lang='Spanish'>
                                        <span class='symbol symbol-20px me-4'>
                                            <img
                                                data-kt-element='lang-flag'
                                                class='rounded-1'
                                                src='assets/media/flags/spain.svg'
                                                alt=''
                                            />
                                        </span>
                                        <span data-kt-element='lang-name'>
                                            Spanish
                                        </span>
                                    </a>
                                </div>
                                <div class='menu-item px-3'>
                                    <a
                                        href='#'
                                        class='menu-link d-flex px-5'
                                        data-kt-lang='German'>
                                        <span class='symbol symbol-20px me-4'>
                                            <img
                                                data-kt-element='lang-flag'
                                                class='rounded-1'
                                                src='assets/media/flags/germany.svg'
                                                alt=''
                                            />
                                        </span>
                                        <span data-kt-element='lang-name'>
                                            German
                                        </span>
                                    </a>
                                </div>
                                <div class='menu-item px-3'>
                                    <a
                                        href='#'
                                        class='menu-link d-flex px-5'
                                        data-kt-lang='Japanese'>
                                        <span class='symbol symbol-20px me-4'>
                                            <img
                                                data-kt-element='lang-flag'
                                                class='rounded-1'
                                                src='assets/media/flags/japan.svg'
                                                alt=''
                                            />
                                        </span>
                                        <span data-kt-element='lang-name'>
                                            Japanese
                                        </span>
                                    </a>
                                </div>
                                <div class='menu-item px-3'>
                                    <a
                                        href='#'
                                        class='menu-link d-flex px-5'
                                        data-kt-lang='French'>
                                        <span class='symbol symbol-20px me-4'>
                                            <img
                                                data-kt-element='lang-flag'
                                                class='rounded-1'
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
                        <div class='d-flex fw-semibold text-primary fs-base gap-5'>
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
                <div
                    class='d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2'
                    style='background-image: url(assets/media/misc/auth-bg.png)'>
                    <div class='d-flex flex-column flex-center py-7 py-lg-15 px-5 px-md-15 w-100'>
                        <a
                            href='../../demo31/dist/index.html'
                            class='mb-0 mb-lg-12'>
                            <img
                                alt='Logo'
                                src='assets/media/logos/custom-1.png'
                                class='h-60px h-lg-75px'
                            />
                        </a>
                        <img
                            class='d-none d-lg-block mx-auto w-275px w-md-50 w-xl-500px mb-10 mb-lg-20'
                            src='assets/media/misc/auth-screens.png'
                            alt=''
                        />
                        <h1 class='d-none d-lg-block text-white fs-2qx fw-bolder text-center mb-7'>
                            Fast, Efficient and Productive
                        </h1>
                        <div class='d-none d-lg-block text-white fs-base text-center'>
                            In this kind of post,
                            <a
                                href='#'
                                class='opacity-75-hover text-warning fw-bold me-1'>
                                the blogger
                            </a>
                            introduces a person they’ve interviewed
                            <br />
                            and provides some background information about
                            <a
                                href='#'
                                class='opacity-75-hover text-warning fw-bold me-1'>
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
