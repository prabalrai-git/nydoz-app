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
import { AuthContext } from "../../../context/AuthContext";
import { IUserState, ILoginResponse } from "../../../types/payload.type";

interface FormData {
    email: string;
    password: string;
}

const LoginPage = () => {
    const { loginFn } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState<boolean>(false);

    const { postData, isLoading, error } = useMutation<ILoginResponse>(
        API_ROUTE.LOGIN,
        false
    );
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(LoginSchema),
    });
    const onFormSubmit = handleSubmit(async (data: FormData) => {
        const response = await postData(data);
        if (response?.data?.status === "ok") {
            const user = response?.data?.payload?.user;
            const token = response?.data?.payload?.token;
            const payload: ILoginResponse = {
                user,
                token,
            };
            toast.success(response?.data?.message || "Login Successful");
            loginFn(payload, rememberMe);
            navigate("/");
        } else {
            toast.error(error || "Login Failed");
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
                            <div className=' mb-3'>
                                <div className='text-center'>
                                    <img
                                        className='mb-2'
                                        src={CompanyLogo}
                                        alt='Company Logo'
                                    />
                                </div>
                                <h1 className='text-dark fw-bolder mb-2'>
                                    Login
                                </h1>
                            </div>
                            <div className='row g-3 my-4'>
                                <div className='col-md-6'>
                                    <a
                                        href='#'
                                        className='btn py-2 px-3 bg-light w-100 shadow shadow-sm'>
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
                                        className='btn py-2 px-3 bg-light w-100 shadow shadow-sm'>
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

                            <div className='row mb-3'>
                                <div className='col-6'>
                                    <Link
                                        to={"/auth/forgot-password"}
                                        className='btn text-info w-semibold'>
                                        Forgot Password ?
                                    </Link>
                                </div>
                                <div className='col-6'>
                                    <div className='float-end'>
                                        <label className='form-check form-check-inline'>
                                            <input
                                                className='form-check-input'
                                                type='checkbox'
                                                value='true'
                                                checked={rememberMe}
                                                onChange={() => {
                                                    setRememberMe(
                                                        (prev) => !prev
                                                    );
                                                }}
                                            />
                                            <span className='form-check-label fw-semibold text-gray-700 fs-base mx-1'>
                                                Remember Me
                                            </span>
                                        </label>
                                    </div>
                                </div>
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
                                <span> Don't have an account?</span>
                                <Link
                                    to='/auth/signup'
                                    className='btn text-info fw-semibold'>
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
