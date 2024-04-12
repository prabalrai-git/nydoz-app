import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import Images from "../../../../constants/Images";
import UploadFile from "../../../shared/components/Upload";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import API_ROUTE from "../../../../service/api";
import { agentSchema } from "../../../../validations/company.validator";
import Spinner from "react-bootstrap/Spinner";
import useMutation from "../../../../hooks/useMutation";
import { toast } from "react-toastify";
import CountryCode from "../../../shared/atoms/CountryCode";
import { getSelectPropsFromCountry } from "../../../../functions/country";
import CompanyBreadcrumb from "../../../shared/molecules/CompanyBreadcrumb";
import useValidationError from "../../../../hooks/useValidationError";
import useHandleShowError from "../../../../hooks/useHandleShowError";
const AddCompany = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [oldThumbnil, setOldThumbnil] = useState();
    const [thumbnilImg, setThumbnilImg] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(undefined);
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const { postData, updateData, isLoading, error, errList } = useMutation(API_ROUTE.CLIENT_MANAGEMENT_AGENTS, true);
    const { register, reset, setError, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(agentSchema),
    });
    useValidationError({ errList, setError });
    useHandleShowError(error);
    useEffect(() => {
        if (location?.state?.data && location?.state?.data?.id) {
            reset(location?.state?.data);
            setOldThumbnil(location?.state?.data?.profile_picture);
            const country = getSelectPropsFromCountry(location?.state?.data?.country);
            setSelectedCountry(country);
        }
    }, [location?.state?.data, reset]);
    const onFormSubmit = handleSubmit(async (data) => {
        if (!selectedCountry) {
            toast.error("Please select country");
            return;
        }
        let response;
        if (location?.state?.data?.id) {
            const tempPostData = {
                ...data,
                country: selectedCountry?.value ?? "",
                profile_picture: "",
            };
            if (thumbnilImg?.[0]) {
                tempPostData.profile_picture = thumbnilImg?.[0] ?? "";
            }
            else if (oldThumbnil) {
                tempPostData.profile_picture = oldThumbnil;
            }
            response = await updateData(location?.state?.data?.id, tempPostData);
            if (response?.data?.status === "ok") {
                toast.success("Agent updated Successfully");
                navigate(-1);
            }
        }
        else {
            // if (thumbnilImg?.length === 0) {
            //     toast.error("Please upload profile picture");
            // }
            const tempPostData = {
                ...data,
                country: selectedCountry?.value ?? "",
                profile_picture: thumbnilImg?.[0] ?? "",
            };
            response = await postData(tempPostData);
            if (response?.data?.status === "ok") {
                toast.success("Agent Added Successfully");
                navigate(-1);
            }
        }
    });
    return (_jsxs("div", { className: " my-6", children: [_jsx(CompanyBreadcrumb, { title: "Customer Manangement Agents", showBreadcrumb: true, btnText: "Back" }), _jsxs("div", { className: "card shadow-sm", children: [_jsxs("div", { className: "card-header", children: [_jsx("h3", { className: "card-title", children: "Add Agents Details" }), _jsx("div", { className: "card-toolbar", children: _jsx("button", { className: "btn btn-sm btn-secondary", children: "Clear" }) })] }), _jsx("div", { className: "card-body", children: _jsx("form", { className: "form w-100 px-6", onSubmit: onFormSubmit, children: _jsxs("div", { children: [_jsx("div", { className: "row", children: _jsx("div", { className: "col-12 ", children: _jsxs("div", { className: "row ", children: [_jsx("div", { className: "col-12 col-md-6", children: _jsxs("div", { className: "card card-flush", children: [_jsx("div", { className: "card-header", children: _jsx("div", { className: "card-title", children: _jsx("h5", { className: "required", children: "Upload profile picture" }) }) }), _jsx("div", { className: "card-body  pt-0", children: _jsxs("div", { children: [_jsxs("div", { className: "image-input image-input-empty image-input-outline image-input-placeholder mb-3", "data-kt-image-input": "true", children: [_jsxs("div", { className: "d-flex justify-content-around align-items-center", children: [location?.state?.data && (_jsx("div", { className: "image-input-wrapper w-100px h-100px p-2", children: oldThumbnil ? (_jsx("img", { className: thumbnilImg && thumbnilImg?.length > 0
                                                                                                        ? "img-fluid rounded opacity-20 "
                                                                                                        : "img-fluid rounded", src: `${BASE_URL}${oldThumbnil}`, alt: 'Company"s logo' })) : (_jsx("p", { className: "text center text-muted tw-text-base tw-text-center tw-mt-6", children: "Profile image not found!" })) })), thumbnilImg && thumbnilImg?.length > 0 && (_jsx("div", { className: "image-input-wrapper w-100px h-100px p-2", children: _jsx("img", { className: "img-fluid rounded", src: `${BASE_URL}${thumbnilImg[0]}`, alt: "company logo" }) })), !location?.state?.data &&
                                                                                                thumbnilImg?.length === 0 && (_jsx("div", { className: "image-input-wrapper w-100px h-100px p-2", children: _jsx("img", { className: "img-fluid rounded", src: Images.BlackImg, alt: "blank" }) }))] }), _jsx("div", { className: "text-center", children: _jsx(UploadFile, { fileUploadLimit: 1, fileUploadType: "IMAGE", isUploadRequired: false, isRoutePrivate: true, isMultiple: false, setFileInfo: setThumbnilImg, fileInfo: thumbnilImg }) })] }), _jsx("div", { className: "text-muted fs-7", children: "Only *.png, *.jpg and *.jpeg image files are accepted." })] }) })] }) }), _jsx("div", { className: "col-12 col-md-6", children: _jsxs("div", { className: "row ", children: [_jsx("div", { className: "col-12  gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "First Name" }), _jsx("input", { type: "text", className: "form-control", placeholder: "Enter your first name", ...register("first_name") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback px-3", children: errors.first_name?.message })] }) }), _jsx("div", { className: "col-12  gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "Last Name" }), _jsx("input", { type: "text", className: "form-control", placeholder: "Enter your last name", ...register("last_name") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.last_name?.message })] }) }), _jsx("div", { className: "col-12  gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "Email" }), _jsx("input", { className: "form-control", type: "text", ...register("email"), placeholder: "Enter Email Address" }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.email?.message })] }) }), _jsx("div", { className: "col-12  gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "Mobile Number" }), _jsx("input", { className: "form-control", type: "text", placeholder: "Enter mobile number", ...register("mobile") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.mobile?.message })] }) })] }) })] }) }) }), _jsxs("div", { className: "row", children: [_jsx("div", { className: "col-12 my-3", children: _jsx("h4", { children: "Agent Address" }) }), _jsx("div", { className: "col-12 mb-6", children: _jsxs("div", { className: " flex-row-fluid", children: [_jsx("label", { className: "required form-label", children: "Street Address" }), _jsx("input", { className: "form-control", type: "text", placeholder: "Enter your full address", ...register("street_address") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.street_address?.message })] }) }), _jsx("div", { className: "col-12 col-md-6 mb-6", children: _jsxs("div", { className: " flex-row-fluid", children: [_jsx("label", { className: "required form-label", children: "City" }), _jsx("input", { type: "text", className: "form-control", placeholder: "Enter your city", ...register("city") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.city?.message })] }) }), _jsx("div", { className: "col-12 col-md-6  mb-6", children: _jsxs("div", { className: " flex-row-fluid", children: [_jsx("label", { className: "required form-label", children: "State" }), _jsx("input", { className: "form-control", type: "text", placeholder: "Enter your state", ...register("state") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.state?.message })] }) }), _jsx("div", { className: "col-12 col-md-6  mb-6", children: _jsxs("div", { className: " flex-row-fluid", children: [_jsx("label", { className: "required form-label", children: "Postal Code" }), _jsx("input", { className: "form-control", type: "text", placeholder: "Enter your postal code", ...register("postal_code") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.postal_code?.message })] }) }), _jsx("div", { className: "col-12 col-md-6  mb-6", children: _jsxs("div", { className: " flex-row-fluid", children: [_jsx("label", { className: "required form-label", children: "Country" }), _jsx(CountryCode, { placeholder: "Select Country", forCountry: true, selectValue: selectedCountry, setSelectValue: setSelectedCountry })] }) })] }), _jsxs("div", { className: "d-flex justify-content-end my-6 mb-6", children: [_jsx("button", { type: "button", onClick: () => navigate(-1), className: "btn btn-secondary btn-sm me-5 mb-6", children: "cancel" }), _jsx("button", { type: "submit", disabled: isLoading, className: "btn btn-primary btn-sm mb-6", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "ms-2", children: "Please Wait..." }), _jsx(Spinner, { size: "sm", animation: "border", role: "status" })] })) : (_jsx("span", { children: location?.state?.data?.id ? "Update" : "Save" })) })] })] }) }) })] })] }));
};
export default AddCompany;
