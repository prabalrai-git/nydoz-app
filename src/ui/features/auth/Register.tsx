import { useState } from "react";
import CompanyLogo from "../../../assets/media/svg/CompanyLogo.svg";
import { Link, useNavigate } from "react-router-dom";
import { EyeSlash, Eye } from "react-bootstrap-icons";
import { UserRegisterSchema } from "../../../validations/auth.validators";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useMutation from "../../../hooks/useMutation";
import API_ROUTE from "../../../service/api";
import { toast } from "react-toastify";
import { IUserResponseResponse } from "../../../types/payload.type";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

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
    const { postData, error, isLoading } = useMutation<IUserResponseResponse>(
        API_ROUTE.USER_REGISTER,
        false
    );
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    if (error) {
        toast.error(error || "Something went wrong");
    }

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
        const response = await postData(rest);
        console.log(response);

        if (response?.status === 201) {
            toast.success("Account Created Successfully");
            navigate("/auth/login");
        }
    });

    return (
        <div
            className='container pt-4 d-flex  align-items-center justify-content-center w-100 h-100 flex-column flex-root p-4'
            id='kt_app_root'>
            <div className='d-flex flex-column flex-lg-row flex-column-fluid '>
                <div className=' d-flex flex-column flex-lg-row-fluid w-lg-50 p-6 order-2 order-lg-1 '>
                    <div className='d-flex flex-center flex-column flex-lg-row-fluid'>
                        <div className='card shadow shadow-sm p-6'>
                            <form
                                onSubmit={onFormSubmit}
                                className='form w-100 p-4'
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
                                        <h3 className='text-dark fw-bolder mb-2'>
                                            Create Your Account First
                                        </h3>
                                        <p className='text-muted '>
                                            Start your trial for 10 more days
                                        </p>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-12 col-md-6'>
                                        <label
                                            className='form-label required'
                                            htmlFor='first_name'>
                                            First Name
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
                                            className='form-label required'
                                            htmlFor='last_name'>
                                            Last Name
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
                                            className='form-label required'
                                            htmlFor='Email'>
                                            Email
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
                                            className='form-label required'
                                            htmlFor='mobile_number'>
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
                                                className='form-label required'
                                                htmlFor='password'>
                                                Password
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
                                                className='form-label required'
                                                htmlFor='confrimPassword'>
                                                Confirm Password
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

                                    <div className='col-12 col-md-6 mb-3'>
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
                                                        className='ms-1 link-primary text-decoration-none'>
                                                        Terms
                                                    </a>
                                                    &
                                                    <a
                                                        href='#'
                                                        className='ms-1 link-primary text-decoration-none'>
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
                                    <div className='col-12 col-md-6 mb-3'>
                                        <Button
                                            variant='primary'
                                            type='submit'
                                            className='w-100'>
                                            {isLoading ? (
                                                <>
                                                    <span className='ms-2'>
                                                        Please Wait...
                                                    </span>
                                                    <Spinner
                                                        size='sm'
                                                        animation='border'
                                                        role='status'></Spinner>
                                                </>
                                            ) : (
                                                <span>Submit</span>
                                            )}
                                        </Button>
                                    </div>
                                    <div className='col-12'>
                                        <div className='text-gray-500 mt-6 fw-semibold fs-6 float-end'>
                                            Already have an Account ?&nbsp;
                                            <Link
                                                to='/auth/login'
                                                className='ms-1 link-primary text-decoration-none'>
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
        </div>
    );
};

export default Register;
