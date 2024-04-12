import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from "react";
import moment from "moment";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import CountryCode from "../../../shared/atoms/CountryCode";
import { visitorsNotGoingOutSchema, visitorsGoingOutSchema, } from "../../../../validations/crm.validators";
import { useNavigate, useLocation } from "react-router-dom";
import { getSelectPropsFromCountry } from "../../../../functions/country";
import useValidationError from "../../../../hooks/useValidationError";
import API_ROUTE from "../../../../service/api";
import useMutation from "../../../../hooks/useMutation";
import useHandleShowError from "../../../../hooks/useHandleShowError";
import CompanyBreadcrumb from "../../../shared/molecules/CompanyBreadcrumb";
import { XCircle } from "react-bootstrap-icons";
import AsyncReactSelect from "../../../shared/molecules/AsyncReactSelect";
import { Switch } from "antd";
const AddVisitor = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [goingForeign, setGoingForeign] = useState(false);
    const [selectInformationChannel, setSelectInformationChannel] = useState();
    const [selectCommonVisitingPurpose, setSelectCommonVisitingPurpose] = useState();
    const [selectedVisaType, setSelectedVisaType] = useState();
    // const [selectedVisaTypeText, setSelectedVisaTypeText] =
    //     useState<string>("");
    const [selectedAgent, setSelectedAgent] = useState();
    const [selectedCountry, setSelectedCountry] = useState(undefined);
    const [selectedVisitingCountry, setSelectedVisitingCountry] = useState(undefined);
    const { updateData, postData, isLoading, error, errList } = useMutation(API_ROUTE.CM_VISITORS, true);
    //   {
    //     "registration_date": "2024-04-03 00:00:00",
    //     "information_channel": "Information Channel 1",
    //     "visiting_purpose": "Business",
    //     "first_name": "New",
    //     "last_name": "Client",
    //     "country": "Nepal",
    //     "state": "Bagmati",
    //     "street_address": "Kathmandu, Nepal",
    //     "phone_nos": [
    //         "98342342342"
    //     ],
    //     "email": [
    //         "prabalrai19@gmail.com"
    //     ],
    //     "agent_id": "9bb57d76-6cbc-4015-bdf1-c487fbc84e45",
    //     "going_to_foreign": false,
    //     "remarks": "Description"
    // }
    // {
    //   "registration_date": "2024-04-03 00:00:00",
    //   "information_channel": "Information Channel 1",
    //   "visiting_purpose": "Information Channel 1",
    //   "first_name": "Vistor",
    //   "last_name": "1",
    //   "country": "Nepal",
    //   "state": "Bagmati",
    //   "street_address": "Kathmandu, Nepal",
    //   "phone_nos": [
    //       " 9834234234d"
    //   ],
    //   "email": [
    //       "visitor@gmail.com"
    //   ],
    //   "agent_id": "9bb7fddf-2ece-4bc9-b930-d3a4d09a102c",
    //   "going_to_foreign": false,
    //   "remarks": "Test"
    // }
    const { register, reset, watch, control, setError, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: {
            first_name: "",
            last_name: "",
            state: "",
            phone_nos: [" "],
            email: [" "],
        },
        resolver: yupResolver(goingForeign ? visitorsGoingOutSchema : visitorsNotGoingOutSchema),
    });
    // console.log(selectInformationChannel, "selectInformtion Channel");
    useEffect(() => {
        if (selectCommonVisitingPurpose) {
            reset({
                ...watch(),
                visiting_purpose: selectCommonVisitingPurpose?.description,
            });
        }
    }, [reset, selectCommonVisitingPurpose, watch]);
    useEffect(() => {
        if (selectInformationChannel) {
            reset({
                ...watch(),
                information_channel: selectInformationChannel?.description,
            });
        }
    }, [reset, selectInformationChannel, watch]);
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
        setGoingForeign(dataDetails.going_to_foreign);
        const country = getSelectPropsFromCountry(dataDetails?.country);
        const visitingCountry = getSelectPropsFromCountry(dataDetails?.visiting_country);
        const registrationDateObj = moment(dataDetails.registration_date)
            .format()
            .split("T")[0];
        const expectedTakeUpDateObj = moment(dataDetails.expected_take_off_date)
            .format()
            .split("T")[0];
        setSelectedCountry(country);
        setSelectedVisitingCountry(visitingCountry);
        // setSelectedVisaType(dataDetails?.visa_type_id);
        setSelectedAgent(dataDetails?.agent);
        setSelectedVisaType(dataDetails?.visa_type);
        reset({
            ...dataDetails,
            registration_date: registrationDateObj,
            expected_take_off_date: expectedTakeUpDateObj,
            visiting_purpose: dataDetails?.visiting_purpose,
        });
        // console.log(
        //   {
        //     ...dataDetails,
        //     registration_date: registrationDateObj,
        //     expected_take_off_date: expectedTakeUpDateObj,
        //     visiting_purpose: dataDetails?.visiting_purpose,
        //   },
        //   "world hello"
        // );
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
        if (!selectedCountry) {
            toast.error("Please select country");
            return;
        }
        // return console.log(data, "this is tahe data");
        // if (!selectInformationChannel) {
        //     toast.error("Please select information channel");
        //     return;
        // }
        if (goingForeign) {
            if (!selectedVisitingCountry) {
                toast.error("Please select visiting country");
                return;
            }
            // if (!selectedVisaType) {
            //     toast.error("Please select visa type");
            //     return;
            // }
        }
        let response;
        if (location?.state?.data?.id) {
            let updatePayload;
            if (goingForeign) {
                updatePayload = {
                    ...data,
                    registration_date: moment(data.registration_date).format("YYYY-MM-DD HH:mm:ss"),
                    expected_take_off_date: moment(data.expected_take_off_date).format("YYYY-MM-DD HH:mm:ss"),
                    country: selectedCountry?.value ?? "",
                    visa_type_id: selectedVisaType?.id ?? "",
                    going_to_foreign: goingForeign,
                    visiting_country: selectedVisitingCountry?.value ?? "",
                    agent_id: selectedAgent?.id ?? "",
                    information_channel: selectInformationChannel
                        ? selectInformationChannel.description
                        : location?.state?.data?.information_channel,
                    visiting_purpose: selectInformationChannel
                        ? selectInformationChannel.description
                        : location?.state?.data?.visiting_purpose,
                };
            }
            else {
                updatePayload = {
                    registration_date: moment(data.registration_date).format("YYYY-MM-DD HH:mm:ss"),
                    information_channel: selectInformationChannel
                        ? selectInformationChannel.description
                        : location?.state?.data?.information_channel,
                    visiting_purpose: selectInformationChannel
                        ? selectInformationChannel.description
                        : location?.state?.data?.visiting_purpose,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    country: selectedCountry?.value ?? "",
                    state: data.state,
                    visiting_purpose: data.visiting_purpose,
                    street_address: data.street_address,
                    phone_nos: data.phone_nos,
                    email: data.email,
                    agent_id: selectedAgent?.id ?? "",
                    going_to_foreign: goingForeign,
                    remarks: data.remarks,
                };
            }
            // return console.log(
            //   updatePayload,
            //   // selectedAgent,
            //   "this is updated payload"
            // );
            response = await updateData(location?.state?.data?.id, updatePayload);
            if (response?.data?.status === "ok") {
                toast.success("Visitor updated Successfully");
                navigate(-1);
            }
        }
        else {
            let payload;
            if (goingForeign) {
                payload = {
                    ...data,
                    registration_date: moment(data.registration_date).format("YYYY-MM-DD HH:mm:ss"),
                    expected_take_off_date: moment(data.expected_take_off_date).format("YYYY-MM-DD HH:mm:ss"),
                    country: selectedCountry?.value ?? "",
                    visa_type_id: selectedVisaType?.id ?? "",
                    going_to_foreign: goingForeign,
                    visiting_country: selectedVisitingCountry?.value ?? "",
                    agent_id: selectedAgent?.id ?? "",
                    information_channel: selectInformationChannel?.description,
                    visiting_purpose: selectCommonVisitingPurpose?.description,
                };
            }
            else {
                payload = {
                    registration_date: moment(data.registration_date).format("YYYY-MM-DD HH:mm:ss"),
                    information_channel: selectInformationChannel?.description,
                    visiting_purpose: selectCommonVisitingPurpose?.description,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    country: selectedCountry?.value ?? "",
                    state: data.state,
                    // visiting_purpose: data.visiting_purpose,
                    street_address: data.street_address,
                    phone_nos: data.phone_nos,
                    email: data.email,
                    agent_id: selectedAgent?.id ?? "",
                    going_to_foreign: goingForeign,
                    remarks: data.remarks,
                };
            }
            response = await postData(payload);
            if (response?.data?.status === "ok") {
                toast.success("Visitor Added  Successfully");
                navigate(-1);
            }
        }
    });
    return (_jsxs("div", { children: [_jsx(CompanyBreadcrumb, { title: "Customer Manangement Enrollments", showBreadcrumb: true, btnText: "Back" }), _jsxs("div", { className: "card shadow-sm ", children: [_jsxs("div", { className: "card-header", children: [_jsx("h3", { className: "card-title", children: "Add Visitor Details" }), _jsx("div", { className: "card-toolbar", children: _jsx("button", { className: "btn btn-sm btn-secondary", onClick: handleClearForm, children: "Clear" }) })] }), _jsx("div", { className: "card-body", children: _jsx("form", { className: "form w-100 ", onSubmit: onFormSubmit, children: _jsxs("div", { className: "row", children: [_jsxs("div", { className: "col-12 mb-3", children: [_jsx("div", { children: _jsx("h2", { className: "fw-bold mb-5", id: "custom-form-control", children: "Personal Details" }) }), _jsxs("div", { className: "row", children: [_jsx("div", { className: "col-12 col-md-6 gap-5 gap-md-7 mb-6 d-flex align-items-center ", children: _jsx("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container ", children: _jsxs("div", { className: "form-check form-switch form-check-custom form-check-solid ", children: [_jsx(Switch, { style: {
                                                                            backgroundColor: goingForeign ? "#1778ff" : "gray",
                                                                        }, value: goingForeign, onChange: (e) => setGoingForeign(e) }), _jsx("label", { className: "form-check-label tw-text-black tw-font-semibold", children: "Going for Foreign" })] }) }) }), _jsx("div", { className: "col-6 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "Registration Date:" }), _jsx("input", { type: "date", className: "form-control", placeholder: "Enter your first name.", ...register("registration_date") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.registration_date?.message })] }) }), _jsx("div", { className: "col-6 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "Information Channel:" }), _jsx(AsyncReactSelect, { placeholder: "Search..", baseUrl: API_ROUTE.CM_INFORMATION_CHANNEL, setSelectValue: setSelectInformationChannel, selectValue: location?.state?.data
                                                                        ? {
                                                                            id: "",
                                                                            description: location?.state?.data?.information_channel,
                                                                            company_id: "",
                                                                        }
                                                                        : selectInformationChannel, dataId: "id", showDataLabel: "description" })] }) }), _jsx("div", { className: "col-6 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "form-label", children: "Agent:" }), _jsx(AsyncReactSelect, { placeholder: "Search..", baseUrl: API_ROUTE.CM_AGENTS, setSelectValue: setSelectedAgent, 
                                                                    // selectValue={selectedAgent}
                                                                    selectValue: location?.state?.data
                                                                        ? location?.state?.data.agent
                                                                        : selectedAgent, dataId: "id", showDataLabel: "first_name" })] }) }), _jsx("div", { className: "col-6 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "First Name:" }), _jsx("input", { type: "text", className: "form-control", placeholder: "Enter your first name.", ...register("first_name") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.first_name?.message })] }) }), _jsx("div", { className: "col-6 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "Last Name:" }), _jsx("input", { className: "form-control", placeholder: "Enter your last name.", ...register("last_name") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.last_name?.message })] }) }), _jsx("div", { className: "col-6 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "Phone Number:" }), fields.map((field, index) => (_jsxs("div", { className: "form-group mb-3", children: [_jsxs("div", { className: "d-flex", children: [_jsx("input", { className: "form-control me-3", placeholder: `Enter phone number ${index + 1}`, ...register(`phone_nos.${index}`) }), _jsx("div", { className: "flex-center cursor-pointer", children: _jsx(XCircle, { onClick: () => remove(index), color: "gray", size: 25 }) })] }), errors?.phone_nos && errors?.phone_nos[index] && (_jsx("p", { className: "fv-plugins-message-container invalid-feedback ps-2", children: errors?.phone_nos[index]?.message }))] }, field.id))), _jsx("div", { className: "d-flex justify-content-end", children: _jsx("button", { type: "button", className: "btn btn-secondary btn-sm", onClick: () => append(""), children: "Add More Phone Number" }) })] }) }), _jsx("div", { className: "col-6 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "Email Address:" }), emailFields.map((field, index) => (_jsxs("div", { className: "form-group mb-3", children: [_jsxs("div", { className: "d-flex", children: [_jsx("input", { className: "form-control me-3", placeholder: `Enter phone number ${index + 1}`, ...register(`email.${index}`) }), _jsx("div", { className: "flex-center cursor-pointer", children: _jsx(XCircle, { onClick: () => removeEmail(index), color: "gray", size: 25 }) })] }), errors?.email && errors?.email[index] && (_jsx("p", { className: "fv-plugins-message-container invalid-feedback", children: errors?.email[index]?.message }))] }, field.id))), _jsx("div", { className: "d-flex justify-content-end", children: _jsx("button", { type: "button", className: "btn btn-secondary btn-sm", onClick: () => appendEmail(""), children: "Add More Email" }) })] }) })] })] }), _jsx("hr", { className: "bg-gray-100 mb-6 " }), _jsxs("div", { className: "col-12 mb-6", children: [_jsx("div", { children: _jsx("h2", { className: "fw-bold mb-5", id: "custom-form-control", children: "Address Details" }) }), _jsxs("div", { className: "row", children: [_jsx("div", { className: "col-12 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "Full Address" }), _jsx("input", { className: "form-control", placeholder: "Enter your full address.", ...register("street_address") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.street_address?.message })] }) }), _jsx("div", { className: "col-6 gap-5 gap-md-7   mb-6", children: _jsxs("div", { children: [_jsx("label", { className: "required form-label", children: "Visitor's State /province" }), _jsx("input", { className: "form-control", placeholder: "Enter your state", ...register("state") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.state?.message })] }) }), _jsx("div", { className: "col-6  gap-5 gap-md-7   mb-6", children: _jsxs("div", { children: [_jsx("label", { className: "required form-label", children: "Country" }), _jsx(CountryCode, { placeholder: "Select Country", forCountry: true, selectValue: selectedCountry, setSelectValue: setSelectedCountry })] }) }), _jsx("div", { className: "col-6 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "Visiting Purpose:" }), _jsx(AsyncReactSelect, { placeholder: "Search..", baseUrl: API_ROUTE.CM_VISITING_PURPOSES, setSelectValue: setSelectCommonVisitingPurpose, 
                                                                    // selectValue={selectCommonVisitingPurpose}
                                                                    selectValue: location?.state?.data
                                                                        ? {
                                                                            id: "",
                                                                            description: location?.state?.data?.visiting_purpose,
                                                                            company_id: "",
                                                                        }
                                                                        : selectCommonVisitingPurpose, Id: "id", showDataLabel: "description" })] }) }), _jsx("div", { className: "col-12 gap-5 gap-md-7  mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: " form-label", children: "Remarks" }), _jsx("textarea", { className: "form-control", ...register("remarks"), placeholder: "description" }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.remarks?.message })] }) })] })] }), _jsx("hr", { className: "bg-gray-100 mb-6 " }), goingForeign && (_jsxs("div", { className: "col-12 mb-6", children: [_jsx("div", { children: _jsx("h2", { className: "fw-bold mb-5", id: "custom-form-control", children: "Visiting Details" }) }), _jsxs("div", { className: "row", children: [_jsx("div", { className: "col-6  gap-5 gap-md-7   mb-6", children: _jsxs("div", { children: [_jsx("label", { className: "required form-label", children: "Country" }), _jsx(CountryCode, { placeholder: "Select Visiting Country", forCountry: true, selectValue: selectedVisitingCountry, setSelectValue: setSelectedVisitingCountry })] }) }), _jsx("div", { className: "col-6 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "Visa Type" }), _jsx(AsyncReactSelect, { placeholder: "Search..", baseUrl: API_ROUTE.GET_VISA_TYPES, setSelectValue: setSelectedVisaType, 
                                                                    // selectValue={{
                                                                    //   id: "9bb58211-cf13-4ddc-82f2-9bf6ca277ae0",
                                                                    //   description: "",
                                                                    //   name: "Travel",
                                                                    // }}
                                                                    selectValue: location?.state?.data
                                                                        ? location?.state?.data.visa_type
                                                                        : selectedVisaType, dataId: "id", showDataLabel: "name" })] }) }), _jsx("div", { className: "col-6 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "form-label", children: "Visiting State" }), _jsx("input", { className: "form-control", placeholder: "How do you know about our office ?", ...register("visiting_country_state") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.visiting_country_state?.message })] }) }), _jsx("div", { className: "col-6 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "Deal Amount" }), _jsx("input", { className: "form-control", type: "number", placeholder: "Enter deal amount", ...register("deal_amount", {
                                                                        valueAsNumber: true,
                                                                    }) }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.deal_amount?.message })] }) }), _jsx("div", { className: "col-6 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "form-label", children: "Applied Position" }), _jsx("input", { className: "form-control", placeholder: "Enter your visiting purpose.", ...register("applied_position") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.applied_position?.message })] }) }), _jsx("div", { className: "col-6 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "Expected Salary" }), _jsx("input", { type: "number", className: "form-control", placeholder: "Enter your visiting purpose.", ...register("expected_salary_pa", {
                                                                        valueAsNumber: true,
                                                                    }) }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.expected_salary_pa?.message })] }) }), _jsx("div", { className: "col-6 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "Expected Take Off Date" }), _jsx("input", { className: "form-control", type: "date", placeholder: "Enter your visiting purpose.", ...register("expected_take_off_date") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.expected_take_off_date?.message })] }) })] })] })), _jsx("div", { className: "col-12 d-flex justify-content-end", children: _jsx("button", { type: "submit", disabled: isLoading, className: "btn btn-primary  mb-6", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "ms-2", children: "Please Wait..." }), _jsx(Spinner, { size: "sm", animation: "border", role: "status" })] })) : (_jsx("span", { children: location?.state?.data?.id ? "Update" : "Submit" })) }) })] }) }) })] })] }));
};
export default AddVisitor;
