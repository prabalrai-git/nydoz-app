import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { EyeSlash, Eye } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// ------------------------------ import components
import Images from "../../../constants/Images";
import Spinner from "react-bootstrap/Spinner";
import useMutation from "../../../hooks/useMutation";
import API_ROUTE from "../../../service/api";
import { ResetPasswordSchema } from "../../../validations/auth.validators";
const ResetPassword = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const reset_code = searchParams.get("reset_code");
    const email = searchParams.get("email");
    const { isLoading, error, postData } = useMutation(API_ROUTE.RESET_PASSWORD, false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { register, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: {
            password: "",
            password_confirmation: "",
        },
        resolver: yupResolver(ResetPasswordSchema),
    });
    const onFormSubmit = handleSubmit(async (data) => {
        if (!reset_code || !email)
            return toast.error("Something went wrong");
        const payload = { ...data, email, reset_code };
        const response = await postData(payload);
        if (response?.data?.message) {
            toast.success(response?.data?.message);
            navigate("/login");
        }
        else {
            toast.error(error);
        }
    });
    return (_jsx("div", { className: "bg-light h-100vh ", children: _jsx("div", { className: "container ", children: _jsx("div", { className: "row ", children: _jsx("div", { className: "col-md-6 offset-md-3", children: _jsx("div", { className: "card mt-4", children: _jsxs("div", { className: "card-body", children: [_jsxs("div", { className: "text-left mb-3", children: [_jsx("img", { src: Images.CompanyLogo, height: "48", className: "mb-4" }), _jsx("h5", { className: "tw-my-4 tw-text-xl tw-font-bold", children: "Reset Password" })] }), _jsxs("form", { onSubmit: onFormSubmit, children: [_jsxs("div", { className: "form-group mb-3", children: [_jsxs("label", { className: "mb-4", htmlFor: "password", children: ["New Password", _jsx("span", { className: "tw-text-red-500", children: "*" })] }), _jsxs("div", { className: "position-relative", children: [_jsx("input", { className: "form-control", type: showPassword ? "text" : "password", ...register("password"), placeholder: "Enter new Password" }), _jsx("span", { onClick: () => setShowPassword((prev) => !prev), className: "btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 ", children: showPassword ? (_jsx(Eye, { size: 16 })) : (_jsx(EyeSlash, { size: 16 })) })] }), _jsx("p", { className: "text-danger mt-1", children: errors.password?.message })] }), _jsxs("div", { className: "form-group mb-3 ", children: [_jsxs("label", { className: "mb-2", htmlFor: "password", children: ["Confirm Password", _jsx("span", { className: "tw-text-red-500", children: "*" })] }), _jsxs("div", { className: "position-relative", children: [_jsx("input", { className: "form-control", type: showConfirmPassword ? "text" : "password", ...register("password_confirmation"), placeholder: "Enter your password again" }), _jsx("span", { onClick: () => setShowConfirmPassword((prev) => !prev), className: "btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 ", children: showConfirmPassword ? (_jsx(Eye, { size: 16 })) : (_jsx(EyeSlash, { size: 16 })) })] }), _jsx("p", { className: "text-danger mt-1", children: errors.password_confirmation?.message })] }), _jsx("div", { className: "form-group mb-3", children: _jsx("button", { type: "submit", className: "btn btn-primary btn-block w-100 tw-mt-10", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "ms-2", children: "Please Wait..." }), _jsx(Spinner, { size: "sm", animation: "border", role: "status" })] })) : (_jsx("span", { children: "Submit" })) }) })] })] }) }) }) }) }) }));
};
export default ResetPassword;
