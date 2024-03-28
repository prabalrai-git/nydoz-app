import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import API_ROUTE from "../../../../service/api";
import { statusSchema } from "../../../../validations/company.validator";
import Spinner from "react-bootstrap/Spinner";
import useMutation from "../../../../hooks/useMutation";
import { toast } from "react-toastify";
import { IStatusResponse } from "../../../../types/payload.type";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import useValidationError from "../../../../hooks/useValidationError";
import useHandleShowError from "../../../../hooks/useHandleShowError";

interface IAddStatusForm {
  title: string;
  code: string;
  background_color_class: string;
  text_color_class: string;
  action_api_url: string;
  group_code: string;
  is_group_default: boolean;
}

interface IModalProps {
  show: boolean;
  handleClose: () => void;
  companyId: string;
  setFetchAgain: (value: boolean) => void;
  selectedData?: IStatusResponse;
  setSelectedData?: (value: IStatusResponse) => void;
}

const AddStatus = (props: IModalProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { show, handleClose, setFetchAgain, selectedData } = props;

  const { postData, updateData, isLoading, error, errList } =
    useMutation<IStatusResponse>(API_ROUTE.STATUSES, true);

  const {
    register,
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddStatusForm>({
    resolver: yupResolver(statusSchema),
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // for Edit Data
  useEffect(() => {
    if (selectedData) {
      reset({
        title: selectedData.title,
        code: selectedData.code,
        background_color_class: selectedData.background_color_class,
        text_color_class: selectedData.text_color_class,
        action_api_url: selectedData.action_api_url,
        group_code: selectedData.group_code,
        is_group_default: selectedData.is_group_default,
      });
    } else {
      reset({
        title: "",
        code: "",
        background_color_class: "",
        text_color_class: "",
        action_api_url: "",
        group_code: "",
        is_group_default: false,
      });
    }
  }, [reset, selectedData]);

  useEffect(() => {
    if (errList) {
      Object.keys(errList).forEach((field) => {
        const fieldName = field as keyof IAddStatusForm;
        if (errList?.[fieldName]) {
          errors[fieldName] = {
            type: "manual",
            message: errList[fieldName][0], // Assuming you want to use only the first error message
          };
        }
      });
    }
  }, [errList, setError]);

  // useEffect(() => {
  //   if (location?.state?.data && location?.state?.data?.id) {
  //     reset(location?.state?.data);
  //   }
  // }, [location?.state?.data, reset]);

  const onFormSubmit = handleSubmit(async (data: IAddStatusForm) => {
    if (selectedData) {
      // return console.log(selectedData);
      const response = await updateData(
        selectedData.id,
        data as IStatusResponse
      );
      if (response?.status === 200) {
        toast.success("Status updated successfully");
        reset({
          title: "",
          code: "",
          background_color_class: "",
          text_color_class: "",
          action_api_url: "",
          group_code: "",
          is_group_default: false,
        });
        setFetchAgain(true);
        handleClose();
      }
    } else {
      const response = await postData(data as IStatusResponse);
      if (response?.status === 201) {
        toast.success("Status Added successfully");
        reset({
          title: "",
          code: "",
          background_color_class: "",
          text_color_class: "",
          action_api_url: "",
          group_code: "",
          is_group_default: false,
        });
        setFetchAgain(true);
        handleClose();
      }
    }

    //////
    // let response;
    // if (location?.state?.data?.id) {
    //   const tempPostData: IStatusPayload = data;
    //   response = await updateData(location?.state?.data?.id, tempPostData);
    //   if (response?.data?.status === "ok") {
    //     toast.success("Status updated Successfully");
    //     navigate(-1);
    //   }
    // } else {
    //   const tempPostData: IStatusPayload = data;
    //   response = await postData(tempPostData);
    //   if (response?.data?.status === "ok") {
    //     toast.success("Status Added Successfully");
    //     navigate(-1);
    //   }
    // }
  });

  const handleModalClose = () => {
    reset({
      title: "",
      code: "",
      background_color_class: "",
      text_color_class: "",
      action_api_url: "",
      group_code: "",
      is_group_default: false,
    });
    handleClose();
  };

  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <div className="text-gray-900  fs-2 fw-bold me-1">
            {selectedData ? "Update" : "Add"} Status
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="">
        <form className="form w-100 px-6" onSubmit={onFormSubmit}>
          <div>
            <div className="row">
              <div className="col-12 ">
                <div className="row ">
                  <div className="col-12 col-md-12">
                    <div className="row ">
                      <div className="col-md-6  gap-5 gap-md-7 mb-6">
                        <div className="fv-row flex-row-fluid fv-plugins-icon-container">
                          <label className="required form-label">
                            Status Title
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your first name"
                            {...register("title")}
                          />
                          <div className="fv-plugins-message-container invalid-feedback px-3">
                            {errors.title?.message}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6  gap-5 gap-md-7 mb-6">
                        <div className="fv-row flex-row-fluid fv-plugins-icon-container">
                          <label className="required form-label">
                            Color Code
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your last name"
                            {...register("code")}
                          />
                          <div className="fv-plugins-message-container invalid-feedback">
                            {errors.code?.message}
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-6  gap-5 gap-md-7 mb-6">
                        <div className="fv-row flex-row-fluid fv-plugins-icon-container">
                          <label className=" form-label">
                            Background Color Class
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            {...register("background_color_class")}
                            placeholder="Enter Email Address"
                          />
                          <div className="fv-plugins-message-container invalid-feedback">
                            {errors.background_color_class?.message}
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-6  gap-5 gap-md-7 mb-6">
                        <div className="fv-row flex-row-fluid fv-plugins-icon-container">
                          <label className=" form-label">
                            Text Color Class
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Enter mobile number"
                            {...register("text_color_class")}
                          />
                          <div className="fv-plugins-message-container invalid-feedback">
                            {errors.text_color_class?.message}
                          </div>
                        </div>
                      </div>
                      <div className="col-12   gap-5 gap-md-7 mb-6">
                        <div className="fv-row flex-row-fluid fv-plugins-icon-container">
                          <label className="required form-label">
                            Action API URL
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Enter mobile number"
                            {...register("action_api_url")}
                          />
                          <div className="fv-plugins-message-container invalid-feedback">
                            {errors.action_api_url?.message}
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-6  gap-5 gap-md-7 mb-6">
                        <div className="fv-row flex-row-fluid fv-plugins-icon-container">
                          <label className=" form-label">Group Code</label>
                          <input
                            className="form-control"
                            type="text"
                            {...register("group_code")}
                            placeholder="Enter Email Address"
                          />
                          <div className="fv-plugins-message-container invalid-feedback">
                            {errors.group_code?.message}
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-6  gap-5 gap-md-7 mb-6">
                        <div className="fv-row flex-row-fluid fv-plugins-icon-container">
                          <div className="mb-3 form-check">
                            <input
                              type="checkbox"
                              {...register("is_group_default")}
                              className="form-check-input"
                            />
                            <label className="form-check-label">
                              Is Group Default
                            </label>
                          </div>

                          <div className="fv-plugins-message-container invalid-feedback">
                            {errors.is_group_default?.message}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="d-flex justify-content-end my-6 mb-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn btn-secondary btn-sm me-5 mb-6"
              >
                cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary btn-sm mb-6"
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
                  <span>{location?.state?.data?.id ? "Update" : "Save"}</span>
                )}
              </button>
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
    // <div className=" my-6">
    //   <div className="card shadow-sm">
    //     <div className="card-header">
    //       <h3 className="card-title">Add Status Details</h3>
    //       <div className="card-toolbar">
    //         <button className="btn btn-sm btn-secondary">Clear</button>
    //       </div>
    //     </div>
    //     <div className="card-body">
    //       <form className="form w-100 px-6" onSubmit={onFormSubmit}>
    //         <div>
    //           <div className="row">
    //             <div className="col-12 ">
    //               <div className="row ">
    //                 <div className="col-12 col-md-12">
    //                   <div className="row ">
    //                     <div className="col-md-6  gap-5 gap-md-7 mb-6">
    //                       <div className="fv-row flex-row-fluid fv-plugins-icon-container">
    //                         <label className="required form-label">
    //                           Status Title
    //                         </label>
    //                         <input
    //                           type="text"
    //                           className="form-control"
    //                           placeholder="Enter your first name"
    //                           {...register("title")}
    //                         />
    //                         <div className="fv-plugins-message-container invalid-feedback px-3">
    //                           {errors.title?.message}
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div className="col-md-6  gap-5 gap-md-7 mb-6">
    //                       <div className="fv-row flex-row-fluid fv-plugins-icon-container">
    //                         <label className="required form-label">
    //                           Color Code
    //                         </label>
    //                         <input
    //                           type="text"
    //                           className="form-control"
    //                           placeholder="Enter your last name"
    //                           {...register("code")}
    //                         />
    //                         <div className="fv-plugins-message-container invalid-feedback">
    //                           {errors.code?.message}
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div className="col-12 col-md-6  gap-5 gap-md-7 mb-6">
    //                       <div className="fv-row flex-row-fluid fv-plugins-icon-container">
    //                         <label className=" form-label">
    //                           Background Color Class
    //                         </label>
    //                         <input
    //                           className="form-control"
    //                           type="text"
    //                           {...register("background_color_class")}
    //                           placeholder="Enter Email Address"
    //                         />
    //                         <div className="fv-plugins-message-container invalid-feedback">
    //                           {errors.background_color_class?.message}
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div className="col-12 col-md-6  gap-5 gap-md-7 mb-6">
    //                       <div className="fv-row flex-row-fluid fv-plugins-icon-container">
    //                         <label className=" form-label">
    //                           Text Color Class
    //                         </label>
    //                         <input
    //                           className="form-control"
    //                           type="text"
    //                           placeholder="Enter mobile number"
    //                           {...register("text_color_class")}
    //                         />
    //                         <div className="fv-plugins-message-container invalid-feedback">
    //                           {errors.text_color_class?.message}
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div className="col-12   gap-5 gap-md-7 mb-6">
    //                       <div className="fv-row flex-row-fluid fv-plugins-icon-container">
    //                         <label className="required form-label">
    //                           Action API URL
    //                         </label>
    //                         <input
    //                           className="form-control"
    //                           type="text"
    //                           placeholder="Enter mobile number"
    //                           {...register("action_api_url")}
    //                         />
    //                         <div className="fv-plugins-message-container invalid-feedback">
    //                           {errors.action_api_url?.message}
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div className="col-12 col-md-6  gap-5 gap-md-7 mb-6">
    //                       <div className="fv-row flex-row-fluid fv-plugins-icon-container">
    //                         <label className=" form-label">Group Code</label>
    //                         <input
    //                           className="form-control"
    //                           type="text"
    //                           {...register("group_code")}
    //                           placeholder="Enter Email Address"
    //                         />
    //                         <div className="fv-plugins-message-container invalid-feedback">
    //                           {errors.group_code?.message}
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div className="col-12 col-md-6  gap-5 gap-md-7 mb-6">
    //                       <div className="fv-row flex-row-fluid fv-plugins-icon-container">
    //                         <div className="mb-3 form-check">
    //                           <input
    //                             type="checkbox"
    //                             {...register("is_group_default")}
    //                             className="form-check-input"
    //                           />
    //                           <label className="form-check-label">
    //                             Is Group Default
    //                           </label>
    //                         </div>

    //                         <div className="fv-plugins-message-container invalid-feedback">
    //                           {errors.is_group_default?.message}
    //                         </div>
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>

    //           <div className="d-flex justify-content-end my-6 mb-6">
    //             <button
    //               type="button"
    //               onClick={() => navigate(-1)}
    //               className="btn btn-secondary btn-sm me-5 mb-6"
    //             >
    //               cancel
    //             </button>
    //             <button
    //               type="submit"
    //               disabled={isLoading}
    //               className="btn btn-primary btn-sm mb-6"
    //             >
    //               {isLoading ? (
    //                 <>
    //                   <span className="ms-2">Please Wait...</span>
    //                   <Spinner
    //                     size="sm"
    //                     animation="border"
    //                     role="status"
    //                   ></Spinner>
    //                 </>
    //               ) : (
    //                 <span>{location?.state?.data?.id ? "Update" : "Save"}</span>
    //               )}
    //             </button>
    //           </div>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
};

export default AddStatus;
