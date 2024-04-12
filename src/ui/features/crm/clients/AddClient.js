import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import { XCircle } from "react-bootstrap-icons";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Spinner } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { clientSchema } from "../../../../validations/crm.validators";
import CountryCode from "../../../shared/atoms/CountryCode";
import { getSelectPropsFromCountry } from "../../../../functions/country";
import useValidationError from "../../../../hooks/useValidationError";
import API_ROUTE from "../../../../service/api";
import useMutation from "../../../../hooks/useMutation";
import useHandleShowError from "../../../../hooks/useHandleShowError";
import CompanyBreadcrumb from "../../../shared/molecules/CompanyBreadcrumb";
import AsyncSelect from "../../../shared/molecules/AsyncReactSelect";
import AsyncReactSelect from "../../../shared/molecules/AsyncReactSelect";
import { currency_code } from "../../../../constants/CurrencyCode";
const AddClient = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const firstName = "first_name";
    const [selectedVistor, setSelectedVistor] = useState();
    const [selectedVisaType, setSelectedVisaType] = useState();
    const [selectedAgent, setSelectedAgent] = useState();
    const [selectedCountry, setSelectedCountry] = useState(undefined);
    const [selectedVisitingCountry, setSelectedVisitingCountry] = useState(undefined);
    const { updateData, postData, isLoading, error, errList } = useMutation(API_ROUTE.CM_CLIENTS, true);
    const [selectedCurrencyCode, setSelectCurrencyCode] = useState();
    const [selectedEnrollmentInstitute, setSelectEnrollmentInstitute] = useState();
    const [selectedEnrollmentOpening, setSelectEnrollmentOpening] = useState();
    const { register, reset, control, setError, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: {
            first_name: "",
            last_name: "",
            state: "",
            phone_nos: [" "],
            email: [" "],
        },
        resolver: yupResolver(clientSchema),
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "phone_nos",
    });
    const { fields: emailFields, append: appendEmail, remove: removeEmail, } = useFieldArray({
        name: "email",
        control,
    });
    useValidationError({ errList, setError });
    useHandleShowError(error);
    const handleResetForm = useCallback(() => {
        const dataDetails = location?.state?.data;
        const country = getSelectPropsFromCountry(dataDetails?.country);
        const visitingCountry = getSelectPropsFromCountry(dataDetails?.visiting_country);
        // const salaryCurrency = getSelectPropsFromCountry(
        //   dataDetails?.salary_currency_code
        // );
        const registrationDateObj = moment(dataDetails.registration_date)
            .format()
            .split("T")[0];
        const expectedTakeUpDateObj = moment(dataDetails.expected_take_off_date)
            .format()
            .split("T")[0];
        setSelectedCountry(country);
        setSelectedVisitingCountry(visitingCountry);
        // setSelectedVisaType(dataDetails?.visa_type_id);
        setSelectedVisaType(dataDetails?.visa_type);
        setSelectedAgent(dataDetails?.agent);
        setSelectedVistor(dataDetails?.visitor);
        // setSelectCurrencyCode(dataDetails?.salary_currency_code);
        setSelectEnrollmentInstitute(dataDetails?.enrollment_institute);
        setSelectEnrollmentOpening(dataDetails?.enrollment_opening);
        reset({
            ...dataDetails,
            registration_date: registrationDateObj,
            expected_take_off_date: expectedTakeUpDateObj,
        });
        const salary_currency_code = currency_code?.filter((item) => {
            return item.code === location?.state?.data?.salary_currency_code;
        });
        if (salary_currency_code) {
            setSelectCurrencyCode(salary_currency_code[0]);
        }
    }, [location?.state?.data, reset]);
    useEffect(() => {
        if (location?.state?.data && location?.state?.data?.id) {
            handleResetForm();
        }
    }, [handleResetForm, location?.state, reset]);
    const handleClearForm = () => {
        reset({});
        setSelectedCountry(undefined);
    };
    const onFormSubmit = handleSubmit(async (data) => {
        // return console.log(data, "hey data");
        if (!selectedCountry) {
            toast.error("Please select country");
            return;
        }
        if (!selectedVisitingCountry) {
            toast.error("Please select visiting country");
            return;
        }
        if (!selectedVisaType) {
            toast.error("Please select visa type");
            return;
        }
        let response;
        if (location?.state?.data?.id) {
            const tempPostData = {
                ...data,
                registration_date: moment(data.registration_date).format("YYYY-MM-DD"),
                expected_take_off_date: moment(data.expected_take_off_date).format("YYYY-MM-DD"),
                country: selectedCountry?.value ?? "",
                visiting_country: selectedVisitingCountry?.value ?? "",
                agent_id: selectedAgent?.id ?? "",
                visa_type_id: selectedVisaType?.id ?? "",
                visitor_id: selectedVistor?.id ?? "",
                salary_currency_code: selectedCurrencyCode?.code ?? "",
                enrollment_institute_id: selectedEnrollmentInstitute?.id ?? "",
                enrollment_opening_id: selectedEnrollmentOpening?.id ?? "",
            };
            response = await updateData(location?.state?.data?.id, tempPostData);
            if (response?.data?.status === "ok") {
                toast.success("Client updated Successfully");
                navigate(-1);
            }
        }
        else {
            const tempPostData = {
                ...data,
                registration_date: moment(data.registration_date).format("YYYY-MM-DD"),
                expected_take_off_date: moment(data.expected_take_off_date).format("YYYY-MM-DD"),
                country: selectedCountry?.value ?? "",
                visiting_country: selectedVisitingCountry?.value ?? "",
                agent_id: selectedAgent?.id ?? "",
                visa_type_id: selectedVisaType?.id ?? "",
                visitor_id: selectedVistor?.id ?? "",
                salary_currency_code: selectedCurrencyCode?.code ?? "",
                enrollment_institute_id: selectedEnrollmentInstitute?.id ?? "",
                enrollment_opening_id: selectedEnrollmentOpening?.id ?? "",
            };
            response = await postData(tempPostData);
            if (response?.data?.status === "ok") {
                toast.success("Client Added  Successfully");
                navigate(-1);
            }
        }
    });
    return (_jsxs("div", { children: [_jsx(CompanyBreadcrumb, { title: location?.state?.data?.id ? "Update Client" : "Add Client", showBreadcrumb: true, btnText: "Back" }), _jsxs("div", { className: "card shadow-sm ", children: [_jsxs("div", { className: "card-header", children: [_jsx("h2", { className: "card-title fw-bold", children: "Add Client Details" }), _jsx("div", { className: "card-toolbar", children: _jsx("button", { className: "btn btn-sm btn-secondary", onClick: handleClearForm, children: "Clear" }) })] }), _jsx("div", { className: "card-body", children: _jsx("form", { className: "form w-100 ", onSubmit: onFormSubmit, children: _jsxs("div", { className: "row", children: [_jsxs("div", { className: "col-12 mb-3", children: [_jsx("div", { children: _jsx("h3", { className: "fs-4 mb-5", id: "custom-form-control", children: "Personal Details" }) }), _jsxs("div", { className: "row", children: [_jsx("div", { className: " col-md-6 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "Registration Date:" }), _jsx("input", { type: "date", className: "form-control", placeholder: "Enter your first name.", ...register("registration_date") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.registration_date?.message })] }) }), _jsx("div", { className: " col-12 col-md-6 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "form-label", children: "Visitor:" }), _jsx(AsyncReactSelect, { placeholder: "Search..", baseUrl: API_ROUTE.CM_VISITORS, setSelectValue: setSelectedVistor, 
                                                                    // selectValue={selectedVistor}
                                                                    selectValue: location?.state?.data
                                                                        ? location?.state?.data.visitor
                                                                        : selectedVistor, dataId: "id", showDataLabel: firstName })] }) }), _jsx("div", { className: "col-12 col-md-6 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "form-label", children: "Agent:" }), _jsx(AsyncReactSelect, { placeholder: "Search..", baseUrl: API_ROUTE.CM_AGENTS, setSelectValue: setSelectedAgent, 
                                                                    // selectValue={selectedAgent}
                                                                    selectValue: location?.state?.data
                                                                        ? location?.state?.data.agent
                                                                        : selectedAgent, dataId: "id", showDataLabel: firstName })] }) }), _jsx("div", { className: "col-12 col-md-6 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "First Name:" }), _jsx("input", { type: "text", className: "form-control", placeholder: "Enter your first name.", ...register("first_name") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.first_name?.message })] }) }), _jsx("div", { className: "col-12 col-md-6 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "Last Name:" }), _jsx("input", { className: "form-control", placeholder: "Enter your last name.", ...register("last_name") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.last_name?.message })] }) }), _jsx("div", { className: "col-12 col-md-6 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: " form-label", children: "Phone Number:" }), fields.map((field, index) => (_jsxs("div", { className: "form-group mb-3", children: [_jsxs("div", { className: "d-flex", children: [_jsx("input", { className: "form-control me-3", placeholder: `Enter phone number ${index + 1}`, ...register(`phone_nos.${index}`) }), _jsx("div", { className: "flex-center cursor-pointer", children: _jsx(XCircle, { onClick: () => remove(index), color: "gray", size: 25 }) })] }), errors?.phone_nos && errors?.phone_nos[index] && (_jsx("p", { className: "fv-plugins-message-container invalid-feedback ps-2", children: errors?.phone_nos[index]?.message }))] }, field.id))), _jsx("div", { className: "d-flex justify-content-end", children: _jsx("button", { type: "button", className: "btn btn-secondary btn-sm", onClick: () => append(""), children: "Add More Phone Number" }) })] }) }), _jsx("div", { className: "col-12 col-md-6 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: " form-label", children: "Email Address:" }), emailFields.map((field, index) => (_jsxs("div", { className: "form-group mb-3", children: [_jsxs("div", { className: "d-flex", children: [_jsx("input", { className: "form-control me-3", placeholder: `Enter phone number ${index + 1}`, ...register(`email.${index}`) }), _jsx("div", { className: "flex-center cursor-pointer", children: _jsx(XCircle, { onClick: () => removeEmail(index), color: "gray", size: 25 }) })] }), errors?.email && errors?.email[index] && (_jsx("p", { className: "fv-plugins-message-container invalid-feedback", children: errors?.email[index]?.message }))] }, field.id))), _jsx("div", { className: "d-flex justify-content-end", children: _jsx("button", { type: "button", className: "btn btn-secondary btn-sm", onClick: () => appendEmail(""), children: "Add More Email" }) })] }) })] })] }), _jsx("hr", { className: "bg-gray-100 mb-6 " }), _jsxs("div", { className: "col-12 mb-6", children: [_jsx("div", { children: _jsx("h2", { className: "fs-4 mb-5", id: "custom-form-control", children: "Address Details" }) }), _jsxs("div", { className: "row", children: [_jsx("div", { className: "col-12 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: " form-label", children: "Full Address" }), _jsx("input", { className: "form-control", placeholder: "Enter your full address.", ...register("street_address") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.street_address?.message })] }) }), _jsx("div", { className: "col-12 col-md-6 gap-5 gap-md-7   mb-6", children: _jsxs("div", { children: [_jsx("label", { className: "form-label", children: "Visitor's State /province" }), _jsx("input", { className: "form-control", placeholder: "Enter your state", ...register("state") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.state?.message })] }) }), _jsx("div", { className: "col-12 col-md-6  gap-5 gap-md-7   mb-6", children: _jsxs("div", { children: [_jsx("label", { className: "required form-label", children: "Country" }), _jsx(CountryCode, { placeholder: "Select Country", forCountry: true, selectValue: selectedCountry, setSelectValue: setSelectedCountry })] }) })] })] }), _jsx("hr", { className: "bg-gray-100 mb-6 " }), _jsxs("div", { className: "col-12 mb-6", children: [_jsx("div", { children: _jsx("h2", { className: "fs-4 mb-5", id: "custom-form-control", children: "Visiting Details" }) }), _jsxs("div", { className: "row", children: [_jsx("div", { className: "col-12 col-md-6 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "Visa Type" }), _jsx(AsyncSelect, { placeholder: "Search for visa type.", baseUrl: API_ROUTE.GET_VISA_TYPES, setSelectValue: setSelectedVisaType, 
                                                                    // selectValue={selectedVisaType}
                                                                    selectValue: location?.state?.data
                                                                        ? location?.state?.data.visa_type
                                                                        : selectedVisaType, dataId: "id", showDataLabel: "name" })] }) }), _jsx("div", { className: "col-12 col-md-6  gap-5 gap-md-7   mb-6", children: _jsxs("div", { children: [_jsx("label", { className: "required form-label", children: "Visit Country" }), _jsx(CountryCode, { placeholder: "Select Visiting Country", forCountry: true, selectValue: selectedVisitingCountry, setSelectValue: setSelectedVisitingCountry })] }) }), _jsx("div", { className: "col-12 col-md-6 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "form-label", children: "Visiting State" }), _jsx("input", { className: "form-control", placeholder: "Enter your visiting state.", ...register("visiting_country_state") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.visiting_country_state?.message })] }) }), _jsx("div", { className: "col-12 col-md-6 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "Deal Amount" }), _jsx("input", { className: "form-control", type: "number", placeholder: "Enter deal amount", ...register("deal_amount", {
                                                                        valueAsNumber: true,
                                                                    }) }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.deal_amount?.message })] }) }), _jsx("div", { className: "col-12 col-md-6 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "Applied Position" }), _jsx("input", { className: "form-control", placeholder: "Enter applied position or course.", ...register("applied_position") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.applied_position?.message })] }) }), _jsx("div", { className: "col-12 col-md-6 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "Expected Salary Per Annum" }), _jsx("input", { type: "number", className: "form-control", placeholder: "Enter expected salary/fee per annum.", ...register("expected_salary_pa", {
                                                                        valueAsNumber: true,
                                                                    }) }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.expected_salary_pa?.message })] }) }), _jsx("div", { className: "col-12 col-md-6 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "Expected Take Off Date" }), _jsx("input", { className: "form-control", type: "date", placeholder: "Enter your visiting purpose.", ...register("expected_take_off_date") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.expected_take_off_date?.message })] }) }), _jsx("div", { className: "col-12 col-md-6 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "Salary Currency Code" }), _jsx(AsyncSelect, { placeholder: "Search for visa type.", baseUrl: API_ROUTE.GET_CURRENCY, setSelectValue: setSelectCurrencyCode, selectValue: selectedCurrencyCode, dataId: "code", showDataLabel: "name" })] }) }), _jsx("div", { className: "col-12 col-md-6 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "form-label", children: "Enrollment Institute:" }), _jsx(AsyncReactSelect, { placeholder: "Search..", baseUrl: API_ROUTE.CM_ENROLLMENT, setSelectValue: setSelectEnrollmentInstitute, 
                                                                    // selectValue={selectedEnrollmentInstitute}
                                                                    selectValue: location?.state?.data
                                                                        ? location?.state?.data.enrollment_institute
                                                                        : selectedEnrollmentInstitute, dataId: "id", showDataLabel: "name" })] }) }), _jsx("div", { className: "col-12 col-md-6 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "form-label", children: "Enrollment Openings:" }), _jsx("div", { children: _jsx(AsyncReactSelect, { placeholder: "Search..", baseUrl: `${API_ROUTE.CM_ENROLLMENT_OPENINGS}?enroll_institute_id=${selectedEnrollmentInstitute}`, setSelectValue: setSelectEnrollmentOpening, 
                                                                        // selectValue={selectedEnrollmentOpening}
                                                                        selectValue: location?.state?.data
                                                                            ? location?.state?.data.enrollment_opening
                                                                            : selectedEnrollmentOpening, dataId: "id", showDataLabel: "position" }) })] }) }), _jsx("div", { className: "col-12  gap-5 gap-md-7  mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: " form-label", children: "Remarks" }), _jsx("textarea", { className: "form-control", ...register("remarks"), placeholder: "description" }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.remarks?.message })] }) })] })] }), _jsx("div", { className: "col-12 d-flex justify-content-end", children: _jsx("button", { type: "submit", disabled: isLoading, className: "btn btn-primary  mb-6", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "ms-2", children: "Please Wait..." }), _jsx(Spinner, { size: "sm", animation: "border", role: "status" })] })) : (_jsx("span", { children: location?.state?.data?.id ? "Update" : "Submit" })) }) })] }) }) })] })] }));
};
export default AddClient;
