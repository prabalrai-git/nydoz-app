import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EyeSlash, Eye } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// ------------------------------ import components
import Images from "../../../constants/Images";
import Spinner from "react-bootstrap/Spinner";
import useMutation from "../../../hooks/useMutation";
import API_ROUTE from "../../../service/api";
import { ChangePasswordSchema } from "../../../validations/auth.validators";

interface IChangePasswordFormData {
  current_password: string;
  password: string;
  password_confirmation: string;
}

const ChangePassword = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { isLoading, error, postData, errList } = useMutation(
    API_ROUTE.CHANGE_PASSWORD,
    true
  );

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IChangePasswordFormData>({
    defaultValues: {
      current_password: "",
      password: "",
      password_confirmation: "",
    },
    resolver: yupResolver(ChangePasswordSchema),
  });

  useEffect(() => {
    if (errList?.current_password) {
      setError("current_password", {
        type: "manual",
        message: errList?.current_password[0],
      });
    }
  }, [errList, setError]);

  const onFormSubmit = handleSubmit(async (data: IChangePasswordFormData) => {
    const response = await postData(data);
    if (response?.data?.message) {
      toast.success(response?.data?.message || "Password Changed Successfully");

      navigate("/workspace", { replace: true });
    }
  });

  return (
    <div className="bg-light h-100vh ">
      <div className="container ">
        <div className="row ">
          <div className="col-md-6 offset-md-3">
            <div className="card mt-4">
              <div className="card-body">
                <div className="text-center mb-3">
                  <img src={Images.CompanyLogo} height="48" className="mb-4" />
                  <h5>Change Password</h5>
                </div>
                <form onSubmit={onFormSubmit}>
                  <div className="form-group mb-3">
                    <label className=" required mb-2" htmlFor="password">
                      Current Password
                    </label>
                    <div className="position-relative">
                      <input
                        className="form-control"
                        type={showCurrentPassword ? "text" : "password"}
                        {...register("current_password")}
                        placeholder="Enter your current Password"
                      />
                      <span
                        onClick={() => setShowCurrentPassword((prev) => !prev)}
                        className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 "
                      >
                        {showCurrentPassword ? (
                          <Eye size={16} />
                        ) : (
                          <EyeSlash size={16} />
                        )}
                      </span>
                    </div>
                    <p className="text-danger mt-1">
                      {errors.current_password?.message}
                    </p>
                  </div>
                  <div className="form-group mb-3">
                    <label className="required mb-2" htmlFor="password">
                      New Password
                    </label>
                    <div className="position-relative">
                      <input
                        className="form-control"
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        placeholder="Enter new Password"
                      />
                      <span
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 "
                      >
                        {showPassword ? (
                          <Eye size={16} />
                        ) : (
                          <EyeSlash size={16} />
                        )}
                      </span>
                    </div>
                    <p className="text-danger mt-1">
                      {errors.password?.message}
                    </p>
                  </div>

                  <div className="form-group mb-3">
                    <label className="required mb-2" htmlFor="password">
                      Confirm Password
                    </label>
                    <div className="position-relative">
                      <input
                        className="form-control"
                        type={showConfirmPassword ? "text" : "password"}
                        {...register("password_confirmation")}
                        placeholder="Enter your password again"
                      />
                      <span
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 "
                      >
                        {showConfirmPassword ? (
                          <Eye size={16} />
                        ) : (
                          <EyeSlash size={16} />
                        )}
                      </span>
                    </div>
                    <p className="text-danger mt-1">
                      {errors.password_confirmation?.message}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
