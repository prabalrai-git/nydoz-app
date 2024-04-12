import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeSlash, Eye } from "react-bootstrap-icons";
import { UserRegisterSchema } from "../../../validations/auth.validators";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useMutation from "../../../hooks/useMutation";
import API_ROUTE from "../../../service/api";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import useHandleShowError from "../../../hooks/useHandleShowError";
import useValidationError from "../../../hooks/useValidationError";
const Register = () => {
    const navigate = useNavigate();
    const { postData, error, isLoading, errList } = useMutation(API_ROUTE.USER_REGISTER, false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { register, handleSubmit, setError, formState: { errors }, } = useForm({
        resolver: yupResolver(UserRegisterSchema),
    });
    useHandleShowError(error);
    useValidationError({ errList, setError });
    // send request to server
    const onFormSubmit = handleSubmit(async (data) => {
        const { 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        isTermAndConditionAccepted, ...rest } = data;
        const payload = {
            ...rest,
        };
        const response = await postData(payload);
        if (response?.status === 201) {
            toast.success("Account Created Successfully");
            navigate("/auth/login");
        }
    });
    return (_jsx("div", { className: "container  d-flex  align-items-center justify-content-center h-100 flex-column flex-root ]", id: "kt_app_root", children: _jsx("div", { className: "d-flex flex-column flex-lg-row flex-column-fluid ", children: _jsx("div", { className: " d-flex flex-column flex-lg-row-fluid w-lg-50 p-6 order-2 order-lg-1 ", children: _jsx("div", { className: "d-flex flex-center flex-column flex-lg-row-fluid", children: _jsx("div", { className: "card shadow shadow-sm p-3", children: _jsxs("form", { onSubmit: onFormSubmit, className: "form w-100 p-4", id: "kt_sign_up_form", "data-kt-redirect-url": "../../demo31/dist/authentication/layouts/corporate/sign-in.html", action: "#", children: [_jsx("div", { className: "row mb-6", children: _jsxs("div", { className: "col-12 col-md-12", children: [_jsx("h2", { className: "text-dark fw-bolder tw-text-2xl", children: "Create Your Account First" }), _jsx("p", { className: "text-muted tw-mt-3 ", children: "Start your trial for 10 more days" })] }) }), _jsxs("div", { className: "row", children: [_jsxs("div", { className: "col-12 col-md-6", children: [_jsx("label", { className: "form-label required", htmlFor: "first_name", children: "First Name" }), _jsxs("div", { className: "fv-row mb-6", children: [_jsx("input", { type: "text", placeholder: "Full Name", className: "form-control", ...register("first_name") }), _jsx("p", { className: "text-danger mt-1", children: errors.first_name?.message })] })] }), _jsxs("div", { className: "col-12 col-md-6", children: [_jsx("label", { className: "form-label required", htmlFor: "last_name", children: "Last Name" }), _jsxs("div", { className: "fv-row mb-6", children: [_jsx("input", { type: "text", placeholder: "Last Name", className: "form-control", ...register("last_name") }), _jsx("p", { className: "text-danger mt-1", children: errors.last_name?.message })] })] }), _jsxs("div", { className: "col-12 col-md-6", children: [_jsx("label", { className: "form-label required", htmlFor: "Email", children: "Email" }), _jsxs("div", { className: "fv-row mb-6", children: [_jsx("input", { type: "text", placeholder: "Email", className: "form-control ", ...register("email") }), _jsx("p", { className: "text-danger mt-1", children: errors.email?.message })] })] }), _jsxs("div", { className: "col-12 col-md-6", children: [_jsx("label", { className: "form-label ", htmlFor: "mobile_number", children: "Mobile Number" }), _jsxs("div", { className: "fv-row mb-6", children: [_jsx("input", { type: "text", placeholder: "Enter your Mobile Number", className: "form-control", ...register("mobile") }), _jsx("p", { className: "text-danger mt-1", children: errors.mobile?.message })] })] }), _jsx("div", { className: "col-12 col-md-6", children: _jsxs("div", { className: "fv-row mb-8", "data-kt-password-meter": "true", children: [_jsx("label", { className: "form-label required", htmlFor: "password", children: "Password" }), _jsx("div", { className: "mb-1", children: _jsxs("div", { className: "position-relative mb-3", children: [_jsx("input", { className: "form-control bg-transparent", type: showPassword ? "text" : "password", ...register("password"), placeholder: "Password" }), _jsx("span", { onClick: () => setShowPassword((prev) => !prev), className: "btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2", children: showPassword ? (_jsx(Eye, { size: 16 })) : (_jsx(EyeSlash, { size: 16 })) })] }) }), _jsx("p", { className: "text-danger mt-1", children: errors.password?.message })] }) }), _jsx("div", { className: "col-12 col-md-6", children: _jsxs("div", { className: "fv-row mb-8", "data-kt-password-meter": "true", children: [_jsx("label", { className: "form-label required", htmlFor: "confrimPassword", children: "Confirm Password" }), _jsx("div", { className: "mb-1", children: _jsxs("div", { className: "position-relative mb-3", children: [_jsx("input", { className: "form-control bg-transparent", type: showConfirmPassword ? "text" : "password", ...register("password_confirmation"), placeholder: "Enter your Password again" }), _jsx("span", { onClick: () => setShowConfirmPassword((prev) => !prev), className: "btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2", children: showConfirmPassword ? (_jsx(Eye, { size: 16 })) : (_jsx(EyeSlash, { size: 16 })) })] }) }), _jsx("p", { className: "text-danger mt-1", children: errors.password_confirmation?.message })] }) }), _jsx("div", { className: "col-12 col-md-6 mb-3", children: _jsxs("div", { className: "fv-row mb-6", children: [_jsxs("label", { className: "form-check form-check-inline", children: [_jsx("input", { className: "form-check-input", type: "checkbox", value: "true", ...register("isTermAndConditionAccepted", {
                                                                    setValueAs: (value) => value === true,
                                                                }) }), _jsxs("span", { className: "form-check-label fw-semibold text-gray-700 fs-base ms-1", children: ["I Accept the", _jsx("a", { href: "#", className: "ms-1 link-primary text-decoration-none", children: "Terms" }), " ", "&", _jsx("a", { href: "#", className: "ms-1 link-primary text-decoration-none", children: "Conditions." })] })] }), _jsx("p", { className: "text-danger mt-1", children: errors.isTermAndConditionAccepted?.message })] }) }), _jsx("div", { className: "col-12 col-md-6 mb-3", children: _jsx(Button, { variant: "primary", type: "submit", disabled: isLoading, className: "w-100 hover:tw-bg-btnPrimaryHover", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "ms-2", children: "Please Wait..." }), _jsx(Spinner, { size: "sm", animation: "border", role: "status" })] })) : (_jsx("span", { children: "Sign Up" })) }) }), _jsx("div", { className: "col-12", children: _jsxs("div", { className: "text-gray-500 mt-3 fw-semibold fs-6 float-end", children: ["Already have an Account ?\u00A0", _jsx(Link, { to: "/auth/login", className: "tw-text-btnPrimary tw-font-semibold tw-underline ", children: "Login" })] }) })] })] }) }) }) }) }) }));
};
export default Register;
