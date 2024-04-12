import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useCallback, useState } from "react";
import { enrollmentOpeningsSchema } from "../../../../validations/crm.validators";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useValidationError from "../../../../hooks/useValidationError";
import API_ROUTE from "../../../../service/api";
import useMutation from "../../../../hooks/useMutation";
import { Spinner } from "react-bootstrap";
import useHandleShowError from "../../../../hooks/useHandleShowError";
import AsyncReactSelect from "../../../shared/molecules/AsyncReactSelect";
import moment from "moment";
import CompanyBreadcrumb from "../../../shared/molecules/CompanyBreadcrumb";
const Add = () => {
    const { institueId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { updateData, postData, isLoading, error, errList } = useMutation(API_ROUTE.CM_ENROLLMENT_OPENINGS, true);
    const visaTypeId = "id";
    const showDataLabel = "name";
    const currencyCode = "code";
    const [selectCurrencyValue, setSelectCurrencyValue] = useState();
    const [selectVisaType, setSelectVisaType] = useState();
    const { register, reset, setError, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: {
            total_opening: 4340,
        },
        resolver: yupResolver(enrollmentOpeningsSchema),
    });
    useValidationError({ errList, setError });
    useHandleShowError(error);
    const handleResetForm = useCallback(() => {
        const dataDetails = location?.state?.data;
        const { currency, visa_type, enroll_start_date, enroll_end_date, ...rest } = dataDetails;
        const enrollStartDateObj = moment(enroll_start_date).format().split("T")[0];
        const enrollEndDateObj = moment(enroll_end_date).format().split("T")[0];
        reset({
            ...rest,
            enroll_start_date: enrollStartDateObj,
            enroll_end_date: enrollEndDateObj,
        });
        setSelectVisaType(visa_type);
        setSelectCurrencyValue({
            name: "",
            code: currency,
            symbol: "",
        });
    }, [location?.state?.data, reset]);
    useEffect(() => {
        if (location?.state?.data && location?.state?.data?.id) {
            handleResetForm();
        }
    }, [handleResetForm, location?.state, reset]);
    const handleClearForm = () => {
        reset();
    };
    const onFormSubmit = handleSubmit(async (data) => {
        let response;
        if (!institueId) {
            toast.error("Enrollment Institute is required");
            return;
        }
        if (!selectCurrencyValue) {
            toast.error("Please select currency");
            return;
        }
        if (!selectVisaType?.id) {
            toast.error("Please select visa type");
            return;
        }
        if (location?.state?.data?.id) {
            const tempPostData = {
                ...data,
                visa_type_id: selectVisaType?.id,
                institute_id: institueId,
                currency: selectCurrencyValue.code,
            };
            response = await updateData(location?.state?.data?.id, tempPostData);
            if (response?.data?.status === "ok") {
                toast.success("Opening updated Successfully");
                navigate(-1);
            }
        }
        else {
            const tempPostData = {
                ...data,
                visa_type_id: selectVisaType?.id,
                institute_id: institueId,
                currency: selectCurrencyValue.code,
                enroll_start_date: data.enroll_start_date,
                enroll_end_date: data.enroll_end_date,
            };
            response = await postData(tempPostData);
            if (response?.data?.status === "ok") {
                toast.success("Opening Added  Successfully");
                navigate(-1);
            }
        }
    });
    return (_jsxs(_Fragment, { children: [_jsx(CompanyBreadcrumb, { title: "Add Openinings", showBreadcrumb: false, btnText: "Back" }), _jsxs("div", { className: "card shadow-sm mt-10", children: [_jsxs("div", { className: "card-header", children: [_jsx("h3", { className: "card-title", children: location?.state?.data?.id
                                    ? "Update Institute Details"
                                    : "Add Institute Details" }), _jsx("div", { className: "card-toolbar", children: location?.state?.data?.id ? (_jsx("button", { className: "btn btn-sm btn-info", onClick: handleResetForm, children: "Reset" })) : (_jsx("button", { className: "btn btn-sm btn-info", onClick: handleClearForm, children: "Clear" })) })] }), _jsx("div", { className: "card-body", children: _jsx("form", { className: "form w-100 ", onSubmit: onFormSubmit, children: _jsxs("div", { className: "row", children: [_jsx("div", { className: "col-12 col-md-6 gap-5 gap-md-7  mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "Opening Start Date" }), _jsx("input", { type: "date", className: "form-control", ...register("enroll_start_date") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.enroll_start_date?.message })] }) }), _jsx("div", { className: "col-12 col-md-6 gap-5 gap-md-7   mb-6", children: _jsxs("div", { children: [_jsx("label", { className: "required form-label", children: "Opening End Date" }), _jsx("input", { type: "date", className: "form-control", placeholder: "Enter your state", ...register("enroll_end_date") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.enroll_end_date?.message })] }) }), _jsx("div", { className: "col-12 col-md-6 gap-5 gap-md-7  mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "Select Visa Type" }), _jsx(AsyncReactSelect, { baseUrl: API_ROUTE.GET_VISA_TYPES, placeholder: "Select Visa", dataId: visaTypeId, showDataLabel: showDataLabel, selectValue: selectVisaType, setSelectValue: setSelectVisaType })] }) }), _jsx("div", { className: "col-12 col-md-6 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "Total Opening" }), _jsx("input", { className: "form-control", type: "number", placeholder: "Enter the total opening", ...register("total_opening") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.total_opening?.message })] }) }), _jsx("div", { className: "col-12 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "Postion/Course" }), _jsx("input", { type: "text", className: "form-control", placeholder: "Enter the course name", ...register("position") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.position?.message })] }) }), _jsx("div", { className: "col-12 col-md-6 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "Salary Currency" }), _jsx(AsyncReactSelect, { baseUrl: API_ROUTE.GET_CURRENCY, placeholder: "Select Currency", dataId: currencyCode, showDataLabel: currencyCode, selectValue: selectCurrencyValue, setSelectValue: setSelectCurrencyValue })] }) }), _jsx("div", { className: "col-12 col-md-6 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "Salary Offered" }), _jsx("input", { type: "number", className: "form-control", placeholder: "Enter the offered salary", ...register("offered_salary") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.offered_salary?.message })] }) }), _jsx("div", { className: "col-12 gap-5 gap-md-7  mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: " form-label", children: "Description" }), _jsx("textarea", { className: "form-control", ...register("description"), placeholder: "description" }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.description?.message })] }) }), _jsx("div", { className: "col-12 d-flex justify-content-end", children: _jsx("button", { type: "submit", disabled: isLoading, className: "btn btn-primary  mb-6", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "ms-2", children: "Please Wait..." }), _jsx(Spinner, { size: "sm", animation: "border", role: "status" })] })) : (_jsx("span", { children: location?.state?.data?.id ? "Update" : "Submit" })) }) })] }) }) })] })] }));
};
export default Add;
