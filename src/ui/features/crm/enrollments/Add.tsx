import { useState, useEffect, useCallback } from "react";
import APP_SETTING from "../../../../config/AppSetting";
import { enrollmentSchema } from "../../../../validations/crm.validators";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CountryCode from "../../../shared/atoms/CountryCode";
import { ISelectProps } from "../../../../types/react-select.type";
import Images from "../../../../constants/Images";
import UploadFile from "../../../shared/components/Upload";
import { useNavigate, useLocation } from "react-router-dom";
import {
    IEnrollmentPayload,
    IEnrollmentResponse,
} from "../../../../types/products.types";
import { toast } from "react-toastify";
import { getSelectPropsFromCountry } from "../../../../functions/country";
import useValidationError from "../../../../hooks/useValidationError";
import API_ROUTE from "../../../../service/api";
import useMutation from "../../../../hooks/useMutation";
import { Spinner } from "react-bootstrap";
import useHandleShowError from "../../../../hooks/useHandleShowError";
import CompanyBreadcrumb from "../../../shared/molecules/CompanyBreadcrumb";

interface IFormData {
    name: string;
    website: string;
    state: string;
    description: string | undefined;
}

const Add = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedCountry, setSelectedCountry] = useState<
        ISelectProps | undefined
    >(undefined);
    const [oldThumbnil, setOldThumbnil] = useState<string | undefined>();
    const [thumbnilImg, setThumbnilImg] = useState<string[] | undefined>([]);

    const { updateData, postData, isLoading, error, errList } = useMutation(
        API_ROUTE.CM_ENROLLMENT,
        true
    );

    const {
        register,
        reset,
        setError,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormData>({
        resolver: yupResolver(enrollmentSchema),
    });

    useValidationError({ errList, setError });
    useHandleShowError(error);

    const handleResetForm = useCallback(() => {
        const companyDetails: IEnrollmentResponse = location?.state?.data;
        // console.log(companyDetails, "companyDetails");

        const { logo, country, ...rest } = companyDetails;

        reset(rest);
        setOldThumbnil(logo);
        const countryValue = getSelectPropsFromCountry(country);
        setSelectedCountry(countryValue);
        setThumbnilImg(undefined);
    }, [location?.state?.data, reset]);

    useEffect(() => {
        console.log(location?.state);
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

    const onFormSubmit = handleSubmit(async (data: IFormData) => {
        if (!selectedCountry) {
            toast.error("Please select country");
            return;
        }

        let response;

        if (location?.state?.data?.id) {
            const tempPostData: IEnrollmentPayload = {
                ...data,
                country: selectedCountry?.value ?? "",
                logo: "",
                description: data?.description ?? "",
            };

            if (oldThumbnil) {
                tempPostData.logo = oldThumbnil;
            } else {
                tempPostData.logo = thumbnilImg?.[0] ?? "";
            }

            response = await updateData(
                location?.state?.data?.id,
                tempPostData
            );
            if (response?.data?.status === "ok") {
                toast.success("Institute updated Successfully");
                navigate(-1);
            }
        } else {
            if (thumbnilImg?.length === 0) {
                toast.error("Please upload company logo");
            }

            const tempPostData: IEnrollmentPayload = {
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
    return (
        <div>
            <CompanyBreadcrumb
                title={
                    location?.state?.data?.id
                        ? "Update Institute"
                        : "Add Institute"
                }
                showBreadcrumb={true}
                btnText='Back'
            />
            <div className='card shadow-sm '>
                <div className='card-header'>
                    <h3 className='card-title'>
                        {location?.state?.data?.id
                            ? "Update Institute Details"
                            : "Add Institute Details"}
                    </h3>
                    <div className='card-toolbar'>
                        {location?.state?.data?.id ? (
                            <button
                                className='btn btn-sm btn-info'
                                onClick={handleResetForm}>
                                Reset
                            </button>
                        ) : (
                            <button
                                className='btn btn-sm btn-info'
                                onClick={handleClearForm}>
                                Clear
                            </button>
                        )}
                    </div>
                </div>
                <div className='card-body'>
                    <form className='form w-100 ' onSubmit={onFormSubmit}>
                        <div className='row'>
                            <div className='col-12'>
                                <div className='row'>
                                    <div className='col-12 col-md-6 gap-md-7 mb-6'>
                                        <div
                                            className='image-input image-input-empty image-input-outline image-input-placeholder mb-3'
                                            data-kt-image-input='true'>
                                            <h4 className='mb-2'>
                                                Company's Logo
                                            </h4>
                                            <div className='d-flex justify-content-around align-items-center mb-6'>
                                                {location?.state?.data && (
                                                    <div className='image-input-wrapper w-100px h-100px p-2'>
                                                        {oldThumbnil ? (
                                                            <img
                                                                className={
                                                                    thumbnilImg &&
                                                                    thumbnilImg?.length >
                                                                        0
                                                                        ? "img-fluid rounded opacity-20 "
                                                                        : "img-fluid rounded"
                                                                }
                                                                src={`${APP_SETTING.VITE_BASE_URL}${oldThumbnil}`}
                                                                alt='Company"s logo'
                                                            />
                                                        ) : (
                                                            <p className='text center text-muted'>
                                                                No Company logo
                                                                found.
                                                            </p>
                                                        )}
                                                    </div>
                                                )}

                                                {thumbnilImg &&
                                                    thumbnilImg?.length > 0 && (
                                                        <div className='image-input-wrapper w-100px h-100px p-2'>
                                                            <img
                                                                className='img-fluid rounded'
                                                                src={`${APP_SETTING.VITE_BASE_URL}${thumbnilImg[0]}`}
                                                                alt='company logo'
                                                            />
                                                        </div>
                                                    )}

                                                {!location?.state?.data &&
                                                    thumbnilImg?.length ===
                                                        0 && (
                                                        <div className='image-input-wrapper w-100px h-100px p-2'>
                                                            <img
                                                                className='img-fluid rounded'
                                                                src={
                                                                    Images.BlackImg
                                                                }
                                                                alt='blank'
                                                            />
                                                        </div>
                                                    )}
                                            </div>
                                            <div>
                                                <UploadFile
                                                    fileUploadLimit={1}
                                                    fileUploadType='IMAGE'
                                                    isUploadRequired={false}
                                                    isRoutePrivate={true}
                                                    isMultiple={false}
                                                    setFileInfo={setThumbnilImg}
                                                    fileInfo={thumbnilImg}
                                                />
                                            </div>
                                        </div>

                                        <div className='text-muted fs-7'>
                                            Only *.png, *.jpg and *.jpeg image
                                            files are accepted
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-6'>
                                        <div className='row'>
                                            <div className='col-12 gap-5 gap-md-7  mb-6'>
                                                <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                                    <label className='required form-label'>
                                                        Website
                                                    </label>
                                                    <input
                                                        className='form-control'
                                                        {...register("website")}
                                                        placeholder='website url'
                                                    />
                                                    <div className='fv-plugins-message-container invalid-feedback'>
                                                        {
                                                            errors.website
                                                                ?.message
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-12 gap-5 gap-md-7   mb-6'>
                                                <div>
                                                    <label className='required form-label'>
                                                        State
                                                    </label>
                                                    <input
                                                        className='form-control'
                                                        placeholder='Enter your state'
                                                        {...register("state")}
                                                    />
                                                    <div className='fv-plugins-message-container invalid-feedback'>
                                                        {errors.state?.message}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-12  gap-5 gap-md-7   mb-6'>
                                                <div>
                                                    <label className='required form-label'>
                                                        Country
                                                    </label>
                                                    <CountryCode
                                                        placeholder='Select Country'
                                                        forCountry={true}
                                                        selectValue={
                                                            selectedCountry
                                                        }
                                                        setSelectValue={
                                                            setSelectedCountry
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='col-12 gap-5 gap-md-7 mb-6'>
                                <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                    <label className='required form-label'>
                                        College/University Name:
                                    </label>
                                    <input
                                        className='form-control'
                                        placeholder='College/University name'
                                        {...register("name")}
                                    />
                                    <div className='fv-plugins-message-container invalid-feedback'>
                                        {errors.name?.message}
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 gap-5 gap-md-7  mb-6'>
                                <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                    <label className=' form-label'>
                                        Description
                                    </label>
                                    <textarea
                                        className='form-control'
                                        {...register("description")}
                                        placeholder='description'
                                    />
                                    <div className='fv-plugins-message-container invalid-feedback'>
                                        {errors.website?.message}
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 d-flex justify-content-end'>
                                <button
                                    type='submit'
                                    disabled={isLoading}
                                    className='btn btn-primary  mb-6'>
                                    {isLoading ? (
                                        <>
                                            <span className='ms-2'>
                                                Please Wait...
                                            </span>
                                            <Spinner
                                                size='sm'
                                                animation='border'
                                                role='status'></Spinner>
                                        </>
                                    ) : (
                                        <span>
                                            {location?.state?.data?.id
                                                ? "Update"
                                                : "Submit"}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Add;
