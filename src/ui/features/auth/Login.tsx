import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { EyeSlash, Eye } from "react-bootstrap-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import FacebookLogo from "../../../assets/media/svg/Facebook.svg";
import GoogleLogo from "../../../assets/media/svg/Google.svg";
import CompanyLogo from "../../../assets/media/svg/CompanyLogo.svg";
import API_ROUTE from "../../../service/api";
import { LoginSchema } from "../../../validations/auth.validators";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import useMutation from "../../../hooks/useMutation";
import { ToastContainer, toast } from "react-toastify";

interface FormData {
    email: string;
    password: string;
}

const LoginPage = () => {
    const { postData, data, isLoading, error } = useMutation(
        API_ROUTE.LOGIN,
        false
    );
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(LoginSchema),
    });
    const onFormSubmit = handleSubmit(async (data: FormData) => {
        const response = await postData(data);
        console.log(response);
        if (response && response?.data?.status === "ok") {
            const msg =
                (response?.data?.message as string) ||
                "User logged In Successfully";
            toast.success(msg);
            const payload = response?.data?.payload;

            navigate("/auth/login");
        } else {
            console.log("login", error);
            toast.error(error as unknown as string);
        }
    });

    return (
        <div className='container ' id='kt_app_root'>
            <div className='row h-100vh '>
                <div className='col-12  col-md-6  offset-0 offset-md-3 '>
                    <div className='card shadow shadwo-sm p-3 mt-4'>
                        <form
                            className='form w-100 '
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
                                                setShowPassword((prev) => !prev)
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

                            <div className='col-12 col-md-12 mb-3'>
                                <Button
                                    variant='primary'
                                    type='submit'
                                    className='float-end'>
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

                            <div className='col-12 col-md-12'>
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
            </div>
            <ToastContainer />
        </div>
    );
};

export default LoginPage;
