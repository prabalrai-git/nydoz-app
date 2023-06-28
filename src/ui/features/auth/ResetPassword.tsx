import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { EyeSlash, Eye } from "react-bootstrap-icons";
import { ToastContainer, toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// ------------------------------ import components
import Images from "../../../constants/Images";
import Spinner from "react-bootstrap/Spinner";
import useMutation from "../../../hooks/useMutation";
import API_ROUTE from "../../../service/api";
import { ResetPasswordSchema } from "../../../validations/auth.validators";

interface IChangePasswordFormData {
    password: string;
    password_confirmation: string;
}

const ResetPassword = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const reset_code = searchParams.get("reset_code");
    const email = searchParams.get("email");

    const { isLoading, error, postData } = useMutation(
        API_ROUTE.RESET_PASSWORD,
        false
    );
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IChangePasswordFormData>({
        defaultValues: {
            password: "",
            password_confirmation: "",
        },
        resolver: yupResolver(ResetPasswordSchema),
    });

    const onFormSubmit = handleSubmit(async (data: IChangePasswordFormData) => {
        console.log(data);
        if (!reset_code || !email) return toast.error("Something went wrong");

        const payload = { ...data, email, reset_code };
        const response = await postData(payload);
        if (response?.data?.message) {
            toast.success(response?.data?.message);
            navigate("/login");
        } else {
            toast.error(error);
        }
    });

    return (
        <div className='bg-light h-100vh '>
            <div className='container '>
                <div className='row '>
                    <div className='col-md-6 offset-md-3'>
                        <div className='card mt-4'>
                            <div className='card-body'>
                                <div className='text-center mb-3'>
                                    <img
                                        src={Images.CompanyLogo}
                                        height='48'
                                        className='mb-4'
                                    />
                                    <h5>Reset Password</h5>
                                </div>

                                <form onSubmit={onFormSubmit}>
                                    <div className='form-group mb-3'>
                                        <label
                                            className='mb-2'
                                            htmlFor='password'>
                                            New Password<span>*</span>
                                        </label>
                                        <div className='position-relative'>
                                            <input
                                                className='form-control'
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                {...register("password")}
                                                placeholder='Enter new Password'
                                            />
                                            <span
                                                onClick={() =>
                                                    setShowPassword(
                                                        (prev) => !prev
                                                    )
                                                }
                                                className='btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 '>
                                                {showPassword ? (
                                                    <Eye size={16} />
                                                ) : (
                                                    <EyeSlash size={16} />
                                                )}
                                            </span>
                                        </div>
                                        <p className='text-danger mt-1'>
                                            {errors.password?.message}
                                        </p>
                                    </div>

                                    <div className='form-group mb-3'>
                                        <label
                                            className='mb-2'
                                            htmlFor='password'>
                                            Confirm Password<span>*</span>
                                        </label>
                                        <div className='position-relative'>
                                            <input
                                                className='form-control'
                                                type={
                                                    showConfirmPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                {...register(
                                                    "password_confirmation"
                                                )}
                                                placeholder='Enter your password again'
                                            />
                                            <span
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        (prev) => !prev
                                                    )
                                                }
                                                className='btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 '>
                                                {showConfirmPassword ? (
                                                    <Eye size={16} />
                                                ) : (
                                                    <EyeSlash size={16} />
                                                )}
                                            </span>
                                        </div>
                                        <p className='text-danger mt-1'>
                                            {
                                                errors.password_confirmation
                                                    ?.message
                                            }
                                        </p>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <button
                                            type='submit'
                                            className='btn btn-primary btn-block w-100'>
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
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ResetPassword;
