import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { EyeSlash, Eye } from "react-bootstrap-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import CompanyLogo from "../../../assets/media/svg/CompanyLogo.svg";
import API_ROUTE from "../../../service/api";
import { LoginSchema } from "../../../validations/auth.validators";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import useMutation from "../../../hooks/useMutation";
import { toast } from "react-toastify";
// import { AuthContext } from "../../../context/AuthContext";
import { ILoginResponse } from "../../../types/auth.type";
import AuthContext from "../../../context/auth/AuthContext";
// import useSubdomain from "../../../hooks/useSubdomain";
// import APP_SETTING from "../../../config/AppSetting";
interface FormData {
    email: string;
    password: string;
}

const LoginPage = () => {
    const { dispatch } = useContext(AuthContext);
    // const subdomain = useSubdomain();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const rememberMe = true;
    const navigate = useNavigate();
    // const { MODE, VITE_HOST } = APP_SETTING;
    const { postData, isLoading, error } = useMutation<ILoginResponse>(
        API_ROUTE.LOGIN,
        false
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(LoginSchema),
    });

    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    const onFormSubmit = handleSubmit(async (data: FormData) => {
        const response = await postData(data);
        if (response?.data?.status === "ok") {
            const user = response?.data?.payload?.user;
            const token = response?.data?.payload?.token;

            if (!user || !token) return toast.error("Login Failed");
            toast.success(response?.data?.message || "Login Successful");
            localStorage.setItem("rememberMe", rememberMe.toString());
            if (rememberMe) {
                localStorage.setItem("token", token);
            } else {
                sessionStorage.setItem("token", token);
            }
            const payload: ILoginResponse = {
                user: user,
                token: token,
            };
            // loginFn(payload, rememberMe);
            dispatch({
                type: "LOGIN",
                payload: { userInfo: payload.user, token: payload.token },
            });

            navigate("/workspace", { replace: true });
        }
    });

    return (
        <div className='container pt-4' id='kt_app_root '>
            <div className='row '>
                <div className='col-12  col-md-8 col-lg-6  offset-0 offset-md-2 offset-lg-3 '>
                    <div className='card shadow shadow-sm p-3 mt-4'>
                        <div className='card-body'>
                            <div className='row mb-3'>
                                <div className='col-12 text-center mb-6'>
                                    <Link to={"/"}>
                                        <img
                                            className='mb-2'
                                            src={CompanyLogo}
                                            alt='Company Logo'
                                        />
                                    </Link>
                                </div>
                                <div className='col-12'>
                                    <h5 className='text-dark fw-bolder'>
                                        Welcome to Nydoz Invest Family
                                    </h5>
                                    <p>
                                        Start your investment and grow with us.
                                    </p>
                                </div>
                            </div>
                            <form
                                className='form w-100 '
                                id='kt_sign_up_form'
                                onSubmit={onFormSubmit}>
                                <div className='fv-row mb-6'>
                                    <label
                                        className='required mb-2'
                                        htmlFor='email'>
                                        Email
                                    </label>
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
                                    className='fv-row mb-6'
                                    data-kt-password-meter='true'>
                                    <div className='mb-1'>
                                        <label
                                            className='required mb-2'
                                            htmlFor='password'>
                                            Password
                                        </label>
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
                                                {!showPassword ? (
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

                                <div className='flex-center justify-content-between mb-1'>
                                    <div>
                                        <Link
                                            to={"/auth/forgot-password"}
                                            className='btn text-info w-semibold px-2'>
                                            Forgot Password ?
                                        </Link>
                                    </div>
                                </div>

                                <div className='col-12 col-md-12 mb-3'>
                                    <Button
                                        variant='primary'
                                        type='submit'
                                        className=' float-end w-100'>
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
                                    <div className='my-2 float-end'>
                                        <span> Don't have an account?</span>
                                        <Link
                                            to='/auth/signup'
                                            className='ms-1 link-primary text-decoration-none'>
                                            Sign Up
                                        </Link>
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

export default LoginPage;
