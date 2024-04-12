import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import APP_SETTING from "../../../constants/AppSetting";
import Images from "../../../constants/Images";
import UploadFile from "../../shared/components/Upload";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import API_ROUTE from "../../../service/api";
import { companySchema } from "../../../validations/company.validator";
import Spinner from "react-bootstrap/Spinner";
import useMutation from "../../../hooks/useMutation";
import { toast } from "react-toastify";
import CountryCode from "../../shared/atoms/CountryCode";
import { getSelectPropsFromCountry, getSelectPropsFromCountryCallingCode, } from "../../../functions/country";
import CompanyBreadcrumb from "../../shared/molecules/CompanyBreadcrumb";
const AddCompany = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [oldThumbnil, setOldThumbnil] = useState();
    const [oldCoverImg, setOldCoverImg] = useState();
    const [thumbnilImg, setThumbnilImg] = useState([]);
    const [coverImg, setCoverImg] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(undefined);
    const [selectedCountryCode, setSelectedCountryCode] = useState(undefined);
    const { postData, updateData, isLoading, error, errList } = useMutation(API_ROUTE.POST_COMPANIES, true);
    const { register, reset, setError, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(companySchema),
    });
    useEffect(() => {
        if (location?.state?.data && location?.state?.data?.id) {
            const companyDetails = location?.state?.data;
            reset(companyDetails);
            setOldThumbnil(companyDetails?.logo);
            setOldCoverImg(companyDetails?.cover_image);
            const countryCode = getSelectPropsFromCountryCallingCode(companyDetails?.country_calling_code);
            setSelectedCountryCode(countryCode);
            const country = getSelectPropsFromCountry(companyDetails?.country);
            setSelectedCountry(country);
        }
    }, [location?.state, reset]);
    useEffect(() => {
        if (errList) {
            Object.keys(errList).forEach((fieldName) => {
                const errorMessages = errList[fieldName];
                setError(fieldName, {
                    type: "server",
                    message: errorMessages[0],
                });
            });
        }
    }, [errList, setError]);
    useEffect(() => {
        if (error) {
            toast.error(error || "Something went wrong");
        }
    }, [error]);
    const onFormSubmit = handleSubmit(async (data) => {
        if (!selectedCountryCode) {
            toast.error("Please select country code");
            return;
        }
        if (!selectedCountry) {
            toast.error("Please select country");
            return;
        }
        let response;
        if (location?.state?.data?.id) {
            const tempPostData = {
                ...data,
                country: selectedCountry?.value ?? "",
                country_calling_code: selectedCountryCode?.value ?? "",
                logo: "",
                cover_image: "",
            };
            if (oldThumbnil) {
                tempPostData.logo = oldThumbnil;
            }
            else {
                tempPostData.logo = thumbnilImg?.[0] ?? "";
            }
            if (oldCoverImg) {
                tempPostData.cover_image = oldCoverImg;
            }
            else {
                tempPostData.cover_image = coverImg?.[0] ?? "";
            }
            response = await updateData(location?.state?.data?.id, tempPostData);
            if (response?.data?.status === "ok") {
                toast.success("Company updated Successfully");
                navigate("/", { replace: true });
            }
        }
        else {
            if (thumbnilImg?.length === 0) {
                toast.error("Please upload company logo");
            }
            if (coverImg?.length === 0) {
                toast.error("Please upload company cover image");
            }
            const tempPostData = {
                ...data,
                country: selectedCountry?.value ?? "",
                country_calling_code: selectedCountryCode?.value ?? "",
                logo: thumbnilImg?.[0] ?? "",
                cover_image: coverImg?.[0] ?? "",
            };
            response = await postData(tempPostData);
            if (response?.data?.status === "ok") {
                toast.success("Company Added Successfully");
                navigate("/", { replace: true });
            }
        }
    });
    return (_jsxs("div", { className: "container", children: [_jsx(CompanyBreadcrumb, { title: location?.state?.data?.id ? "Edit Company Details" : "Create Company", btnText: "Back", showBreadcrumb: true }), _jsx("section", { children: _jsxs("form", { className: "form w-100 ", onSubmit: onFormSubmit, children: [_jsxs("div", { className: "row align-items-stretch mb-6", children: [_jsx("div", { className: "col-12 col-md-6 col-lg-4", children: _jsxs("div", { className: "card card-flush py-4", children: [_jsx("div", { className: "card-header", children: _jsx("div", { className: "card-title mx-auto", children: _jsx("h5", { className: " required", children: location?.state?.data?.id
                                                            ? "Edit Company's Logo"
                                                            : "Upload Company's Logo" }) }) }), _jsxs("div", { className: "card-body  pt-0", children: [_jsxs("div", { className: "image-input image-input-empty image-input-outline image-input-placeholder mb-3", "data-kt-image-input": "true", children: [_jsxs("div", { className: "d-flex justify-content-around align-items-center mb-6", children: [location?.state?.data && (_jsx("div", { className: "image-input-wrapper w-100px h-100px p-2", children: oldThumbnil ? (_jsx("img", { className: thumbnilImg && thumbnilImg?.length > 0
                                                                                ? "img-fluid rounded opacity-20 "
                                                                                : "img-fluid rounded", src: `${APP_SETTING}${oldThumbnil}`, alt: 'Company"s logo' })) : (_jsx("p", { className: "text center text-muted", children: "No Company logo found." })) })), thumbnilImg && thumbnilImg?.length > 0 && (_jsx("div", { className: "image-input-wrapper w-100px h-100px p-2", children: _jsx("img", { className: "img-fluid rounded", src: `${APP_SETTING}${thumbnilImg[0]}`, alt: "company logo" }) })), !location?.state?.data && thumbnilImg?.length === 0 && (_jsx("div", { className: "image-input-wrapper w-100px h-100px p-2", children: _jsx("img", { className: "img-fluid rounded", src: Images.BlackImg, alt: "blank" }) }))] }), _jsx("div", { children: _jsx(UploadFile, { fileUploadLimit: 1, fileUploadType: "IMAGE", isUploadRequired: false, isRoutePrivate: true, isMultiple: false, setFileInfo: setThumbnilImg, fileInfo: thumbnilImg }) })] }), _jsx("div", { className: "text-muted fs-7", children: "Only *.png, *.jpg and *.jpeg image files are accepted" })] })] }) }), _jsx("div", { className: "col-12 col-md-6 col-lg-8  ", children: _jsxs("div", { className: "card card-flush py-4", children: [_jsx("div", { className: "card-header", children: _jsx("div", { className: "card-title", children: _jsx("h5", { className: "required", children: location?.state?.data?.id
                                                            ? "Edit Company's cover photo"
                                                            : "Upload Company's cover photo" }) }) }), _jsxs("div", { className: "card-body  pt-0", children: [_jsxs("div", { className: "image-input image-input-empty image-input-outline image-input-placeholder mb-3", "data-kt-image-input": "true", children: [_jsxs("div", { className: "d-flex justify-content-around align-items-center gap-6 mb-6", children: [location?.state?.data && (_jsx("div", { className: "cover-image-wrapper  h-100px  m-2", children: oldCoverImg ? (_jsx("img", { className: coverImg && coverImg?.length > 0
                                                                                ? "img-thumbnail  img-fluid img-thumbnil h-100px rounded opacity-20 "
                                                                                : "img-thumbnail img-fluid rounded", src: `${APP_SETTING}${oldCoverImg}`, alt: 'Company"s logo' })) : (_jsx("p", { className: "text center text-muted", children: "No Company logo found." })) })), coverImg && coverImg?.length > 0 && (_jsx("div", { className: "cover-image-wrapper h-100px m-2", children: _jsx("img", { className: "img-thumbnail img-fluid rounded", src: `${APP_SETTING}${coverImg[0]}`, alt: "cover Image" }) })), !location?.state?.data && coverImg?.length === 0 && (_jsx("div", { className: "dropzone dz-clickable h-100px", id: "kt_ecommerce_add_product_media", children: _jsxs("div", { className: "dz-message needsclick", children: [_jsx("i", { className: "ki-outline ki-file-up text-primary fs-3x" }), _jsx("div", { className: "ms-4", children: _jsx("h3", { className: "fs-5 fw-bold text-gray-900 mb-1", children: "Upload cover Image" }) })] }) }))] }), _jsx("div", { children: _jsx(UploadFile, { fileUploadLimit: 1, fileUploadType: "IMAGE", isUploadRequired: true, isRoutePrivate: true, isMultiple: false, setFileInfo: setCoverImg, fileInfo: coverImg }) })] }), _jsx("div", { className: "text-muted fs-7", children: "Only *.png, *.jpg and *.jpeg image files are accepted" })] })] }) })] }), _jsx("div", { className: "row mb-6", children: _jsxs("div", { className: "card card-flush", children: [_jsx("div", { className: "card-header", children: _jsx("div", { className: "card-title", children: _jsx("h2", { children: "Company Details" }) }) }), _jsx("div", { className: "card-body pt-0", children: _jsxs("div", { className: "row", children: [_jsx("div", { className: "col-12 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "Name:" }), _jsx("input", { className: "form-control", placeholder: "Company name", ...register("name") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.name?.message })] }) }), _jsx("div", { className: "col-12 col-md-6 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "Website" }), _jsx("input", { className: "form-control", ...register("website"), placeholder: "website url" }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.website?.message })] }) }), _jsx("div", { className: "col-12 col-md-6 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "Website Subdomain" }), _jsx("input", { className: "form-control", placeholder: "website subdomain", ...register("subdomain") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.subdomain?.message })] }) }), _jsx("div", { className: "col-12 col-md-6 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "Email" }), _jsx("input", { className: "form-control", ...register("email"), placeholder: "Email Address" }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.email?.message })] }) }), _jsx("div", { className: "col-12 col-md-6  mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "Contact Person" }), _jsx("input", { className: "form-control", placeholder: "Enter contact person name", ...register("contact_person") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.contact_person?.message })] }) }), _jsx("div", { className: "col-12 col-md-6 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "Registration Type" }), _jsx("input", { className: "form-control", placeholder: "Enter registration type", ...register("registration_type") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.registration_type?.message })] }) }), _jsx("div", { className: "col-12 col-md-6  mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "Registration Number" }), _jsx("input", { className: "form-control", placeholder: "Enter registration number", ...register("registration_number") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.registration_number?.message })] }) })] }) })] }) }), _jsxs("div", { className: "row mb-6", children: [_jsxs("div", { className: "card card-flush", children: [_jsx("div", { className: "card-header", children: _jsx("div", { className: "card-title", children: _jsx("h2", { children: "Company Address" }) }) }), _jsx("div", { className: "card-body pt-0", children: _jsxs("div", { className: "row", children: [_jsx("div", { className: "col-12 mb-6", children: _jsxs("div", { className: " flex-row-fluid", children: [_jsx("label", { className: "required form-label", children: "Address Line" }), _jsx("input", { className: "form-control", placeholder: "Enter your full address", ...register("address") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.address?.message })] }) }), _jsx("div", { className: "col-3 col-md-4 mb-6", children: _jsxs("div", { className: " flex-row-fluid", children: [_jsx("label", { className: "required form-label", children: "Country Calling Code" }), _jsx(CountryCode, { placeholder: "Select Country Code", forCountry: false, selectValue: selectedCountryCode, setSelectValue: setSelectedCountryCode })] }) }), _jsx("div", { className: "col-9 col-md-8 mb-6", children: _jsxs("div", { className: " flex-row-fluid", children: [_jsx("label", { className: "required form-label", children: "Phone Number" }), _jsx("input", { className: "form-control", placeholder: "Enter your phone number", ...register("phone_number") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.phone_number?.message })] }) }), _jsx("div", { className: "col-12 col-md-6  mb-6", children: _jsxs("div", { className: " flex-row-fluid", children: [_jsx("label", { className: "required form-label", children: "City" }), _jsx("input", { className: "form-control", placeholder: "Enter your city address", ...register("city") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.city?.message })] }) }), _jsx("div", { className: "col-12 col-md-6  mb-6", children: _jsxs("div", { className: " flex-row-fluid", children: [_jsx("label", { className: "required form-label", children: "State" }), _jsx("input", { className: "form-control", placeholder: "Enter your state", ...register("state") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.state?.message })] }) }), _jsx("div", { className: "col-12 col-md-6  mb-6", children: _jsxs("div", { className: " flex-row-fluid", children: [_jsx("label", { className: "required form-label", children: "Postal Code" }), _jsx("input", { className: "form-control", placeholder: "Enter your postal code", ...register("postal_code") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.postal_code?.message })] }) }), _jsx("div", { className: "col-12 col-md-6  mb-6", children: _jsxs("div", { className: " flex-row-fluid", children: [_jsx("label", { className: "required form-label", children: "Country" }), _jsx(CountryCode, { placeholder: "Select Country", forCountry: true, selectValue: selectedCountry, setSelectValue: setSelectedCountry })] }) })] }) })] }), _jsxs("div", { className: "d-flex justify-content-end my-6 mb-6", children: [_jsx("button", { type: "button", onClick: () => navigate(-1), className: "btn btn-secondary btn-sm me-5 mb-6", children: "cancel" }), _jsx("button", { type: "submit", disabled: isLoading, className: "btn btn-primary  mb-6", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "ms-2", children: "Please Wait..." }), _jsx(Spinner, { size: "sm", animation: "border", role: "status" })] })) : (_jsx("span", { children: location?.state?.data?.id ? "Update" : "Submit" })) })] })] })] }) })] }));
};
export default AddCompany;
