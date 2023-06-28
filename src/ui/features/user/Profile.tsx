import { useState } from "react";
import CompanyLogo from "../../../assets/media/svg/CompanyLogo.svg";
import { Link } from "react-router-dom";
import { EyeSlash, Eye } from "react-bootstrap-icons";
import CountryCode from "../../shared/atoms/CountryCode";
import { ISelectProps } from "../../../types/react-select.type";
// import { UserRegisterSchema } from "../../../validations/auth.validators";
// import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

interface FormData {
    first_name: string;
    last_name: string;
    mobile: string;
    email: string;
    password: string;
    password_confirmation: string;
    secondary_email: string;
    state: string;
    city: string;
    street_address: string;
    postal_code: string;
}

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [selectedCountryCode, setSelectedCountryCode] = useState<
        ISelectProps | undefined
    >();
    const [selectedCountry, setSelectedCountry] = useState<
        ISelectProps | undefined
    >();

    // send request to server
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const onFormSubmit = handleSubmit((data: FormData) => {
        console.log(data);
    });

    return (
        <div
            className='d-flex  align-items-center justify-content-center w-100 h-100 flex-column flex-root'
            id='kt_app_root'>
            <div className='d-flex flex-column flex-lg-row flex-column-fluid '>
                <div className=' d-flex flex-column flex-lg-row-fluid w-lg-50 p-6 order-2 order-lg-1 '>
                    <div className='d-flex flex-center flex-column flex-lg-row-fluid'>
                        <div className=' p-6'>
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

                                {/* social login start */}
                                {/* <div className='row g-3 mb-9'>
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
                                <div className='separator separator-content m-6'>
                                    <span className='w-125px text-gray-500 fw-semibold fs-7'>
                                        Or with email
                                    </span>
                                </div> */}

                                {/* social login end */}
                                <div className='row'>
                                    <div className='col-12 col-md-6'>
                                        <label
                                            className='form-label'
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
                                            className='form-label'
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
                                                {errors.first_name?.message}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-6'>
                                        <label
                                            className='form-label'
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
                                            className='form-label'
                                            htmlFor='Email'>
                                            Secondary Email
                                        </label>
                                        <div className='fv-row mb-6'>
                                            <input
                                                type='text'
                                                placeholder='Secondary Email'
                                                className='form-control '
                                            />
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-6'>
                                        <label
                                            className='form-label'
                                            htmlFor='first_name'>
                                            Country Calling Code
                                        </label>
                                        <div className='fv-row mb-6'>
                                            <CountryCode
                                                selectValue={
                                                    selectedCountryCode
                                                }
                                                setSelectValue={
                                                    setSelectedCountryCode
                                                }
                                                placeholder='Select Country Code'
                                            />
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
                                            />
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-6'>
                                        <div
                                            className='fv-row mb-8'
                                            data-kt-password-meter='true'>
                                            <label
                                                className='form-label'
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
                                            {/* <p className='text-danger mt-1'>
                                                {errors.password?.message}
                                            </p> */}
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-6'>
                                        <div
                                            className='fv-row mb-8'
                                            data-kt-password-meter='true'>
                                            <label
                                                className='form-label'
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
                                            {/* <p className='text-danger mt-1'>
                                                {errors.password?.message}
                                            </p> */}
                                        </div>
                                    </div>

                                    <div className='col-12 col-md-6'>
                                        <label
                                            className='form-label'
                                            htmlFor='first_name'>
                                            Street Address
                                        </label>
                                        <div className='fv-row mb-6'>
                                            <input
                                                type='number'
                                                placeholder='Enter your street address'
                                                className='form-control'
                                            />
                                        </div>
                                    </div>

                                    <div className='col-12 col-md-6'>
                                        <label
                                            className='form-label'
                                            htmlFor='first_name'>
                                            City
                                        </label>
                                        <div className='fv-row mb-6'>
                                            <input
                                                type='text'
                                                placeholder='Enter your city name'
                                                className='form-control'
                                            />
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-6'>
                                        <label
                                            className='form-label'
                                            htmlFor='first_name'>
                                            State
                                        </label>
                                        <div className='fv-row mb-6'>
                                            <input
                                                type='number'
                                                placeholder='Enter your state'
                                                className='form-control'
                                            />
                                        </div>
                                    </div>

                                    <div className='col-12 col-md-6'>
                                        <label
                                            className='form-label'
                                            htmlFor='first_name'>
                                            Country
                                        </label>
                                        <div className='fv-row mb-6'>
                                            <CountryCode
                                                selectValue={selectedCountry}
                                                setSelectValue={
                                                    setSelectedCountry
                                                }
                                                forCountry={true}
                                                placeholder='Select Country '
                                            />
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-6'>
                                        <label
                                            className='form-label'
                                            htmlFor='country'>
                                            Postal Code
                                        </label>
                                        <div className='fv-row mb-6'>
                                            <input
                                                type='text'
                                                placeholder='Enter your postal code'
                                                className='form-control'
                                            />
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-6'>
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
                                    </div>
                                    <div className='col-12'>
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
                                </div>

                                <div className='text-gray-500 text-center fw-semibold fs-6'>
                                    Already have an Account?&nbsp;
                                    <Link
                                        to='/auth/login'
                                        className='link-primary fw-semibold'>
                                        Sign in
                                    </Link>
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
