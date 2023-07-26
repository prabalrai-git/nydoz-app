import { useState, useEffect, useCallback } from "react";
import { visitorsSchema } from "../../../../validations/crm.validators";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CountryCode from "../../../shared/atoms/CountryCode";
import { ISelectProps } from "../../../../types/react-select.type";
import { useNavigate, useLocation } from "react-router-dom";
import {
    IVisitorPayload,
    IVisitorResponse,
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
import useFetch from "../../../../hooks/useFetch";
import { IVisaTypeResponse } from "../../../../types/payload.type";
import useAuthContext from "../../../../context/auth/useAuthContext";
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
    information_channel: string | undefined;
    deal_amount: number;
    applied_position: string;
    expected_salary_pa: number | undefined;
    expected_take_off_date: string | undefined;
}

const AddVisitor = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { companyInfo } = useAuthContext();
    const [visaTypeId, setvisaTypeId] = useState<string | undefined>();
    const [selectedCountry, setSelectedCountry] = useState<
        ISelectProps | undefined
    >(undefined);
    const [selectedVisitingCountry, setSelectedVisitingCountry] = useState<
        ISelectProps | undefined
    >(undefined);
    const {
        data: visaTypeArray,
        isloading: isVisaTypeLoading,
        fetchData,
    } = useFetch<IVisaTypeResponse[]>(API_ROUTE.GET_VISA_TYPES, true);
    const { updateData, postData, isLoading, error, errList } = useMutation(
        API_ROUTE.CM_ENROLLMENT,
        true
    );

    useEffect(() => {
        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const {
        register,
        reset,
        control,
        setError,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormData>({
        defaultValues: {
            first_name: "",
            last_name: "",
            phone_nos: ["00977"],
            email: [" "],
            going_to_foreign: false,
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
        name: "email",
        control,
    });
    useValidationError({ errList, setError });
    useHandleShowError(error);

    const handleResetForm = useCallback(() => {
        const companyDetails: IVisitorResponse = location?.state?.data;
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
        console.log(data);
        if (!selectedCountry) {
            toast.error("Please select country");
            return;
        }

        let response;

        if (location?.state?.data?.id) {
            const tempPostData: IVisitorPayload = {
                ...data,
                country: selectedCountry?.value ?? "",
                visiting_country_state: selectedVisitingCountry?.value ?? "",
                visa_type_id: visaTypeId ?? "",
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
            const tempPostData: IVisitorPayload = {
                ...data,
                country: selectedCountry?.value ?? "",
                visiting_country_state: selectedVisitingCountry?.value ?? "",
                visa_type_id: visaTypeId ?? "",
                // companyId: companyInfo?.id,
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
                            {/* Personal Details */}
                            <div className='col-12 mb-3'>
                                <div>
                                    <h2
                                        className='fw-bold mb-5'
                                        id='custom-form-control'>
                                        Personal Details
                                    </h2>
                                </div>
                                <div className='row'>
                                    <div className='col-6 gap-5 gap-md-7 mb-6'>
                                        <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                            <label className='required form-label'>
                                                First Name:
                                            </label>
                                            <input
                                                type='text'
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
                                                    className='form-group mb-3'>
                                                    <div className='d-flex'>
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
                                                                    remove(
                                                                        index
                                                                    )
                                                                }
                                                                color='gray'
                                                                size={25}
                                                            />
                                                        </div>
                                                    </div>

                                                    {errors?.phone_nos &&
                                                        errors?.phone_nos[
                                                            index
                                                        ] && (
                                                            <p className='fv-plugins-message-container invalid-feedback ps-2'>
                                                                {
                                                                    errors
                                                                        ?.phone_nos[
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
                                                    className='form-group mb-3'>
                                                    <div className='d-flex'>
                                                        <input
                                                            className='form-control me-3'
                                                            placeholder={`Enter phone number ${
                                                                index + 1
                                                            }`}
                                                            {...register(
                                                                `email.${index}`
                                                            )}
                                                        />
                                                        <div className='flex-center cursor-pointer'>
                                                            <XSquare
                                                                onClick={() =>
                                                                    removeEmail(
                                                                        index
                                                                    )
                                                                }
                                                                color='gray'
                                                                size={25}
                                                            />
                                                        </div>
                                                    </div>
                                                    {errors?.phone_nos &&
                                                        errors?.phone_nos[
                                                            index
                                                        ] && (
                                                            <p className='fv-plugins-message-container invalid-feedback'>
                                                                {
                                                                    errors
                                                                        ?.phone_nos[
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
                                                    onClick={() =>
                                                        appendEmail("")
                                                    }>
                                                    Add Email
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Personal Details Ends */}
                            <hr className='bg-gray-100 mb-6 ' />

                            {/* Address starts */}
                            <div className='col-12 mb-6'>
                                <div>
                                    <h2
                                        className='fw-bold mb-5'
                                        id='custom-form-control'>
                                        Address Details
                                    </h2>
                                </div>
                                <div className='row'>
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
                            {/* Address Details Ends */}
                            <hr className='bg-gray-100 mb-6 ' />
                            {/* Visiting Details */}
                            <div className='col-12 mb-6'>
                                <div>
                                    <h2
                                        className='fw-bold mb-5'
                                        id='custom-form-control'>
                                        Visiting Details
                                    </h2>
                                </div>
                                <div className='row'>
                                    <div className='col-6  gap-5 gap-md-7   mb-6'>
                                        <div>
                                            <label className='required form-label'>
                                                Country
                                            </label>
                                            <CountryCode
                                                placeholder='Select Visiting Country'
                                                forCountry={true}
                                                selectValue={
                                                    selectedVisitingCountry
                                                }
                                                setSelectValue={
                                                    setSelectedVisitingCountry
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className='col-6 gap-5 gap-md-7 mb-6'>
                                        <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                            <label className='required form-label'>
                                                Visa Type
                                            </label>
                                            {isVisaTypeLoading ? (
                                                <div>loading</div>
                                            ) : (
                                                <select
                                                    onChange={(e) =>
                                                        setvisaTypeId(
                                                            e.target.value
                                                        )
                                                    }
                                                    className='form-select'
                                                    placeholder='Choose Visa Type'>
                                                    {visaTypeArray &&
                                                        visaTypeArray?.map(
                                                            (
                                                                item: IVisaTypeResponse
                                                            ) => (
                                                                <option
                                                                    key={
                                                                        item.id
                                                                    }
                                                                    value={
                                                                        item.id
                                                                    }>
                                                                    {item.name}
                                                                </option>
                                                            )
                                                        )}
                                                </select>
                                            )}
                                        </div>
                                    </div>
                                    <div className='col-6 gap-5 gap-md-7 mb-6'>
                                        <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                            <label className='required form-label'>
                                                Information Channel
                                            </label>
                                            <input
                                                className='form-control'
                                                placeholder='How do you know about our office ?'
                                                {...register(
                                                    "information_channel"
                                                )}
                                            />
                                            <div className='fv-plugins-message-container invalid-feedback'>
                                                {
                                                    errors.information_channel
                                                        ?.message
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-6 gap-5 gap-md-7 mb-6'>
                                        <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                            <label className='required form-label'>
                                                Deal Amount
                                            </label>
                                            <input
                                                className='form-control'
                                                type='number'
                                                placeholder='Enter deal amount'
                                                {...register("deal_amount", {
                                                    valueAsNumber: true,
                                                })}
                                            />
                                            <div className='fv-plugins-message-container invalid-feedback'>
                                                {errors.deal_amount?.message}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-2 gap-5 gap-md-7 mb-6 d-flex align-items-center justify-content-end'>
                                        <div className='fv-row flex-row-fluid fv-plugins-icon-container '>
                                            <label className='required form-label me-3'>
                                                Going for Foreign
                                            </label>
                                            <input
                                                {...register(
                                                    "going_to_foreign",
                                                    {
                                                        valueAsBoolean: true,
                                                    }
                                                )}
                                                type='checkbox'
                                                className='form-check-input'
                                            />
                                            <div className='fv-plugins-message-container invalid-feedback'>
                                                {
                                                    errors.going_to_foreign
                                                        ?.message
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-10 gap-5 gap-md-7 mb-6'>
                                        <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                            <label className='required form-label'>
                                                Visiting Purpose
                                            </label>
                                            <input
                                                className='form-control'
                                                placeholder='Enter your visiting purpose.'
                                                {...register(
                                                    "visiting_purpose"
                                                )}
                                            />
                                            <div className='fv-plugins-message-container invalid-feedback'>
                                                {
                                                    errors.visiting_purpose
                                                        ?.message
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-6 gap-5 gap-md-7 mb-6'>
                                        <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                            <label className='required form-label'>
                                                Applied Position
                                            </label>
                                            <input
                                                className='form-control'
                                                placeholder='Enter your visiting purpose.'
                                                {...register(
                                                    "applied_position"
                                                )}
                                            />
                                            <div className='fv-plugins-message-container invalid-feedback'>
                                                {
                                                    errors.applied_position
                                                        ?.message
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-6 gap-5 gap-md-7 mb-6'>
                                        <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                            <label className='required form-label'>
                                                Expected Salary
                                            </label>
                                            <input
                                                type='number'
                                                className='form-control'
                                                placeholder='Enter your visiting purpose.'
                                                {...register(
                                                    "expected_salary_pa",
                                                    {
                                                        valueAsNumber: true,
                                                    }
                                                )}
                                            />
                                            <div className='fv-plugins-message-container invalid-feedback'>
                                                {
                                                    errors.expected_salary_pa
                                                        ?.message
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-6 gap-5 gap-md-7 mb-6'>
                                        <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                            <label className='required form-label'>
                                                Expected Take Off Date
                                            </label>
                                            <input
                                                className='form-control'
                                                type='date'
                                                placeholder='Enter your visiting purpose.'
                                                {...register(
                                                    "expected_take_off_date"
                                                )}
                                            />
                                            <div className='fv-plugins-message-container invalid-feedback'>
                                                {
                                                    errors
                                                        .expected_take_off_date
                                                        ?.message
                                                }
                                            </div>
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
                                </div>
                            </div>
                            {/* Visiting Details Ends */}

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
