import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// ------------------------------ import components
import Images from "../../../constants/Images";
import Spinner from "react-bootstrap/Spinner";
import useMutation from "../../../hooks/useMutation";
import API_ROUTE from "../../../service/api";
import { ForgetPasswordSchema } from "../../../validations/auth.validators";
import { Check2Circle } from "react-bootstrap-icons";
import BackButton from "../../shared/molecules/BackButton";
const ChangePassword = () => {
    const [isEmailSent, setIsEmailSent] = useState(false);
    const { isLoading, error, postData } = useMutation(API_ROUTE.FORGOT_PASSWORD, false);
    const { register, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: {
            email: "",
        },
        resolver: yupResolver(ForgetPasswordSchema),
    });
    const onFormSubmit = handleSubmit(async (data) => {
        const response = await postData(data);
        if (response?.data?.message) {
            toast.success(response?.data?.message);
            setIsEmailSent(true);
        }
        else {
            toast.error(error);
        }
    });
    return (_jsx("div", { className: "bg-light min-h-40vh ", children: _jsx("div", { className: "container ", children: _jsx("div", { className: "row ", children: _jsx("div", { className: "col-md-6 offset-md-3", children: !isEmailSent ? (_jsx("div", { className: "card mt-4", children: _jsxs("div", { className: "card-body ", children: [_jsxs("div", { children: [_jsx("div", { className: "d-flex float-end tw-mb-5 ", children: _jsx(BackButton, {}) }), _jsxs("div", { className: "text-left tw-my-8  ", children: [_jsx("img", { src: Images.CompanyLogo, height: "48", className: "mb-4" }), _jsx("h5", { className: "tw-text-xl tw-font-bold", children: "Change Password" }), _jsx("p", { className: "text-muted mt-1", children: "Enter your registered email below to recieve password reset instruction." })] })] }), _jsxs("form", { onSubmit: onFormSubmit, children: [_jsxs("div", { className: "form-group mb-10", children: [_jsx("input", { className: "form-control", type: "text", ...register("email"), placeholder: "Enter your email address" }), _jsx("p", { className: "text-danger mt-1", children: errors.email?.message })] }), _jsx("div", { className: "form-group mb-3", children: _jsx("button", { type: "submit", className: "btn btn-primary btn-block w-100", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "ms-2", children: "Please Wait..." }), _jsx(Spinner, { size: "sm", animation: "border", role: "status" })] })) : (_jsx("span", { children: "Submit" })) }) })] })] }) })) : (_jsx("div", { className: "m-4", children: _jsx("div", { className: "card text-center", children: _jsxs("div", { className: "card-body", children: [_jsxs("h5", { className: "card-title  mb-1 ", children: [_jsx("span", { className: "text-success mx-2", children: "Email Sent" }), _jsx("span", { className: "text-success", children: _jsx(Check2Circle, {}) })] }), _jsx("p", { className: "card-text text-primary", children: "Please check your inbox and click in the recieved link to reset a password." })] }) }) })) }) }) }) }));
};
export default ChangePassword;
