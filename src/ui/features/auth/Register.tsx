import { useState } from "react";
import CompanyLogo from "../../../assets/media/svg/CompanyLogo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { EyeSlash, Eye } from "react-bootstrap-icons";
import { UserRegisterSchema } from "../../../validations/auth.validators";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { PublicAxios } from "../../../service/AxiosInstance";
import API_ROUTE from "../../../service/api";
import { ToastContainer, toast } from "react-toastify";
import { IResponse } from "../../../types/axios.type";
import { IUserResponseResponse } from "../../../types/payload.type";
import { AxiosError } from "axios";

interface FormData {
    first_name: string;
    last_name: string;
    mobile: string;
    email: string;
    password: string;
    password_confirmation: string;
    isTermAndConditionAccepted: boolean;
}

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // send request to server
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(UserRegisterSchema),
    });
    const onFormSubmit = handleSubmit(async (data: FormData) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { isTermAndConditionAccepted, ...rest } = data;
        try {
            const response = await PublicAxios.post<
                IResponse<IUserResponseResponse>
            >(API_ROUTE.USER_REGISTER, rest);

            console.log(response.data, "response.data");

            if (response.data.status === "ok") {
                navigate("/auth/login");
            }
        } catch (error) {
            const err = error as AxiosError;

            console.log(error?.response?.data?.message);
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message);
            } else {
                toast.error("Something went wrong");
            }
        }
    });

    return (
        <div
            className='d-flex  align-items-center justify-content-center w-100 h-100 flex-column flex-root'
            id='kt_app_root'>
            <div className='d-flex flex-column flex-lg-row flex-column-fluid '>
                <div className=' d-flex flex-column flex-lg-row-fluid w-lg-50 p-6 order-2 order-lg-1 '>
                    <div className='d-flex flex-center flex-column flex-lg-row-fluid'>
                        <div className='card shadow shadow-sm p-6'>
                            <form
                                onSubmit={onFormSubmit}
                                className='form w-100'
                                id='kt_sign_up_form'
                                data-kt-redirect-url='../../demo31/dist/authentication/layouts/corporate/sign-in.html'
                                action='#'>
                                <div className='row mb-6'>
                                    <div className='col-12 col-md-2'>
                                        <img
                                            className='mb-4'
                                            src={CompanyLogo}
                                            alt='Company Logo'
                                        />
                                    </div>
                                    <div className='col-12 col-md-10'>
                                        <h1 className='text-dark fw-bolder mb-2'>
                                            Create Your Account First
                                        </h1>
                                        <p className='text-muted '>
                                            Start your trial for 10 more days
                                        </p>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-12 col-md-6'>
                                        <label
                                            className='form-label'
                                            htmlFor='first_name'>
                                            First Name
                                            <span>*</span>
                                        </label>
                                        <div className='fv-row mb-6'>
                                            <input
                                                type='text'
                                                placeholder='Full Name'
                                                className='form-control'
                                                {...register("first_name")}
                                            />
                                            <p className='text-danger mt-1'>
                                                {errors.first_name?.message}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-6'>
                                        <label
                                            className='form-label'
                                            htmlFor='last_name'>
                                            Last Name
                                            <span>*</span>
                                        </label>
                                        <div className='fv-row mb-6'>
                                            <input
                                                type='text'
                                                placeholder='Last Name'
                                                className='form-control'
                                                {...register("last_name")}
                                            />
                                            <p className='text-danger mt-1'>
                                                {errors.last_name?.message}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-6'>
                                        <label
                                            className='form-label'
                                            htmlFor='Email'>
                                            Email
                                            <span>*</span>
                                        </label>
                                        <div className='fv-row mb-6'>
                                            <input
                                                type='text'
                                                placeholder='Email'
                                                className='form-control '
                                                {...register("email")}
                                            />
                                            <p className='text-danger mt-1'>
                                                {errors.email?.message}
                                            </p>
                                        </div>
                                    </div>

                                    <div className='col-12 col-md-6'>
                                        <label
                                            className='form-label'
                                            htmlFor='first_name'>
                                            Mobile Number
                                        </label>
                                        <div className='fv-row mb-6'>
                                            <input
                                                type='number'
                                                placeholder='Enter your Mobile Number'
                                                className='form-control'
                                                {...register("mobile")}
                                            />
                                            <p className='text-danger mt-1'>
                                                {errors.mobile?.message}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-6'>
                                        <div
                                            className='fv-row mb-8'
                                            data-kt-password-meter='true'>
                                            <label
                                                className='form-label'
                                                htmlFor='password'>
                                                Password<span>*</span>
                                            </label>
                                            <div className='mb-1'>
                                                <div className='position-relative mb-3'>
                                                    <input
                                                        className='form-control bg-transparent'
                                                        type={
                                                            showPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        {...register(
                                                            "password"
                                                        )}
                                                        placeholder='Password'
                                                    />
                                                    <span
                                                        onClick={() =>
                                                            setShowPassword(
                                                                (prev) => !prev
                                                            )
                                                        }
                                                        className='btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2'>
                                                        {showPassword ? (
                                                            <Eye size={16} />
                                                        ) : (
                                                            <EyeSlash
                                                                size={16}
                                                            />
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                            <p className='text-danger mt-1'>
                                                {errors.password?.message}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-6'>
                                        <div
                                            className='fv-row mb-8'
                                            data-kt-password-meter='true'>
                                            <label
                                                className='form-label'
                                                htmlFor='confrimPassword'>
                                                Confirm Password<span>*</span>
                                            </label>
                                            <div className='mb-1'>
                                                <div className='position-relative mb-3'>
                                                    <input
                                                        className='form-control bg-transparent'
                                                        type={
                                                            showConfirmPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        {...register(
                                                            "password_confirmation"
                                                        )}
                                                        placeholder='Enter your Password again'
                                                    />
                                                    <span
                                                        onClick={() =>
                                                            setShowConfirmPassword(
                                                                (prev) => !prev
                                                            )
                                                        }
                                                        className='btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2'>
                                                        {showPassword ? (
                                                            <Eye size={16} />
                                                        ) : (
                                                            <EyeSlash
                                                                size={16}
                                                            />
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                            <p className='text-danger mt-1'>
                                                {
                                                    errors.password_confirmation
                                                        ?.message
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    <div className='col-12 col-md-6'>
                                        <div className='fv-row mb-6'>
                                            <label className='form-check form-check-inline'>
                                                <input
                                                    className='form-check-input'
                                                    type='checkbox'
                                                    value='true'
                                                    {...register(
                                                        "isTermAndConditionAccepted",
                                                        {
                                                            setValueAs: (
                                                                value
                                                            ) => value === true,
                                                        }
                                                    )}
                                                />
                                                <span className='form-check-label fw-semibold text-gray-700 fs-base ms-1'>
                                                    I Accept the
                                                    <a
                                                        href='#'
                                                        className='ms-1 link-primary'>
                                                        Terms
                                                    </a>
                                                    &
                                                    <a
                                                        href='#'
                                                        className='ms-1 link-primary'>
                                                        Conditions.
                                                    </a>
                                                </span>
                                            </label>
                                            <p className='text-danger mt-1'>
                                                {
                                                    errors
                                                        .isTermAndConditionAccepted
                                                        ?.message
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-6'>
                                        <button
                                            type='submit'
                                            className='btn btn-success btn-lg float-end'>
                                            Sign up
                                        </button>
                                    </div>
                                    <div className='col-12'>
                                        <div className='text-gray-500 mt-6 fw-semibold fs-6 float-end'>
                                            Already have an Account?&nbsp;
                                            <Link
                                                to='/auth/login'
                                                className='link-primary fw-semibold'>
                                                Sign in
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;
