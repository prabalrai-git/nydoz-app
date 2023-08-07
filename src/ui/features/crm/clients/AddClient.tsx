import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import { XCircle } from "react-bootstrap-icons";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Spinner } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

import { clientSchema } from "../../../../validations/crm.validators";
import CountryCode from "../../../shared/atoms/CountryCode";
import { ISelectProps } from "../../../../types/react-select.type";
import {
    IClientPayload,
    IClientResponse,
} from "../../../../types/products.types";
import {
    IVisaTypeResponse,
    ICurrencysResponse,
} from "../../../../types/payload.type";
import { getSelectPropsFromCountry } from "../../../../functions/country";
import useValidationError from "../../../../hooks/useValidationError";
import API_ROUTE from "../../../../service/api";
import useMutation from "../../../../hooks/useMutation";
import useHandleShowError from "../../../../hooks/useHandleShowError";
import CompanyBreadcrumb from "../../../shared/molecules/CompanyBreadcrumb";
import AsyncSelect from "../../../shared/molecules/AsyncReactSelect";
import {
    IAgentResponse,
    IVisitorResponse,
    IEnrollmentOpeningsResponse,
    IEnrollmentResponse,
} from "../../../../types/products.types";
import ServerSelect from "../../../shared/components/ServerSelect";

interface IFormData {
    registration_date: Date;
    first_name: string;
    last_name: string;
    state: string | undefined;
    street_address: string | undefined;
    phone_nos: string[] | [];
    email: string[] | [];
    remarks: string | undefined;
    deal_amount: number;
    applied_position: string;
    expected_salary_pa: number;
    expected_take_off_date: Date;
    visiting_country_state: string | undefined;
}

const AddClient = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const firstName: keyof IVisitorResponse = "first_name";
    const lastName: keyof IVisitorResponse = "last_name";

    const [selectedVistor, setSelectedVistor] = useState<
        IVisitorResponse | undefined
    >();

    const [selectedVisaType, setSelectedVisaType] = useState<
        IVisaTypeResponse | undefined
    >();
    const [selectedAgent, setSelectedAgent] = useState<
        IAgentResponse | undefined
    >();
    const [selectedCountry, setSelectedCountry] = useState<
        ISelectProps | undefined
    >(undefined);
    const [selectedVisitingCountry, setSelectedVisitingCountry] = useState<
        ISelectProps | undefined
    >(undefined);

    const { updateData, postData, isLoading, error, errList } = useMutation(
        API_ROUTE.CM_CLIENTS,
        true
    );

    const [selectedCurrencyCode, setSelectCurrencyCode] = useState<
        ICurrencysResponse | undefined
    >();

    const [selectedEnrollmentInstitute, setSelectEnrollmentInstitute] =
        useState<IEnrollmentResponse | undefined>();

    const [selectedEnrollmentOpening, setSelectEnrollmentOpening] = useState<
        IEnrollmentOpeningsResponse | undefined
    >();

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
            state: "",
            phone_nos: [" "],
            email: [" "],
        },
        resolver: yupResolver(clientSchema),
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "phone_nos" as never,
    });

    const {
        fields: emailFields,
        append: appendEmail,
        remove: removeEmail,
    } = useFieldArray({
        name: "email" as never,
        control,
    });
    useValidationError({ errList, setError });
    useHandleShowError(error);

    const handleResetForm = useCallback(() => {
        const dataDetails: IClientResponse = location?.state?.data;
        const country = getSelectPropsFromCountry(dataDetails?.country);
        const visitingCountry = getSelectPropsFromCountry(
            dataDetails?.visiting_country
        );
        const registrationDateObj = moment(
            dataDetails.registration_date,
            "YYYY-MM-DD HH:mm:ss"
        );
        const expectedTakeUpDateObj = moment(
            dataDetails.expected_take_off_date,
            "YYYY-MM-DD HH:mm:ss"
        );

        setSelectedCountry(country);
        setSelectedVisitingCountry(visitingCountry);
        setSelectedVisaType(dataDetails?.visa_type_id);
        setSelectedAgent(dataDetails?.agent_id);
        setSelectedVistor(dataDetails?.visitor_id);
        setSelectCurrencyCode(dataDetails?.salary_currency_code);
        setSelectEnrollmentInstitute(dataDetails?.enrollment_institute_id);
        setSelectEnrollmentOpening(dataDetails?.enrollment_opening_id);

        reset({
            ...dataDetails,
            registration_date: registrationDateObj.toDate(),
            expected_take_off_date: expectedTakeUpDateObj.toDate(),
        });
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
        console.log(data, "data");
        console.log(selectedCountry, "selectedCountry");
        console.log(selectedVisitingCountry, "selectedVisitingCountry");
        console.log(selectedVisaType, "selectedVisaType");
        console.log(selectedAgent, "selectedAgent");
        console.log(selectedVistor, "selectedVistor");
        console.log(selectedCurrencyCode, "selectedCurrencyCode");

        if (!selectedCountry) {
            toast.error("Please select country");
            return;
        }

        if (!selectedVisitingCountry) {
            toast.error("Please select visiting country");
            return;
        }

        if (!selectedVisaType) {
            toast.error("Please select visa type");
            return;
        }

        let response;

        if (location?.state?.data?.id) {
            const tempPostData: IClientPayload = {
                ...data,
                registration_date: moment(data.registration_date).format(
                    "YYYY-MM-DD HH:mm:ss"
                ),
                expected_take_off_date: moment(
                    data.expected_take_off_date
                ).format("YYYY-MM-DD HH:mm:ss"),

                country: selectedCountry?.value ?? "",
                visiting_country: selectedVisitingCountry?.value ?? "",
                agent_id: selectedAgent?.id ?? "",
                visa_type_id: selectedVisaType?.id ?? "",
                visitor_id: selectedVistor?.id ?? "",
                salary_currency_code: selectedCurrencyCode?.code ?? "",
                enrollment_institute_id: selectedEnrollmentInstitute?.id ?? "",
                enrollment_opening_id: selectedEnrollmentOpening?.id ?? "",
            };

            response = await updateData(
                location?.state?.data?.id,
                tempPostData
            );
            if (response?.data?.status === "ok") {
                toast.success("Client updated Successfully");
                navigate(-1);
            }
        } else {
            const tempPostData: IClientPayload = {
                ...data,
                registration_date: moment(data.registration_date).format(
                    "YYYY-MM-DD HH:mm:ss"
                ),
                expected_take_off_date: moment(
                    data.expected_take_off_date
                ).format("YYYY-MM-DD HH:mm:ss"),

                country: selectedCountry?.value ?? "",
                visiting_country: selectedVisitingCountry?.value ?? "",
                agent_id: selectedAgent?.id ?? "",
                visa_type_id: selectedVisaType?.id ?? "",
                visitor_id: selectedVistor?.id ?? "",
                salary_currency_code: selectedCurrencyCode?.code ?? "",
                enrollment_institute_id: selectedEnrollmentInstitute?.id ?? "",
                enrollment_opening_id: selectedEnrollmentOpening?.id ?? "",
            };
            response = await postData(tempPostData);
            if (response?.data?.status === "ok") {
                toast.success("Client Added  Successfully");
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
                    <h2 className='card-title fw-bold'>Add Visitor Details</h2>
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
                                    <h3
                                        className='fs-4 mb-5'
                                        id='custom-form-control'>
                                        Personal Details
                                    </h3>
                                </div>
                                <div className='row'>
                                    <div className=' col-md-6 gap-5 gap-md-7 mb-6'>
                                        <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                            <label className='required form-label'>
                                                Registration Date:
                                            </label>
                                            <input
                                                type='date'
                                                className='form-control'
                                                placeholder='Enter your first name.'
                                                {...register(
                                                    "registration_date"
                                                )}
                                            />
                                            <div className='fv-plugins-message-container invalid-feedback'>
                                                {
                                                    errors.registration_date
                                                        ?.message
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className=' col-12 col-md-6 gap-5 gap-md-7 mb-6'>
                                        <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                            <label className='form-label'>
                                                Visitor:
                                            </label>
                                            <ServerSelect
                                                placeholder='Search..'
                                                baseUrl={API_ROUTE.CM_VISITORS}
                                                selectedListItem={
                                                    selectedVistor
                                                }
                                                setselectedListItem={
                                                    setSelectedVistor
                                                }
                                                showDataLabel={
                                                    firstName as never
                                                }
                                                showDataLabel2={
                                                    lastName as never
                                                }
                                                showDataLabelFromArray='phone_nos'
                                            />
                                        </div>
                                    </div>

                                    <div className='col-12 col-md-6 gap-5 gap-md-7 mb-6'>
                                        <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                            <label className='form-label'>
                                                Agent:
                                            </label>

                                            <ServerSelect
                                                placeholder='Search..'
                                                baseUrl={API_ROUTE.CM_AGENTS}
                                                selectedListItem={selectedAgent}
                                                setselectedListItem={
                                                    setSelectedAgent
                                                }
                                                showDataLabel={
                                                    firstName as never
                                                }
                                                showDataLabel2={
                                                    lastName as never
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className='col-12 col-md-6 gap-5 gap-md-7 mb-6'>
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
                                    <div className='col-12 col-md-6 gap-5 gap-md-7 mb-6'>
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
                                    <div className='col-12 col-md-6 gap-5 gap-md-7 mb-6'>
                                        <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                            <label className=' form-label'>
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
                                                            <XCircle
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
                                                    className='btn btn-secondary btn-sm'
                                                    onClick={() => append("")}>
                                                    Add More Phone Number
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Email */}
                                    <div className='col-12 col-md-6 gap-5 gap-md-7 mb-6'>
                                        <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                            <label className=' form-label'>
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
                                                            <XCircle
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
                                                    {errors?.email &&
                                                        errors?.email[
                                                            index
                                                        ] && (
                                                            <p className='fv-plugins-message-container invalid-feedback'>
                                                                {
                                                                    errors
                                                                        ?.email[
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
                                                    className='btn btn-secondary btn-sm'
                                                    onClick={() =>
                                                        appendEmail("")
                                                    }>
                                                    Add More Email
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
                                        className='fs-4 mb-5'
                                        id='custom-form-control'>
                                        Address Details
                                    </h2>
                                </div>
                                <div className='row'>
                                    <div className='col-12 gap-5 gap-md-7 mb-6'>
                                        <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                            <label className=' form-label'>
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
                                    <div className='col-12 col-md-6 gap-5 gap-md-7   mb-6'>
                                        <div>
                                            <label className='form-label'>
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
                                    <div className='col-12 col-md-6  gap-5 gap-md-7   mb-6'>
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
                                        className='fs-4 mb-5'
                                        id='custom-form-control'>
                                        Visiting Details
                                    </h2>
                                </div>
                                <div className='row'>
                                    <div className='col-12 col-md-6 gap-5 gap-md-7 mb-6'>
                                        <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                            <label className='required form-label'>
                                                Visa Type
                                            </label>
                                            <AsyncSelect
                                                placeholder='Search for visa type.'
                                                baseUrl={
                                                    API_ROUTE.GET_VISA_TYPES
                                                }
                                                setSelectValue={
                                                    setSelectedVisaType
                                                }
                                                selectValue={selectedVisaType}
                                                dataId='id'
                                                showDataLabel='description'
                                            />
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-6  gap-5 gap-md-7   mb-6'>
                                        <div>
                                            <label className='required form-label'>
                                                Visit Country
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

                                    <div className='col-12 col-md-6 gap-5 gap-md-7 mb-6'>
                                        <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                            <label className='form-label'>
                                                Visiting State
                                            </label>
                                            <input
                                                className='form-control'
                                                placeholder='Enter your visiting state.'
                                                {...register(
                                                    "visiting_country_state"
                                                )}
                                            />
                                            <div className='fv-plugins-message-container invalid-feedback'>
                                                {
                                                    errors
                                                        .visiting_country_state
                                                        ?.message
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-6 gap-5 gap-md-7 mb-6'>
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

                                    <div className='col-12 col-md-6 gap-5 gap-md-7 mb-6'>
                                        <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                            <label className='required form-label'>
                                                Applied Position
                                            </label>
                                            <input
                                                className='form-control'
                                                placeholder='Enter applied position or course.'
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
                                    <div className='col-12 col-md-6 gap-5 gap-md-7 mb-6'>
                                        <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                            <label className='required form-label'>
                                                Expected Salary Per Annum
                                            </label>
                                            <input
                                                type='number'
                                                className='form-control'
                                                placeholder='Enter expected salary/fee per annum.'
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
                                    <div className='col-12 col-md-6 gap-5 gap-md-7 mb-6'>
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
                                    <div className='col-12 col-md-6 gap-5 gap-md-7 mb-6'>
                                        <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                            <label className='required form-label'>
                                                Salary Currency Code
                                            </label>
                                            <AsyncSelect
                                                placeholder='Search for visa type.'
                                                baseUrl={API_ROUTE.GET_CURRENCY}
                                                setSelectValue={
                                                    setSelectCurrencyCode
                                                }
                                                selectValue={
                                                    selectedCurrencyCode
                                                }
                                                dataId='code'
                                                showDataLabel='name'
                                            />
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-6 gap-5 gap-md-7 mb-6'>
                                        <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                            <label className='form-label'>
                                                Enrollment Institute:
                                            </label>

                                            <ServerSelect
                                                placeholder='Search..'
                                                baseUrl={
                                                    API_ROUTE.CM_ENROLLMENT
                                                }
                                                selectedListItem={
                                                    selectedEnrollmentInstitute
                                                }
                                                setselectedListItem={
                                                    setSelectEnrollmentInstitute
                                                }
                                                showDataLabel={"name" as never}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-6 gap-5 gap-md-7 mb-6'>
                                        <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                            <label className='form-label'>
                                                Enrollment Openings:
                                            </label>

                                            <div>
                                                <ServerSelect
                                                    placeholder='Search..'
                                                    baseUrl={`${API_ROUTE.CM_ENROLLMENT_OPENINGS}?enroll_institute_id=${selectedEnrollmentInstitute}`}
                                                    selectedListItem={
                                                        selectedEnrollmentOpening
                                                    }
                                                    setselectedListItem={
                                                        setSelectEnrollmentOpening
                                                    }
                                                    showDataLabel={
                                                        "position" as never
                                                    }
                                                    showDataLabel2={
                                                        "total_opening" as never
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12  gap-5 gap-md-7  mb-6'>
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

export default AddClient;
