import { useEffect, useCallback, useState } from "react";
import { enrollmentOpeningsSchema } from "../../../../validations/crm.validators";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
import {
    IVisaTypeResponse,
    ICurrencysResponse,
} from "../../../../types/payload.type";
import SeverSelect from "../../../shared/components/ServerSelect";
import AsyncReactSelect from "../../../shared/molecules/AsyncReactSelect";

// {}        {
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
    enroll_start_date: Date;
    enroll_end_date: Date;
    position: string;
    total_opening: number;
    offered_salary: number;
    description: string;
}

const Add = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { instituteId } = useParams<string>();
    const { updateData, postData, isLoading, error, errList } = useMutation(
        API_ROUTE.CM_ENROLLMENT,
        true
    );
    const showDataLabel: keyof IVisaTypeResponse = "id";
    const currencyCode: keyof ICurrencysResponse = "code";
    const currencyCountry: keyof ICurrencysResponse = "name";
    const [selectedListItem, setselectedListItem] = useState<
        IVisaTypeResponse | undefined
    >();
    const [selectCurrencyValue, setSelectCurrencyValue] = useState<
        ICurrencysResponse | undefined
    >();

    const [selectedItemText, setSelectedItemText] = useState<string>(
        " medical Insureance"
    );

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
        // console.log(companyDetails, "companyDetails");

        const { _id, institute_id, currency, visa_type_id, ...rest } =
            dataDetails;
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
                visa_type_id: location?.state?.data?.visa_type_id,
                institute_id: location?.state?.data?.institute_id,
            };

            response = await updateData(
                location?.state?.data?.id,
                tempPostData
            );
            if (response?.data?.status === "ok") {
                toast.success("Opening updated Successfully");
                navigate(-1);
            }
        } else {
            const tempPostData: IEnrollmentOpeningsPayload = {
                ...data,
                visa_type_id: location?.state?.data?.visa_type_id,
                institute_id: instituteId,
            };
            response = await postData(tempPostData);
            if (response?.data?.status === "ok") {
                toast.success("Opening Added  Successfully");
                navigate(-1);
            }
        }
    });
    return (
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
                        <div className='col-6 gap-5 gap-md-7  mb-6'>
                            <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                <label className='required form-label'>
                                    Opening Start Date
                                </label>
                                <input
                                    type='date'
                                    className='form-control'
                                    {...register("enroll_start_date")}
                                    placeholder='website url'
                                />
                                <div className='fv-plugins-message-container invalid-feedback'>
                                    {errors.enroll_start_date?.message}
                                </div>
                            </div>
                        </div>
                        <div className='col-6 gap-5 gap-md-7   mb-6'>
                            <div>
                                <label className='required form-label'>
                                    Opening End Date
                                </label>
                                <input
                                    type='date'
                                    className='form-control'
                                    placeholder='Enter your state'
                                    {...register("enroll_end_date")}
                                />
                                <div className='fv-plugins-message-container invalid-feedback'>
                                    {errors.enroll_end_date?.message}
                                </div>
                            </div>
                        </div>
                        <div className='col-6 gap-5 gap-md-7  mb-6'>
                            <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                <label className='required form-label'>
                                    Select Visa Type
                                </label>
                                <SeverSelect
                                    showDataLabel={showDataLabel}
                                    selectedListItem={selectedListItem}
                                    setselectedListItem={setselectedListItem}
                                    selectedItemText={selectedItemText}
                                    setSelectedItemText={setSelectedItemText}
                                    placeholder='Search visa Type'
                                    baseUrl={API_ROUTE.CM_AGENTS}
                                />
                            </div>
                        </div>

                        <div className='col-6 gap-5 gap-md-7 mb-6'>
                            <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                <label className='required form-label'>
                                    Total Opening
                                </label>
                                <input
                                    className='form-control'
                                    placeholder='Enter the total opening'
                                    {...register("total_opening")}
                                />
                                <div className='fv-plugins-message-container invalid-feedback'>
                                    {errors.total_opening?.message}
                                </div>
                            </div>
                        </div>
                        <div className='col-6 gap-5 gap-md-7 mb-6'>
                            <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                <label className='required form-label'>
                                    Currency
                                </label>
                                <AsyncReactSelect
                                    baseUrl={API_ROUTE.GET_CURRENCY}
                                    placeholder='Select Currency'
                                    dataId={currencyCode as never}
                                    showDataLabel={currencyCountry as never}
                                    selectValue={selectCurrencyValue}
                                    setSelectValue={setSelectCurrencyValue}
                                />
                            </div>
                        </div>
                        <div className='col-12 gap-5 gap-md-7 mb-6'>
                            <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                <label className='required form-label'>
                                    Postion/Course
                                </label>
                                <input
                                    className='form-control'
                                    placeholder='Enter the course name'
                                    {...register("position")}
                                />
                                <div className='fv-plugins-message-container invalid-feedback'>
                                    {errors.position?.message}
                                </div>
                            </div>
                        </div>
                        <div className='col-6 gap-5 gap-md-7 mb-6'>
                            <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                <label className='required form-label'>
                                    Salary Offered
                                </label>
                                <input
                                    className='form-control'
                                    placeholder='Enter the offered salary'
                                    {...register("offered_salary")}
                                />
                                <div className='fv-plugins-message-container invalid-feedback'>
                                    {errors.offered_salary?.message}
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
                                    {errors.description?.message}
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
    );
};

export default Add;
