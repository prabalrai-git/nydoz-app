import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { EyeSlash, Eye } from "react-bootstrap-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import FacebookLogo from "../../../assets/media/svg/Facebook.svg";
import GoogleLogo from "../../../assets/media/svg/Google.svg";
import CompanyLogo from "../../../assets/media/svg/CompanyLogo.svg";
import Poster from "./Poster";

import { LoginSchema } from "../../../validations/auth.validators";

interface FormData {
    email: string;
    password: string;
}

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(LoginSchema),
    });
    const onFormSubmit = handleSubmit((data: FormData) => {
        console.log(data);
    });

    return (
        <div className='d-flex flex-column flex-root' id='kt_app_root'>
            <div className='d-flex flex-column flex-lg-row flex-column-fluid '>
                {/* first Side group */}
                <div className='card shadow m-1 m-md-3 d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1 '>
                    <div className='d-flex flex-center flex-column flex-lg-row-fluid'>
                        <div className='w-lg-500px p-10'>
                            <form
                                className='form w-100'
                                id='kt_sign_up_form'
                                onSubmit={onFormSubmit}>
                                <div className=' mb-6'>
                                    <div className='text-center'>
                                        <img
                                            className='mb-4'
                                            src={CompanyLogo}
                                            alt='Company Logo'
                                        />
                                    </div>
                                    <h1 className='text-dark fw-bolder mb-2'>
                                        Login
                                    </h1>
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
                                <div className='separator separator-content my-6'>
                                    <span className='w-125px text-gray-500 fw-semibold fs-7'>
                                        Or with email
                                    </span>
                                </div>

                                <div className='fv-row mb-6'>
                                    <input
                                        type='text'
                                        placeholder='Email'
                                        {...register("email")}
                                        className='form-control bg-transparent'
                                    />
                                    <p className='text-danger mt-1'>
                                        {errors.email?.message}
                                    </p>
                                </div>
                                <div
                                    className='fv-row mb-8'
                                    data-kt-password-meter='true'>
                                    <div className='mb-1'>
                                        <div className='position-relative mb-3'>
                                            <input
                                                className='form-control bg-transparent'
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder='Password'
                                                {...register("password")}
                                            />
                                            <span
                                                onClick={() =>
                                                    setShowPassword(
                                                        (prev) => !prev
                                                    )
                                                }
                                                className='btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2'>
                                                {showPassword ? (
                                                    <EyeSlash size={16} />
                                                ) : (
                                                    <Eye size={16} />
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <p className='text-danger mt-1'>
                                        {errors.password?.message}
                                    </p>
                                </div>

                                <div className='d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8'>
                                    <div></div>
                                    <Link
                                        to={"/auth/forgot-password"}
                                        className='link-primary'>
                                        Forgot Password ?
                                    </Link>
                                </div>

                                <div className='d-grid mb-10'>
                                    <button
                                        type='submit'
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

                                <div className='text-gray-500 text-center fw-semibold fs-6'>
                                    Don't have an account?&nbsp;
                                    <Link
                                        to='/auth/signup'
                                        className='link-primary fw-semibold'>
                                        Sign Up
                                    </Link>
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

export default LoginPage;
