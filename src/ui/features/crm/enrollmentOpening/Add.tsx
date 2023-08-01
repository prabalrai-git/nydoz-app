import { useState, useEffect, useCallback } from "react";
import { enrollmentOpeningsSchema } from "../../../../validations/crm.validators";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CountryCode from "../../../shared/atoms/CountryCode";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
    IEnrollmentOpeningsPayload,
    IEnrollmentOpeningsResponse,
} from "../../../../types/products.types";
import { toast } from "react-toastify";
import useValidationError from "../../../../hooks/useValidationError";
import API_ROUTE from "../../../../service/api";
import useMutation from "../../../../hooks/useMutation";
import { Spinner } from "react-bootstrap";
import useHandleShowError from "../../../../hooks/useHandleShowError";
import CompanyBreadcrumb from "../../../shared/molecules/CompanyBreadcrumb";

// {
//   "institute_id": 0,
//   "enroll_start_date": "string",
//   "enroll_end_date": "string",
//   "position": "string",
//   "total_opening": 0,
//   "visa_type_id": 0,
//   "currency": "string",
//   "offered_salary": 0,
//   "description": "string"
// }

interface IFormData {
    enroll_start_date: Date | undefined;
    enroll_end_date: Date | undefined;
    position: string;
    total_opening: number;
    offered_salary: number;
    currency: string;
    description: string;
}

const Add = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {instituteId }= useParams();
    const { updateData, postData, isLoading, error, errList } =
        useMutation<IEnrollmentOpeningsResponse>(API_ROUTE.CM_ENROLLMENT, true);

    const {
        register,
        reset,
        setError,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormData>({
        resolver: yupResolver(enrollmentOpeningsSchema),
    });

    useValidationError({ errList, setError });
    useHandleShowError(error);

    const handleResetForm = useCallback(() => {
        const dataDetails: IEnrollmentOpeningsResponse = location?.state?.data;
        const { institute_id, visa_type_id, ...rest } = dataDetails;
        reset(rest);
    }, [location?.state?.data, reset]);

    useEffect(() => {
        console.log(location?.state);
        if (location?.state?.data && location?.state?.data?.id) {
            handleResetForm();
        }
    }, [handleResetForm, location?.state, reset]);

    const handleClearForm = () => {
        reset();
    };

    const onFormSubmit = handleSubmit(async (data: IFormData) => {
        let response;

        if (location?.state?.data?.id) {
            const tempPostData: IEnrollmentOpeningsPayload = {
                ...data,
                institute_id: location?.state?.data?.institute_id,
                visa_type_id: location?.state?.data?.visa_type_id,
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
            const tempPostData: IEnrollmentOpeningsPayload = {
                ...data,
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
                        ? "CM Update Institute"
                        : "Cm Add Institute"
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
                                        {errors.website?.message}
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
                                        Institution
                                    </label>
                                   
                            </div>
                            <div className='col-12  gap-5 gap-md-7   mb-6'>
                                <div>
                                    <label className='required form-label'>
                                        Visa Type
                                    </label>
                                    <CountryCode
                                        placeholder='Select Country'
                                        forCountry={true}
                                        selectValue={selectedCountry}
                                        setSelectValue={setSelectedCountry}
                                    />
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
