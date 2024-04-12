import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from "react";
import APP_SETTING from "../../../../config/AppSetting";
import { enrollmentSchema } from "../../../../validations/crm.validators";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CountryCode from "../../../shared/atoms/CountryCode";
import Images from "../../../../constants/Images";
import UploadFile from "../../../shared/components/Upload";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { getSelectPropsFromCountry } from "../../../../functions/country";
import useValidationError from "../../../../hooks/useValidationError";
import API_ROUTE from "../../../../service/api";
import useMutation from "../../../../hooks/useMutation";
import { Spinner } from "react-bootstrap";
import useHandleShowError from "../../../../hooks/useHandleShowError";
import CompanyBreadcrumb from "../../../shared/molecules/CompanyBreadcrumb";
const Add = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedCountry, setSelectedCountry] = useState(undefined);
    const [oldThumbnil, setOldThumbnil] = useState();
    const [thumbnilImg, setThumbnilImg] = useState([]);
    const { updateData, postData, isLoading, error, errList } = useMutation(API_ROUTE.CM_ENROLLMENT, true);
    const { register, reset, setError, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(enrollmentSchema),
    });
    useValidationError({ errList, setError });
    useHandleShowError(error);
    const handleResetForm = useCallback(() => {
        const companyDetails = location?.state?.data;
        const { logo, country, ...rest } = companyDetails;
        reset(rest);
        setOldThumbnil(logo);
        const countryValue = getSelectPropsFromCountry(country);
        setSelectedCountry(countryValue);
        setThumbnilImg(undefined);
    }, [location?.state?.data, reset]);
    useEffect(() => {
        if (location?.state?.data && location?.state?.data?.id) {
            handleResetForm();
        }
    }, [handleResetForm, location?.state, reset]);
    const handleClearForm = () => {
        reset({
            name: "",
            website: "",
            state: "",
            description: "",
        });
        setSelectedCountry(undefined);
    };
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
                logo: "",
                description: data?.description ?? "",
            };
            if (thumbnilImg) {
                tempPostData.logo = thumbnilImg?.[0] ?? "";
            }
            else if (oldThumbnil) {
                tempPostData.logo = oldThumbnil;
            }
            // return console.log(tempPostData);
            response = await updateData(location?.state?.data?.id, tempPostData);
            if (response?.data?.status === "ok") {
                toast.success("Institute updated Successfully");
                navigate(-1);
            }
        }
        else {
            if (thumbnilImg?.length === 0) {
                toast.error("Please upload company logo");
            }
            const tempPostData = {
                ...data,
                country: selectedCountry?.value ?? "",
                logo: thumbnilImg?.[0] ?? "",
                description: data?.description ?? "",
            };
            response = await postData(tempPostData);
            if (response?.data?.status === "ok") {
                toast.success("Institute  Enrolled  Successfully");
                navigate(-1);
            }
        }
    });
    return (_jsxs("div", { children: [_jsx(CompanyBreadcrumb, { title: location?.state?.data?.id ? "Update Institute" : "Add Institute", showBreadcrumb: true, btnText: "Back" }), _jsxs("div", { className: "card shadow-sm ", children: [_jsxs("div", { className: "card-header", children: [_jsx("h3", { className: "card-title", children: location?.state?.data?.id
                                    ? "Update Institute Details"
                                    : "Add Institute Details" }), _jsx("div", { className: "card-toolbar", children: location?.state?.data?.id ? (_jsx("button", { className: "btn btn-sm tw-bg-appBlue hover:tw-bg-appBlueHover tw-text-white hover:tw-text-white", onClick: handleResetForm, children: "Reset" })) : (_jsx("button", { className: "btn btn-sm btn-info", onClick: handleClearForm, children: "Clear" })) })] }), _jsx("div", { className: "card-body", children: _jsx("form", { className: "form w-100 ", onSubmit: onFormSubmit, children: _jsxs("div", { className: "row", children: [_jsx("div", { className: "col-12", children: _jsxs("div", { className: "row", children: [_jsxs("div", { className: "col-12 col-md-6 gap-md-7 mb-6", children: [_jsxs("div", { className: "image-input image-input-empty image-input-outline image-input-placeholder mb-3", "data-kt-image-input": "true", children: [_jsx("h4", { className: "mb-2", children: "Company's Logo" }), _jsxs("div", { className: "d-flex justify-content-around align-items-center mb-6", children: [location?.state?.data && (_jsx("div", { className: "image-input-wrapper w-100px h-100px p-2", children: oldThumbnil ? (_jsx("img", { className: thumbnilImg && thumbnilImg?.length > 0
                                                                                    ? "img-fluid rounded opacity-20 "
                                                                                    : "img-fluid rounded", src: `${APP_SETTING.VITE_BASE_URL}${oldThumbnil}`, alt: 'Company"s logo' })) : (_jsx("p", { className: "text center text-muted", children: "No Company logo found." })) })), thumbnilImg && thumbnilImg?.length > 0 && (_jsx("div", { className: "image-input-wrapper w-100px h-100px p-2", children: _jsx("img", { className: "img-fluid rounded", src: `${APP_SETTING.VITE_BASE_URL}${thumbnilImg[0]}`, alt: "company logo" }) })), !location?.state?.data &&
                                                                            thumbnilImg?.length === 0 && (_jsx("div", { className: "image-input-wrapper w-100px h-100px p-2", children: _jsx("img", { className: "img-fluid rounded", src: Images.BlackImg, alt: "blank" }) }))] }), _jsx("div", { children: _jsx(UploadFile, { fileUploadLimit: 1, fileUploadType: "IMAGE", isUploadRequired: false, isRoutePrivate: true, isMultiple: false, setFileInfo: setThumbnilImg, fileInfo: thumbnilImg }) })] }), _jsx("div", { className: "text-muted fs-7", children: "Only *.png, *.jpg and *.jpeg image files are accepted" })] }), _jsx("div", { className: "col-12 col-md-6", children: _jsxs("div", { className: "row", children: [_jsx("div", { className: "col-12 gap-5 gap-md-7  mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "Website" }), _jsx("input", { className: "form-control", ...register("website"), placeholder: "website url" }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.website?.message })] }) }), _jsx("div", { className: "col-12 gap-5 gap-md-7   mb-6", children: _jsxs("div", { children: [_jsx("label", { className: "required form-label", children: "State" }), _jsx("input", { className: "form-control", placeholder: "Enter your state", ...register("state") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.state?.message })] }) }), _jsx("div", { className: "col-12  gap-5 gap-md-7   mb-6", children: _jsxs("div", { children: [_jsx("label", { className: "required form-label", children: "Country" }), _jsx(CountryCode, { placeholder: "Select Country", forCountry: true, selectValue: selectedCountry, setSelectValue: setSelectedCountry })] }) })] }) })] }) }), _jsx("div", { className: "col-12 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "College/University Name:" }), _jsx("input", { className: "form-control", placeholder: "College/University name", ...register("name") }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.name?.message })] }) }), _jsx("div", { className: "col-12 gap-5 gap-md-7  mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: " form-label", children: "Description" }), _jsx("textarea", { className: "form-control", ...register("description"), placeholder: "description" }), _jsx("div", { className: "fv-plugins-message-container invalid-feedback", children: errors.website?.message })] }) }), _jsx("div", { className: "col-12 d-flex justify-content-end", children: _jsx("button", { type: "submit", disabled: isLoading, className: "btn btn-primary  mb-6", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "ms-2", children: "Please Wait..." }), _jsx(Spinner, { size: "sm", animation: "border", role: "status" })] })) : (_jsx("span", { children: location?.state?.data?.id ? "Update" : "Submit" })) }) })] }) }) })] })] }));
};
export default Add;
