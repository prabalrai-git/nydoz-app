import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import useMutation from "../../../../hooks/useMutation";
import API_ROUTE from "../../../../service/api";
import { userToCompanySchema } from "../../../../validations/company.validator";
import { Eye, EyeSlash } from "react-bootstrap-icons";

export interface IFormData {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  password: string;
  password_confirmation: string;
}

export interface IFormResponse extends IFormData {
  id: string;
}

export interface IModalProps {
  show: boolean;
  handleClose: () => void;
  companyId: string;
  setFetchAgain: (value: boolean) => void;
  selectedData?: IFormResponse;
  setSelectedData?: (value: IFormResponse) => void;
}

const AddUsers = (props: IModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { show, handleClose, setFetchAgain, selectedData } = props;
  const { postData, updateData, errList, error, isLoading } = useMutation(
    API_ROUTE.USER,
    true
  );

  const {
    register,
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(userToCompanySchema),
  });
  // for Error Message
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // for Edit Data
  useEffect(() => {
    if (selectedData) {
      reset({
        first_name: selectedData.first_name,
        last_name: selectedData.last_name,
        email: selectedData.email,
        mobile: selectedData.mobile,
        password: selectedData.password,
        password_confirmation: selectedData.password_confirmation,
      });
    } else {
      reset({
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        password: "",
        password_confirmation: "",
      });
    }
  }, [reset, selectedData]);

  useEffect(() => {
    if (errList) {
      Object.keys(selectedData).forEach((field) => {
        const fieldName = field as keyof IFormData;
        if (errList?.[fieldName]) {
          errors[fieldName] = {
            type: "manual",
            message: errList[fieldName][0], // Assuming you want to use only the first error message
          };
        }
      });
    }
  }, [errList, setError]);

  const onFormSubmit = handleSubmit(async (data: IFormData) => {
    if (selectedData) {
      const response = await updateData(selectedData.id, data as IFormResponse);
      if (response?.status === 200) {
        toast.success("User updated successfully");
        reset({
          first_name: "",
          last_name: "",
          email: "",
          mobile: "",
          password: "",
          password_confirmation: "",
        });
        setFetchAgain(true);
        handleClose();
      }
    } else {
      const response = await postData(data as IFormResponse);
      if (response?.status === 201) {
        toast.success("User Added successfully");
        reset({
          first_name: "",
          last_name: "",
          email: "",
          mobile: "",
          password: "",
          password_confirmation: "",
        });
        setFetchAgain(true);
        handleClose();
      }
    }
  });

  const handleModalClose = () => {
    reset({
      first_name: "",
      last_name: "",
      email: "",
      mobile: "",
      password: "",
      password_confirmation: "",
    });
    handleClose();
  };

  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <div className="text-gray-900  fs-2 fw-bold me-1">
            {selectedData ? "Update" : "Add"} User
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="">
        <form
          onSubmit={onFormSubmit}
          className="form w-100 "
          id="kt_sign_up_form"
          data-kt-redirect-url="../../demo31/dist/authentication/layouts/corporate/sign-in.html"
          action="#"
        >
          <div className="row">
            <div className="col-12 col-md-6">
              <label className="form-label required" htmlFor="first_name">
                First Name
              </label>
              <div className="fv-row mb-6">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="form-control"
                  {...register("first_name")}
                />
                <p className="text-danger mt-1">{errors.first_name?.message}</p>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label required" htmlFor="last_name">
                Last Name
              </label>
              <div className="fv-row mb-6">
                <input
                  type="text"
                  placeholder="Last Name"
                  className="form-control"
                  {...register("last_name")}
                />
                <p className="text-danger mt-1">{errors.last_name?.message}</p>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label required" htmlFor="Email">
                Email
              </label>
              <div className="fv-row mb-6">
                <input
                  type="text"
                  placeholder="Email"
                  className="form-control "
                  {...register("email")}
                />
                <p className="text-danger mt-1">{errors.email?.message}</p>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label required" htmlFor="mobile_number">
                Mobile Number
              </label>
              <div className="fv-row mb-6">
                <input
                  type="text"
                  placeholder="Enter your Mobile Number"
                  className="form-control"
                  {...register("mobile")}
                />
                <p className="text-danger mt-1">{errors.mobile?.message}</p>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="fv-row mb-8" data-kt-password-meter="true">
                <label className="form-label required" htmlFor="password">
                  Password
                </label>
                <div className="mb-1">
                  <div className="position-relative mb-3">
                    <input
                      className="form-control bg-transparent"
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      placeholder="Password"
                    />
                    <span
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2"
                    >
                      {showPassword ? (
                        <Eye size={16} />
                      ) : (
                        <EyeSlash size={16} />
                      )}
                    </span>
                  </div>
                </div>
                <p className="text-danger mt-1">{errors.password?.message}</p>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="fv-row mb-8" data-kt-password-meter="true">
                <label
                  className="form-label required"
                  htmlFor="confrimPassword"
                >
                  Confirm Password
                </label>
                <div className="mb-1">
                  <div className="position-relative mb-3">
                    <input
                      className="form-control bg-transparent"
                      type={showConfirmPassword ? "text" : "password"}
                      {...register("password_confirmation")}
                      placeholder="Enter your Password again"
                    />
                    <span
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2"
                    >
                      {showConfirmPassword ? (
                        <Eye size={16} />
                      ) : (
                        <EyeSlash size={16} />
                      )}
                    </span>
                  </div>
                </div>
                <p className="text-danger mt-1">
                  {errors.password_confirmation?.message}
                </p>
              </div>
            </div>

            {/* <div className="col-12 offset-md-6 col-md-6 mb-3 d-flex justify-content-center">
              <Button
                variant="primary"
                type="submit"
                disabled={isLoading}
                className="w-100"
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
              </Button>
            </div> */}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button size="sm" variant="secondary" onClick={handleModalClose}>
          Cancel
        </Button>
        <Button
          size="sm"
          variant="primary"
          className="fw-bold"
          onClick={onFormSubmit}
          type="submit"
        >
          {isLoading ? (
            <>
              <span className="ms-2">uploading...</span>
              <Spinner size="sm" animation="border" role="status"></Spinner>
            </>
          ) : (
            <span className="mx-3">{selectedData ? "Update" : "Add"}</span>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddUsers;
