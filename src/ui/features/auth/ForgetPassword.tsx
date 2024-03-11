import { useState } from "react";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// ------------------------------ import components
import Images from "../../../constants/Images";
import Spinner from "react-bootstrap/Spinner";
import useMutation from "../../../hooks/useMutation";
import API_ROUTE from "../../../service/api";
import { ForgetPasswordSchema } from "../../../validations/auth.validators";
import { Check2Circle } from "react-bootstrap-icons";
import BackButton from "../../shared/molecules/BackButton";
interface IChangePasswordFormData {
  email: string;
}

const ChangePassword = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { isLoading, error, postData } = useMutation(
    API_ROUTE.FORGOT_PASSWORD,
    false
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IChangePasswordFormData>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(ForgetPasswordSchema),
  });

  const onFormSubmit = handleSubmit(async (data: IChangePasswordFormData) => {
    const response = await postData(data);
    if (response?.data?.message) {
      toast.success(response?.data?.message);
      setIsEmailSent(true);
    } else {
      toast.error(error);
    }
  });

  return (
    <div className="bg-light h-100vh ">
      <div className="container ">
        <div className="row ">
          <div className="col-md-6 offset-md-3">
            {!isEmailSent ? (
              <div className="card mt-4">
                <div className="card-body ">
                  <div>
                    <div className="text-center  ">
                      <img
                        src={Images.CompanyLogo}
                        height="48"
                        className="mb-4"
                      />
                      <h5>Change Password</h5>
                      <p className="text-muted mt-1">
                        Enter your registered email below to recieve password
                        reset instruction.
                      </p>
                    </div>
                    <div className="d-flex float-end ">
                      <BackButton />
                    </div>
                  </div>
                  <form onSubmit={onFormSubmit}>
                    <div className="form-group mb-3">
                      <label className="required mb-2" htmlFor="email">
                        Email
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        {...register("email")}
                        placeholder="Enter your email address"
                      />
                      <p className="text-danger mt-1">
                        {errors.email?.message}
                      </p>
                    </div>

                    <div className="form-group mb-3">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block w-100"
                      >
                        {isLoading ? (
                          <>
                            <span className="ms-2">Please Wait...</span>
                            <Spinner
                              size="sm"
                              animation="border"
                              role="status"
                            ></Spinner>
                          </>
                        ) : (
                          <span>Submit</span>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div className="m-4">
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="card-title  mb-1 ">
                      <span className="text-success mx-2">Email Sent</span>
                      <span className="text-success">
                        <Check2Circle />
                      </span>
                    </h5>
                    <p className="card-text text-primary">
                      Please check your inbox and click in the recieved link to
                      reset a password.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
