import { useState } from "react";
import { motion } from "framer-motion";
import Images from "../../../constants/Images";
import UploadFile from "../../shared/components/Upload";
import Heading from "../../shared/molecules/Heading";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import API_ROUTE from "../../../service/api";
import { companySchema } from "../../../validations/company.validator";
import Spinner from "react-bootstrap/Spinner";
import useMutation from "../../../hooks/useMutation";
import { ToastContainer, toast } from "react-toastify";
import CountryCode from "../../shared/atoms/CountryCode";
import { ISelectProps } from "../../../types/react-select.type";
import { ICompanyResponse } from "../../../types/payload.type";

interface IAddCompanyForm {
    name: string;
    subdomain: string;
    email: string;
    address: string;
    state: string;
    city: string;
    postal_code: string;
    phone_number: string;
    contact_person: string;
    website: string;
    registration_type: string;
    registration_number: string;
}

interface IAddCompanyPayload {
    name: string;
    subdomain: string;
    email: string;
    address: string;
    state: string;
    city: string;
    postal_code: string;
    phone_number: string;
    contact_person: string;
    website: string;
    registration_type: string;
    registration_number: string;
    country_calling_code: string;
    country: string;
    logo: string;
    cover_image: string;
}

const AddCompany = () => {
    const [thumbnilImg, setThumbnilImg] = useState<string[] | undefined>([]);
    const [coverImg, setCoverImg] = useState<string[] | undefined>([]);
    const [selectedCountry, setSelectedCountry] = useState<
        ISelectProps | undefined
    >(undefined);
    const [selectedCountryCode, setSelectedCountryCode] = useState<
        ISelectProps | undefined
    >(undefined);

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const { postData, isLoading, error } = useMutation<ICompanyResponse>(
        API_ROUTE.POST_COMPANIES,
        true
    );
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IAddCompanyForm>({
        resolver: yupResolver(companySchema),
    });

    const onFormSubmit = handleSubmit(async (data: IAddCompanyForm) => {
        console.log("data", data);

        if (!selectedCountryCode) {
            toast.error("Please select country code");
        }

        if (!selectedCountry) {
            toast.error("Please select country");
        }

        const tempData: IAddCompanyPayload = {
            ...data,
            country: selectedCountry?.value ?? "",
            country_calling_code: selectedCountryCode?.value ?? "",
            logo: thumbnilImg?.[0] ?? "",
            cover_image: coverImg?.[0] ?? "",
        };

        const response = await postData(tempData);
        console.log("response", response);
        if (response?.data?.status === "ok") {
            toast.success("Company Added Successfully");
            navigate("/account/company/list");
        } else {
            toast.error(error ?? "Something went wrong");
        }
    });

    return (
        <div>
            <Heading
                title='Create Company'
                btnText='Back'
                showBreadcrumb={true}
            />

            <section>
                <form className='form w-100 ' onSubmit={onFormSubmit}>
                    <div className='row'>
                        <div className='col-12 col-md-4 col-lg-4'>
                            <div className='card card-flush py-4'>
                                <div className='card-header'>
                                    <div className='card-title'>
                                        <h5>Upload Company's Logo</h5>
                                    </div>
                                </div>

                                <div className='card-body  pt-0'>
                                    <div
                                        className='image-input image-input-empty image-input-outline image-input-placeholder mb-3'
                                        data-kt-image-input='true'>
                                        <div className='image-input-wrapper w-100px h-100px'>
                                            {thumbnilImg &&
                                            thumbnilImg?.length > 0 ? (
                                                <img
                                                    className='img-fluid rounded'
                                                    src={`${BASE_URL}${thumbnilImg[0]}`}
                                                    alt='company logo'
                                                />
                                            ) : (
                                                <img
                                                    className='img-fluid rounded'
                                                    src={Images.BlackImg}
                                                    alt='blank'
                                                />
                                            )}
                                        </div>

                                        <div className='text-center'>
                                            <UploadFile
                                                fileUploadLimit={1}
                                                fileUploadType='IMAGE'
                                                isUploadRequired={true}
                                                isRoutePrivate={true}
                                                isMultiple={false}
                                                setFileInfo={setThumbnilImg}
                                                fileInfo={thumbnilImg}
                                            />
                                        </div>
                                    </div>
                                    <div className='text-muted fs-7'>
                                        Set the product thumbnail image. Only
                                        *.png, *.jpg and *.jpeg image files are
                                        accepted
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-md-8 col-lg-8'>
                            <div className='card card-flush py-4'>
                                <div className='card-header'>
                                    <div className='card-title'>
                                        <h5>Upload Company's Logo</h5>
                                    </div>
                                </div>

                                <div className='card-body  pt-0'>
                                    <div
                                        className='image-input image-input-empty image-input-outline image-input-placeholder mb-3'
                                        data-kt-image-input='true'>
                                        {coverImg && coverImg?.length > 0 ? (
                                            <img
                                                className='img-fluid rounded'
                                                src={`${BASE_URL}${coverImg[0]}`}
                                                alt='cover Image'
                                            />
                                        ) : (
                                            <div
                                                className='dropzone dz-clickable h-100px'
                                                id='kt_ecommerce_add_product_media'>
                                                <div className='dz-message needsclick'>
                                                    <i className='ki-outline ki-file-up text-primary fs-3x'></i>
                                                    <div className='ms-4'>
                                                        <h3 className='fs-5 fw-bold text-gray-900 mb-1'>
                                                            Upload cover Image
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className='text-center'>
                                            <UploadFile
                                                fileUploadLimit={1}
                                                fileUploadType='IMAGE'
                                                isUploadRequired={true}
                                                isRoutePrivate={true}
                                                isMultiple={false}
                                                setFileInfo={setCoverImg}
                                                fileInfo={coverImg}
                                            />
                                        </div>
                                    </div>
                                    <div className='text-muted fs-7'>
                                        Only *.png, *.jpg and *.jpeg image files
                                        are accepted
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='card card-flush'>
                            <div className='card-header'>
                                <div className='card-title'>
                                    <h2>Company Details</h2>
                                </div>
                            </div>
                            <div className='card-body pt-0'>
                                <div className='row'>
                                    <div className='col-12 gap-5 gap-md-7 mb-6'>
                                        <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                            <label className='required form-label'>
                                                Name:
                                            </label>
                                            <input
                                                className='form-control'
                                                placeholder='Company name'
                                                {...register("name")}
                                            />
                                            <div className='fv-plugins-message-container invalid-feedback'>
                                                {errors.name?.message}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-6 gap-5 gap-md-7 mb-6'>
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
                                                {errors.website?.message}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-6 gap-5 gap-md-7 mb-6'>
                                        <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                            <label className='required form-label'>
                                                Website Subdomain
                                            </label>
                                            <input
                                                className='form-control'
                                                placeholder='website subdomain'
                                                {...register("subdomain")}
                                            />
                                            <div className='fv-plugins-message-container invalid-feedback'>
                                                {errors.subdomain?.message}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-6 mb-6'>
                                        <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                            <label className='required form-label'>
                                                Email
                                            </label>
                                            <input
                                                className='form-control'
                                                {...register("email")}
                                                placeholder='Email Address'
                                            />
                                            <div className='fv-plugins-message-container invalid-feedback'>
                                                {errors.email?.message}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-6  mb-6'>
                                        <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                            <label className='required form-label'>
                                                Contact Person
                                            </label>
                                            <input
                                                className='form-control'
                                                placeholder='Enter contact person name'
                                                {...register("contact_person")}
                                            />
                                            <div className='fv-plugins-message-container invalid-feedback'>
                                                {errors.contact_person?.message}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-6 mb-6'>
                                        <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                            <label className='required form-label'>
                                                Registration Type
                                            </label>
                                            <input
                                                className='form-control'
                                                placeholder='Enter registration type'
                                                {...register(
                                                    "registration_type"
                                                )}
                                            />
                                            <div className='fv-plugins-message-container invalid-feedback'>
                                                {
                                                    errors.registration_type
                                                        ?.message
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-6  mb-6'>
                                        <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                            <label className='required form-label'>
                                                Registration Number
                                            </label>
                                            <input
                                                className='form-control'
                                                placeholder='Enter registration number'
                                                {...register(
                                                    "registration_number"
                                                )}
                                            />
                                            <div className='fv-plugins-message-container invalid-feedback'>
                                                {
                                                    errors.registration_number
                                                        ?.message
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='card card-flush'>
                            <div className='card-header'>
                                <div className='card-title'>
                                    <h2>Company Address</h2>
                                </div>
                            </div>
                            <div className='card-body pt-0'>
                                <div className='row'>
                                    <div className='col-12 mb-6'>
                                        <div className=' flex-row-fluid'>
                                            <label className='required form-label'>
                                                Address Line
                                            </label>
                                            <input
                                                className='form-control'
                                                placeholder='Enter your full address'
                                                {...register("address")}
                                            />
                                            <div className=' invalid-feedback'>
                                                {errors.address?.message}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-3 col-md-4 mb-6'>
                                        <div className=' flex-row-fluid'>
                                            <label className='required form-label'>
                                                Country Calling Code
                                            </label>
                                            <CountryCode
                                                placeholder='Select Country Code'
                                                forCountry={false}
                                                selectValue={
                                                    selectedCountryCode
                                                }
                                                setSelectValue={
                                                    setSelectedCountryCode
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className='col-9 col-md-8 mb-6'>
                                        <div className=' flex-row-fluid'>
                                            <label className='required form-label'>
                                                Phone Number
                                            </label>
                                            <input
                                                className='form-control'
                                                placeholder='Enter your phone number'
                                                {...register("phone_number")}
                                            />
                                            <div className=' invalid-feedback'>
                                                {errors.phone_number?.message}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-6  mb-6'>
                                        <div className=' flex-row-fluid'>
                                            <label className='required form-label'>
                                                City
                                            </label>
                                            <input
                                                className='form-control'
                                                placeholder='Enter your city address'
                                                {...register("city")}
                                            />
                                            <div className=' invalid-feedback'>
                                                {errors.city?.message}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-6  mb-6'>
                                        <div className=' flex-row-fluid'>
                                            <label className='required form-label'>
                                                State
                                            </label>
                                            <input
                                                className='form-control'
                                                placeholder='Enter your state'
                                                {...register("state")}
                                            />
                                            <div className=' invalid-feedback'>
                                                {errors.state?.message}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-6  mb-6'>
                                        <div className=' flex-row-fluid'>
                                            <label className='required form-label'>
                                                Postal Code
                                            </label>
                                            <input
                                                className='form-control'
                                                placeholder='Enter your postal code'
                                                {...register("postal_code")}
                                            />
                                            <div className=' invalid-feedback'>
                                                {errors.postal_code?.message}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-6  mb-6'>
                                        <div className=' flex-row-fluid'>
                                            <label className='required form-label'>
                                                Country
                                            </label>
                                            <CountryCode
                                                placeholder='Select Country'
                                                forCountry={true}
                                                selectValue={selectedCountry}
                                                setSelectValue={
                                                    setSelectedCountry
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-end my-6 mb-6'>
                            <button className='btn btn-secondary btn-sm me-5 mb-6'>
                                previous
                            </button>
                            <button
                                type='submit'
                                disabled={isLoading}
                                className='btn btn-primary btn-sm mb-6'>
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
                                    <span>Submit</span>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </section>

            <ToastContainer />
        </div>
    );
};

export default AddCompany;
