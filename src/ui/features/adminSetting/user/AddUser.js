import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useMutation from "../../../../hooks/useMutation";
import API_ROUTE from "../../../../service/api";
import { userToCompanySchema } from "../../../../validations/company.validator";
import { Eye, EyeSlash } from "react-bootstrap-icons";
const AddUsers = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { show, handleClose, setFetchAgain, selectedData } = props;
    const { postData, updateData, errList, error, isLoading } = useMutation(API_ROUTE.USER, true);
    const { register, reset, setError, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(userToCompanySchema),
    });
    // for Error Message
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);
    // for Edit Data
    useEffect(() => {
        if (selectedData) {
            reset({
                first_name: selectedData.first_name,
                last_name: selectedData.last_name,
                email: selectedData.email,
                mobile: selectedData.mobile,
                password: selectedData.password,
                password_confirmation: selectedData.password_confirmation,
            });
        }
        else {
            reset({
                first_name: "",
                last_name: "",
                email: "",
                mobile: "",
                password: "",
                password_confirmation: "",
            });
        }
    }, [reset, selectedData]);
    useEffect(() => {
        if (errList) {
            Object.keys(errList).forEach((field) => {
                const fieldName = field;
                if (errList?.[fieldName]) {
                    errors[fieldName] = {
                        type: "manual",
                        message: errList[fieldName][0], // Assuming you want to use only the first error message
                    };
                }
            });
        }
    }, [errList, setError]);
    const onFormSubmit = handleSubmit(async (data) => {
        // return console.log(data, "user data", selectedData);
        if (selectedData) {
            const response = await updateData(selectedData.id, data);
            if (response?.status === 200) {
                toast.success("User updated successfully");
                reset({
                    first_name: "",
                    last_name: "",
                    email: "",
                    mobile: "",
                    password: "",
                    password_confirmation: "",
                });
                setFetchAgain(true);
                handleClose();
            }
        }
        else {
            const response = await postData(data);
            if (response?.status === 201) {
                toast.success("User Added successfully");
                reset({
                    first_name: "",
                    last_name: "",
                    email: "",
                    mobile: "",
                    password: "",
                    password_confirmation: "",
                });
                setFetchAgain(true);
                handleClose();
            }
        }
    });
    const handleModalClose = () => {
        reset({
            first_name: "",
            last_name: "",
            email: "",
            mobile: "",
            password: "",
            password_confirmation: "",
        });
        handleClose();
    };
    return (_jsxs(Modal, { size: "lg", show: show, onHide: handleClose, children: [_jsx(Modal.Header, { closeButton: true, children: _jsx(Modal.Title, { children: _jsxs("div", { className: "text-gray-900  fs-2 fw-bold me-1", children: [selectedData ? "Update" : "Add", " User"] }) }) }), _jsx(Modal.Body, { className: "", children: _jsx("form", { onSubmit: onFormSubmit, className: "form w-100 ", id: "kt_sign_up_form", "data-kt-redirect-url": "../../demo31/dist/authentication/layouts/corporate/sign-in.html", action: "#", children: _jsxs("div", { className: "row", children: [_jsxs("div", { className: "col-12 col-md-6", children: [_jsx("label", { className: "form-label required", htmlFor: "first_name", children: "First Name" }), _jsxs("div", { className: "fv-row mb-6", children: [_jsx("input", { type: "text", placeholder: "Full Name", className: "form-control", ...register("first_name") }), _jsx("p", { className: "text-danger mt-1", children: errors.first_name?.message })] })] }), _jsxs("div", { className: "col-12 col-md-6", children: [_jsx("label", { className: "form-label required", htmlFor: "last_name", children: "Last Name" }), _jsxs("div", { className: "fv-row mb-6", children: [_jsx("input", { type: "text", placeholder: "Last Name", className: "form-control", ...register("last_name") }), _jsx("p", { className: "text-danger mt-1", children: errors.last_name?.message })] })] }), _jsxs("div", { className: "col-12 col-md-6", children: [_jsx("label", { className: "form-label required", htmlFor: "Email", children: "Email" }), _jsxs("div", { className: "fv-row mb-6", children: [_jsx("input", { type: "text", placeholder: "Email", className: "form-control ", ...register("email") }), _jsx("p", { className: "text-danger mt-1", children: errors.email?.message })] })] }), _jsxs("div", { className: "col-12 col-md-6", children: [_jsx("label", { className: "form-label required", htmlFor: "mobile_number", children: "Mobile Number" }), _jsxs("div", { className: "fv-row mb-6", children: [_jsx("input", { type: "text", placeholder: "Enter your Mobile Number", className: "form-control", ...register("mobile") }), _jsx("p", { className: "text-danger mt-1", children: errors.mobile?.message })] })] }), _jsx("div", { className: "col-12 col-md-6", children: _jsxs("div", { className: "fv-row mb-8", "data-kt-password-meter": "true", children: [_jsx("label", { className: "form-label required", htmlFor: "password", children: "Password" }), _jsx("div", { className: "mb-1", children: _jsxs("div", { className: "position-relative mb-3", children: [_jsx("input", { className: "form-control bg-transparent", type: showPassword ? "text" : "password", ...register("password"), placeholder: "Password" }), _jsx("span", { onClick: () => setShowPassword((prev) => !prev), className: "btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2", children: showPassword ? (_jsx(Eye, { size: 16 })) : (_jsx(EyeSlash, { size: 16 })) })] }) }), _jsx("p", { className: "text-danger mt-1", children: errors.password?.message })] }) }), _jsx("div", { className: "col-12 col-md-6", children: _jsxs("div", { className: "fv-row mb-8", "data-kt-password-meter": "true", children: [_jsx("label", { className: "form-label required", htmlFor: "confrimPassword", children: "Confirm Password" }), _jsx("div", { className: "mb-1", children: _jsxs("div", { className: "position-relative mb-3", children: [_jsx("input", { className: "form-control bg-transparent", type: showConfirmPassword ? "text" : "password", ...register("password_confirmation"), placeholder: "Enter your Password again" }), _jsx("span", { onClick: () => setShowConfirmPassword((prev) => !prev), className: "btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2", children: showConfirmPassword ? (_jsx(Eye, { size: 16 })) : (_jsx(EyeSlash, { size: 16 })) })] }) }), _jsx("p", { className: "text-danger mt-1", children: errors.password_confirmation?.message })] }) })] }) }) }), _jsxs(Modal.Footer, { children: [_jsx(Button, { size: "sm", variant: "secondary", onClick: handleModalClose, children: "Cancel" }), _jsx(Button, { size: "sm", variant: "primary", className: "fw-bold", onClick: onFormSubmit, type: "submit", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "ms-2", children: "uploading..." }), _jsx(Spinner, { size: "sm", animation: "border", role: "status" })] })) : (_jsx("span", { className: "mx-3", children: selectedData ? "Update" : "Add" })) })] })] }));
};
export default AddUsers;
