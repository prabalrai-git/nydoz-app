import { useState, useEffect } from "react";
import Images from "../../../constants/Images";
import UploadFile from "../../shared/components/Upload";
import Heading from "../../shared/molecules/Heading";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import API_ROUTE from "../../../service/api";
import { agentSchema } from "../../../validations/company.validator";
import Spinner from "react-bootstrap/Spinner";
import useMutation from "../../../hooks/useMutation";
import { toast } from "react-toastify";
import CountryCode from "../../shared/atoms/CountryCode";
import { ISelectProps } from "../../../types/react-select.type";
import { IAgentPayload, IAgentResponse } from "../../../types/payload.type";
import Breadcrumb from "../../shared/molecules/Breadcrumb";
import { getSelectPropsFromCountry } from "../../../functions/country";
import CompanyBreadcrumb from "../../shared/molecules/CompanyBreadcrumb";
import useValidationError from "../../../hooks/useValidationError";
import useHandleShowError from "../../../hooks/useHandleShowError";

interface IAddAgentForm {
    first_name: string;
    last_name: string;
    email: string;
    mobile: string;
    state: string;
    city: string;
    street_address: string;
    postal_code: string;
}

const AddCompany = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [oldThumbnil, setOldThumbnil] = useState<string | undefined>();
    const [thumbnilImg, setThumbnilImg] = useState<string[] | undefined>([]);
    const [selectedCountry, setSelectedCountry] = useState<
        ISelectProps | undefined
    >(undefined);

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const { postData, updateData, isLoading, error, errList } =
        useMutation<IAgentResponse>(API_ROUTE.CLIENT_MANAGEMENT_AGENTS, true);

    const {
        register,
        reset,
        setError,
        handleSubmit,
        formState: { errors },
    } = useForm<IAddAgentForm>({
        resolver: yupResolver(agentSchema),
    });

    useValidationError({ errList, setError });
    useHandleShowError(error);

    useEffect(() => {
        if (location?.state?.data && location?.state?.data?.id) {
            reset(location?.state?.data);
            setOldThumbnil(location?.state?.data?.profile_picture);

            const country = getSelectPropsFromCountry(
                location?.state?.data?.country
            );
            setSelectedCountry(country);
        }
    }, [location?.state?.data, reset]);

    const onFormSubmit = handleSubmit(async (data: IAddAgentForm) => {
        // console.log("data", data);

        if (!selectedCountry) {
            toast.error("Please select country");
            return;
        }

        let response;

        if (location?.state?.data?.id) {
            const tempPostData: IAgentPayload = {
                ...data,
                country: selectedCountry?.value ?? "",
                profile_picture: "",
            };

            if (oldThumbnil) {
                tempPostData.profile_picture = oldThumbnil;
            } else {
                tempPostData.profile_picture = thumbnilImg?.[0] ?? "";
            }

            response = await updateData(
                location?.state?.data?.id,
                tempPostData
            );
            // console.log("response", response);
            if (response?.data?.status === "ok") {
                toast.success("Company updated Successfully");
                navigate("home");
            }
        } else {
            // if (thumbnilImg?.length === 0) {
            //     toast.error("Please upload profile picture");
            // }

            const tempPostData: IAgentPayload = {
                ...data,
                country: selectedCountry?.value ?? "",
                profile_picture: thumbnilImg?.[0] ?? "",
            };
            response = await postData(tempPostData);
            if (response?.data?.status === "ok") {
                toast.success("Agent Added Successfully");
                navigate("../list");
            }
        }
    });

    return (
        <div className=' my-6'>
            <CompanyBreadcrumb
                title='Customer Manangement Agents'
                showBreadcrumb={true}
                btnText='Back'
            />

            <div className='card shadow-sm'>
                <div className='card-header'>
                    <h3 className='card-title'>Add Agents Details</h3>
                    <div className='card-toolbar'>
                        <button className='btn btn-sm btn-secondary'>
                            Clear
                        </button>
                    </div>
                </div>
                <div className='card-body'>
                    <form className='form w-100 px-6' onSubmit={onFormSubmit}>
                        <div>
                            <div className='row'>
                                <div className='col-12 '>
                                    <div className='row '>
                                        <div className='col-12 col-md-6'>
                                            <div className='card card-flush'>
                                                <div className='card-header'>
                                                    <div className='card-title'>
                                                        <h5 className='required'>
                                                            Upload profile
                                                            picture
                                                        </h5>
                                                    </div>
                                                </div>

                                                <div className='card-body  pt-0'>
                                                    <div>
                                                        <div
                                                            className='image-input image-input-empty image-input-outline image-input-placeholder mb-3'
                                                            data-kt-image-input='true'>
                                                            <div className='d-flex justify-content-around align-items-center'>
                                                                {location?.state
                                                                    ?.data && (
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
                                                                                src={`${BASE_URL}${oldThumbnil}`}
                                                                                alt='Company"s logo'
                                                                            />
                                                                        ) : (
                                                                            <p className='text center text-muted'>
                                                                                No
                                                                                Company
                                                                                logo
                                                                                found.
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                )}

                                                                {thumbnilImg &&
                                                                    thumbnilImg?.length >
                                                                        0 && (
                                                                        <div className='image-input-wrapper w-100px h-100px p-2'>
                                                                            <img
                                                                                className='img-fluid rounded'
                                                                                src={`${BASE_URL}${thumbnilImg[0]}`}
                                                                                alt='company logo'
                                                                            />
                                                                        </div>
                                                                    )}

                                                                {!location
                                                                    ?.state
                                                                    ?.data &&
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

                                                            <div className='text-center'>
                                                                <UploadFile
                                                                    fileUploadLimit={
                                                                        1
                                                                    }
                                                                    fileUploadType='IMAGE'
                                                                    isUploadRequired={
                                                                        false
                                                                    }
                                                                    isRoutePrivate={
                                                                        true
                                                                    }
                                                                    isMultiple={
                                                                        false
                                                                    }
                                                                    setFileInfo={
                                                                        setThumbnilImg
                                                                    }
                                                                    fileInfo={
                                                                        thumbnilImg
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='text-muted fs-7'>
                                                            Only *.png, *.jpg
                                                            and *.jpeg image
                                                            files are accepted.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12 col-md-6'>
                                            <div className='row '>
                                                <div className='col-12  gap-5 gap-md-7 mb-6'>
                                                    <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                                        <label className='required form-label'>
                                                            First Name
                                                        </label>
                                                        <input
                                                            type='text'
                                                            className='form-control'
                                                            placeholder='Enter your first name'
                                                            {...register(
                                                                "first_name"
                                                            )}
                                                        />
                                                        <div className='fv-plugins-message-container invalid-feedback px-3'>
                                                            {
                                                                errors
                                                                    .first_name
                                                                    ?.message
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-12  gap-5 gap-md-7 mb-6'>
                                                    <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                                        <label className='required form-label'>
                                                            Last Name
                                                        </label>
                                                        <input
                                                            type='text'
                                                            className='form-control'
                                                            placeholder='Enter your last name'
                                                            {...register(
                                                                "last_name"
                                                            )}
                                                        />
                                                        <div className='fv-plugins-message-container invalid-feedback'>
                                                            {
                                                                errors.last_name
                                                                    ?.message
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-12  gap-5 gap-md-7 mb-6'>
                                                    <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                                        <label className='required form-label'>
                                                            Email
                                                        </label>
                                                        <input
                                                            className='form-control'
                                                            type='text'
                                                            {...register(
                                                                "email"
                                                            )}
                                                            placeholder='Enter Email Address'
                                                        />
                                                        <div className='fv-plugins-message-container invalid-feedback'>
                                                            {
                                                                errors.email
                                                                    ?.message
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-12  gap-5 gap-md-7 mb-6'>
                                                    <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                                        <label className='required form-label'>
                                                            Mobile Number
                                                        </label>
                                                        <input
                                                            className='form-control'
                                                            type='text'
                                                            placeholder='Enter mobile number'
                                                            {...register(
                                                                "mobile"
                                                            )}
                                                        />
                                                        <div className='fv-plugins-message-container invalid-feedback'>
                                                            {
                                                                errors.mobile
                                                                    ?.message
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-12 my-3'>
                                    <h4>Agent Address</h4>
                                </div>

                                <div className='col-12 mb-6'>
                                    <div className=' flex-row-fluid'>
                                        <label className='required form-label'>
                                            Street Address
                                        </label>
                                        <input
                                            className='form-control'
                                            type='text'
                                            placeholder='Enter your full address'
                                            {...register("street_address")}
                                        />
                                        <div className='fv-plugins-message-container invalid-feedback'>
                                            {errors.street_address?.message}
                                        </div>
                                    </div>
                                </div>

                                <div className='col-12 col-md-6 mb-6'>
                                    <div className=' flex-row-fluid'>
                                        <label className='required form-label'>
                                            City
                                        </label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Enter your city'
                                            {...register("city")}
                                        />
                                        <div className='fv-plugins-message-container invalid-feedback'>
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
                                            type='text'
                                            placeholder='Enter your state'
                                            {...register("state")}
                                        />
                                        <div className='fv-plugins-message-container invalid-feedback'>
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
                                            type='text'
                                            placeholder='Enter your postal code'
                                            {...register("postal_code")}
                                        />
                                        <div className='fv-plugins-message-container invalid-feedback'>
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
                                            setSelectValue={setSelectedCountry}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex justify-content-end my-6 mb-6'>
                                <button
                                    type='button'
                                    onClick={() => navigate(-1)}
                                    className='btn btn-secondary btn-sm me-5 mb-6'>
                                    cancel
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
                                        <span>
                                            {location?.state?.data?.id
                                                ? "Update"
                                                : "Save"}
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

export default AddCompany;
