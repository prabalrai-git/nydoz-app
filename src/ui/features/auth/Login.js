import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
import AuthContext from "../../../context/auth/AuthContext";
const LoginPage = () => {
    const { dispatch } = useContext(AuthContext);
    // const subdomain = useSubdomain();
    const [showPassword, setShowPassword] = useState(false);
    const rememberMe = true;
    const navigate = useNavigate();
    // const { MODE, VITE_HOST } = APP_SETTING;
    const { postData, isLoading, error } = useMutation(API_ROUTE.LOGIN, false);
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(LoginSchema),
    });
    useEffect(() => {
        if (error)
            toast.error(error);
    }, [error]);
    const onFormSubmit = handleSubmit(async (data) => {
        const response = await postData(data);
        if (response?.data?.status === "ok") {
            const user = response?.data?.payload?.user;
            const token = response?.data?.payload?.token;
            if (!user || !token)
                return toast.error("Login Failed");
            toast.success(response?.data?.message || "Login Successful");
            localStorage.setItem("rememberMe", rememberMe.toString());
            if (rememberMe) {
                localStorage.setItem("token", token);
                // setTimeout(() => {
                //   window.close();
                // }, 100);
            }
            else {
                sessionStorage.setItem("token", token);
            }
            const payload = {
                user: user,
                token: token,
            };
            // loginFn(payload, rememberMe);
            dispatch({
                type: "LOGIN",
                payload: { userInfo: payload.user, token: payload.token },
            });
            navigate("/", { replace: true });
        }
    });
    // const onFormSubmit = () => {};
    return (_jsx("div", { className: "container pt-4 ", id: "kt_app_root ", children: _jsx("div", { className: "row ", children: _jsx("div", { className: "col-12  col-md-8 col-lg-6  offset-0 offset-md-2 offset-lg-3 ", children: _jsx("div", { className: "card shadow shadow-sm  mt-4", children: _jsxs("div", { className: "card-body ", children: [_jsxs("div", { className: "row mb-3", children: [_jsx("div", { className: "col-12 text-center mb-6", children: _jsx(Link, { to: "/", children: _jsx("img", { className: "mb-2 -tw-ml-1 ", src: CompanyLogo, alt: "Company Logo" }) }) }), _jsxs("div", { className: "col-12", children: [_jsx("h5", { className: "text-dark tw-text-xl fw-bolder", children: "Welcome to Nydoz Invest Family" }), _jsx("p", { className: "tw-my-3", children: "Start your investment and grow with us." })] })] }), _jsxs("form", { className: "form w-100 ", id: "kt_sign_up_form", onSubmit: onFormSubmit, children: [_jsxs("div", { className: "fv-row mb-6", children: [_jsx("label", { className: "required mb-2", htmlFor: "email", children: "Email" }), _jsx("input", { type: "text", placeholder: "Email", ...register("email"), className: "form-control bg-transparent" }), _jsx("p", { className: "text-danger mt-1", children: errors.email?.message })] }), _jsxs("div", { className: "fv-row mb-6", "data-kt-password-meter": "true", children: [_jsxs("div", { className: "mb-1", children: [_jsx("label", { className: "required mb-2", htmlFor: "password", children: "Password" }), _jsxs("div", { className: "position-relative mb-3", children: [_jsx("input", { className: "form-control bg-transparent", type: showPassword ? "text" : "password", placeholder: "Password", ...register("password") }), _jsx("span", { onClick: () => setShowPassword((prev) => !prev), className: "btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2", children: !showPassword ? (_jsx(EyeSlash, { size: 16 })) : (_jsx(Eye, { size: 16 })) })] })] }), _jsx("p", { className: "text-danger mt-1", children: errors.password?.message })] }), _jsx("div", { className: "flex-center justify-content-between mb-1", children: _jsx("div", { children: _jsx(Link, { to: "/auth/forgot-password", className: "btn text-info w-semibold px-2", children: "Forgot Password ?" }) }) }), _jsx("div", { className: "col-12 col-md-12 mb-3", children: _jsx(Button, { variant: "primary", type: "submit", className: " float-end w-100 hover:tw-bg-btnPrimaryHover", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "ms-2", children: "Please Wait..." }), _jsx(Spinner, { size: "sm", animation: "border", role: "status" })] })) : (_jsx("span", { children: "Login" })) }) }), _jsx("div", { className: "col-12 col-md-12  ", children: _jsxs("div", { className: "mt-8 float-end  ", children: [_jsx("span", { children: " Don't have an account?" }), _jsx(Link, { to: "/auth/signup", className: "ms-1 link-primary  tw-font-semibold tw-underline", children: "Sign Up" })] }) })] })] }) }) }) }) }));
};
export default LoginPage;
