import { useState, useEffect, useCallback } from "react";
import { visitorsSchema } from "../../../../validations/crm.validators";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CountryCode from "../../../shared/atoms/CountryCode";
import { ISelectProps } from "../../../../types/react-select.type";
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
import { XSquare } from "react-bootstrap-icons";

// {
//   "first_name": "string",
//   "last_name": "string",
//   "country": "string",
//   "state": "string",
//   "street_address": "string",
//   "phone_nos": [
//     "string"
//   ],
//   "visiting_purpose": "string",
//   "remarks": "string",
//   "email": [
//     "string"
//   ],
//   "going_to_foreign": true,
//   "visa_type_id": 0,
//   "information_channel": "string",
//   "visiting_country_state": "string",
//   "deal_amount": 0,
//   "applied_position": "string",
//   "expected_salary_pa": 0,
//   "expected_take_off_date": "string"
// }

interface IFormData {
    // personal Details
    first_name: string;
    last_name: string;
    phone_nos: string[];
    email: string[];
    // personal Details
    state: string;
    street_address: string;
    //  business Details
    visiting_purpose: string;
    remarks: string | undefined;
    going_to_foreign: boolean;
    visa_type_id: number;
    information_channel: string;
    visiting_country_state: string;
    deal_amount: number;
    applied_position: string;
    expected_salary_pa: number | undefined;
    expected_take_off_date: string | undefined;
}

const AddVisitor = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedCountry, setSelectedCountry] = useState<
        ISelectProps | undefined
    >(undefined);

    const { updateData, postData, isLoading, error, errList } = useMutation(
        API_ROUTE.CM_ENROLLMENT,
        true
    );

    const {
        register,
        reset,
        control,
        setError,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormData>({
        defaultValues: {
            email: [" "],
        },
        resolver: yupResolver(visitorsSchema),
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "phone_nos",
    });

    const {
        fields: emailFields,
        append: appendEmail,
        remove: removeEmail,
    } = useFieldArray({
        control,
        name: "email",
    });
    useValidationError({ errList, setError });
    useHandleShowError(error);

    const handleResetForm = useCallback(() => {
        const companyDetails: IEnrollmentResponse = location?.state?.data;
        reset(companyDetails);
        const country = getSelectPropsFromCountry(companyDetails?.country);
        setSelectedCountry(country);
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

            response = await updateData(
                location?.state?.data?.id,
                tempPostData
            );
            if (response?.data?.status === "ok") {
                toast.success("Institute updated Successfully");
                navigate(-1);
            }
        } else {
            const tempPostData: IEnrollmentPayload = {
                ...data,
                country: selectedCountry?.value ?? "",
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
                title='Customer Manangement Enrollments'
                showBreadcrumb={true}
                btnText='Back'
            />
            <div className='card shadow-sm '>
                <div className='card-header'>
                    <h3 className='card-title'>Add Visitor Details</h3>
                    <div className='card-toolbar'>
                        <button
                            className='btn btn-sm btn-secondary'
                            onClick={handleClearForm}>
                            Clear
                        </button>
                    </div>
                </div>
                <div className='card-body'>
                    <form className='form w-100 ' onSubmit={onFormSubmit}>
                        <div className='row'>
                            <div className='col-6 gap-5 gap-md-7 mb-6'>
                                <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                    <label className='required form-label'>
                                        First Name:
                                    </label>
                                    <input
                                        className='form-control'
                                        placeholder='Enter your first name.'
                                        {...register("first_name")}
                                    />
                                    <div className='fv-plugins-message-container invalid-feedback'>
                                        {errors.first_name?.message}
                                    </div>
                                </div>
                            </div>
                            <div className='col-6 gap-5 gap-md-7 mb-6'>
                                <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                    <label className='required form-label'>
                                        Last Name:
                                    </label>
                                    <input
                                        className='form-control'
                                        placeholder='Enter your last name.'
                                        {...register("last_name")}
                                    />
                                    <div className='fv-plugins-message-container invalid-feedback'>
                                        {errors.last_name?.message}
                                    </div>
                                </div>
                            </div>

                            {/* Phone Number */}
                            <div className='col-6 gap-5 gap-md-7 mb-6'>
                                <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                    <label className='required form-label'>
                                        Phone Number:
                                    </label>
                                    {fields.map((field, index) => (
                                        <div
                                            key={field.id}
                                            className='form-group d-flex mb-3'>
                                            <input
                                                className='form-control me-3'
                                                placeholder={`Enter phone number ${
                                                    index + 1
                                                }`}
                                                {...register(
                                                    `phone_nos.${index}`
                                                )}
                                            />
                                            <div className='flex-center cursor-pointer'>
                                                <XSquare
                                                    onClick={() =>
                                                        remove(index)
                                                    }
                                                    color='gray'
                                                    size={25}
                                                />
                                            </div>
                                            {errors?.phone_nos &&
                                                errors?.phone_nos[index] && (
                                                    <p className='error'>
                                                        {
                                                            errors?.phone_nos[
                                                                index
                                                            ]?.message
                                                        }
                                                    </p>
                                                )}
                                        </div>
                                    ))}
                                    <div className='d-flex justify-content-end'>
                                        <button
                                            type='button'
                                            className='btn btn-info btn-sm'
                                            onClick={() => append("")}>
                                            Add Phone Number
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* Email */}
                            <div className='col-6 gap-5 gap-md-7 mb-6'>
                                <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                    <label className='required form-label'>
                                        Email Address:
                                    </label>
                                    {emailFields.map((field, index) => (
                                        <div
                                            key={field.id}
                                            className='form-group d-flex mb-3'>
                                            <input
                                                className='form-control me-3'
                                                placeholder={`Enter phone number ${
                                                    index + 1
                                                }`}
                                                {...register(`email.${index}`)}
                                            />
                                            <div className='flex-center cursor-pointer'>
                                                <XSquare
                                                    onClick={() =>
                                                        removeEmail(index)
                                                    }
                                                    color='gray'
                                                    size={25}
                                                />
                                            </div>
                                            {errors?.phone_nos &&
                                                errors?.phone_nos[index] && (
                                                    <p className='error'>
                                                        {
                                                            errors?.phone_nos[
                                                                index
                                                            ]?.message
                                                        }
                                                    </p>
                                                )}
                                        </div>
                                    ))}
                                    <div className='d-flex justify-content-end'>
                                        <button
                                            type='button'
                                            className='btn btn-info btn-sm'
                                            onClick={() => appendEmail("")}>
                                            Add Email
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 gap-5 gap-md-7 mb-6'>
                                <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                    <label className='required form-label'>
                                        Visiting Purpose
                                    </label>
                                    <input
                                        className='form-control'
                                        placeholder='Enter your visiting purpose.'
                                        {...register("visiting_purpose")}
                                    />
                                    <div className='fv-plugins-message-container invalid-feedback'>
                                        {errors.visiting_purpose?.message}
                                    </div>
                                </div>
                            </div>
                            <div className='col-6 gap-5 gap-md-7 mb-6'>
                                <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                    <label className='required form-label'>
                                        Visa Type
                                    </label>
                                    <input
                                        className='form-control'
                                        placeholder='Enter your visiting purpose.'
                                        {...register("visiting_purpose")}
                                    />
                                    <div className='fv-plugins-message-container invalid-feedback'>
                                        {errors.visiting_purpose?.message}
                                    </div>
                                </div>
                            </div>
                            {/* Address */}
                            <div className='col-12 gap-5 gap-md-7 mb-6'>
                                <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                    <label className='required form-label'>
                                        Full Address
                                    </label>
                                    <input
                                        className='form-control'
                                        placeholder='Enter your full address.'
                                        {...register("street_address")}
                                    />
                                    <div className='fv-plugins-message-container invalid-feedback'>
                                        {errors.street_address?.message}
                                    </div>
                                </div>
                            </div>
                            <div className='col-6 gap-5 gap-md-7   mb-6'>
                                <div>
                                    <label className='required form-label'>
                                        Visitor's State /province
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
                            <div className='col-6  gap-5 gap-md-7   mb-6'>
                                <div>
                                    <label className='required form-label'>
                                        Visitor's Country
                                    </label>
                                    <CountryCode
                                        placeholder='Select Country'
                                        forCountry={true}
                                        selectValue={selectedCountry}
                                        setSelectValue={setSelectedCountry}
                                    />
                                </div>
                            </div>
                            <div className='col-12 gap-5 gap-md-7  mb-6'>
                                <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                    <label className=' form-label'>
                                        Remarks
                                    </label>
                                    <textarea
                                        className='form-control'
                                        {...register("remarks")}
                                        placeholder='description'
                                    />
                                    <div className='fv-plugins-message-container invalid-feedback'>
                                        {errors.remarks?.message}
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

export default AddVisitor;
