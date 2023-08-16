import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeSlash, Eye } from "react-bootstrap-icons";
import { userToCompanySchema } from "../../../../validations/company.validator";
import { yupResolver } from "@hookform/resolvers/yup";
import { Field, useForm } from "react-hook-form";
import useAuthContext from "../../../../context/auth/useAuthContext";
import Button from "react-bootstrap/Button";
import useMutation from "../../../../hooks/useMutation";
import API_ROUTE from "../../../../service/api";
import useHandleShowError from "../../../../hooks/useHandleShowError";
import useValidationError from "../../../../hooks/useValidationError";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import FormHeading from "../../../shared/molecules/FormHeading";

export interface IFormData {
    first_name: string;
    last_name: string;
    email: string;
    mobile: string;
    password: string;
    password_confirmation: string;
}

const AddUser = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const { companyInfo } = useAuthContext();
    const { errList, error, isLoading, postData } = useMutation(
        API_ROUTE.USER,
        true
    );

    const defaultValues: IFormData = {
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        password: "",
        password_confirmation: "",
    };

    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors },
    } = useForm<IFormData>({
        defaultValues,
        resolver: yupResolver(userToCompanySchema),
    });
    useHandleShowError(error);
    useValidationError({ errList, setError });

    const onFormSubmit = handleSubmit(async (data: IFormData) => {
        const response = await postData(data);
        // console.log(response);

        if (response?.status === 201) {
            toast.success("User Added Successfully");
            navigate("../");
        }
    });

    return (
        <section>
            <div className='card shadow shadow-sm '>
                <FormHeading
                    defaultValues={defaultValues}
                    reset={reset}
                    title={`${companyInfo?.name} - Add User`}
                    item={undefined}
                />

                <div className='card-body '>
                    <form
                        onSubmit={onFormSubmit}
                        className='form w-100 '
                        id='kt_sign_up_form'
                        data-kt-redirect-url='../../demo31/dist/authentication/layouts/corporate/sign-in.html'
                        action='#'>
                        <div className='row'>
                            <div className='col-12 col-md-6'>
                                <label
                                    className='form-label required'
                                    htmlFor='first_name'>
                                    First Name
                                </label>
                                <div className='fv-row mb-6'>
                                    <input
                                        type='text'
                                        placeholder='Full Name'
                                        className='form-control'
                                        {...register("first_name")}
                                    />
                                    <p className='text-danger mt-1'>
                                        {errors.first_name?.message}
                                    </p>
                                </div>
                            </div>
                            <div className='col-12 col-md-6'>
                                <label
                                    className='form-label required'
                                    htmlFor='last_name'>
                                    Last Name
                                </label>
                                <div className='fv-row mb-6'>
                                    <input
                                        type='text'
                                        placeholder='Last Name'
                                        className='form-control'
                                        {...register("last_name")}
                                    />
                                    <p className='text-danger mt-1'>
                                        {errors.last_name?.message}
                                    </p>
                                </div>
                            </div>
                            <div className='col-12 col-md-6'>
                                <label
                                    className='form-label required'
                                    htmlFor='Email'>
                                    Email
                                </label>
                                <div className='fv-row mb-6'>
                                    <input
                                        type='text'
                                        placeholder='Email'
                                        className='form-control '
                                        {...register("email")}
                                    />
                                    <p className='text-danger mt-1'>
                                        {errors.email?.message}
                                    </p>
                                </div>
                            </div>

                            <div className='col-12 col-md-6'>
                                <label
                                    className='form-label required'
                                    htmlFor='mobile_number'>
                                    Mobile Number
                                </label>
                                <div className='fv-row mb-6'>
                                    <input
                                        type='text'
                                        placeholder='Enter your Mobile Number'
                                        className='form-control'
                                        {...register("mobile")}
                                    />
                                    <p className='text-danger mt-1'>
                                        {errors.mobile?.message}
                                    </p>
                                </div>
                            </div>
                            <div className='col-12 col-md-6'>
                                <div
                                    className='fv-row mb-8'
                                    data-kt-password-meter='true'>
                                    <label
                                        className='form-label required'
                                        htmlFor='password'>
                                        Password
                                    </label>
                                    <div className='mb-1'>
                                        <div className='position-relative mb-3'>
                                            <input
                                                className='form-control bg-transparent'
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                {...register("password")}
                                                placeholder='Password'
                                            />
                                            <span
                                                onClick={() =>
                                                    setShowPassword(
                                                        (prev) => !prev
                                                    )
                                                }
                                                className='btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2'>
                                                {showPassword ? (
                                                    <Eye size={16} />
                                                ) : (
                                                    <EyeSlash size={16} />
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <p className='text-danger mt-1'>
                                        {errors.password?.message}
                                    </p>
                                </div>
                            </div>
                            <div className='col-12 col-md-6'>
                                <div
                                    className='fv-row mb-8'
                                    data-kt-password-meter='true'>
                                    <label
                                        className='form-label required'
                                        htmlFor='confrimPassword'>
                                        Confirm Password
                                    </label>
                                    <div className='mb-1'>
                                        <div className='position-relative mb-3'>
                                            <input
                                                className='form-control bg-transparent'
                                                type={
                                                    showConfirmPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                {...register(
                                                    "password_confirmation"
                                                )}
                                                placeholder='Enter your Password again'
                                            />
                                            <span
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        (prev) => !prev
                                                    )
                                                }
                                                className='btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2'>
                                                {showConfirmPassword ? (
                                                    <Eye size={16} />
                                                ) : (
                                                    <EyeSlash size={16} />
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <p className='text-danger mt-1'>
                                        {errors.password_confirmation?.message}
                                    </p>
                                </div>
                            </div>

                            <div className='col-12 offset-md-6 col-md-6 mb-3 d-flex justify-content-center'>
                                <Button
                                    variant='primary'
                                    type='submit'
                                    disabled={isLoading}
                                    className='w-100'>
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
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AddUser;
