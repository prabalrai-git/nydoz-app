import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { DynamicFormPayload } from "../../../../types/payload.type";
import API_ROUTE from "../../../../service/api";
import useMutation from "../../../../hooks/useMutation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Button, Modal, Spinner } from "react-bootstrap";

interface IModalProps {
  show: boolean;
  handleClose: () => void;
  companyId: string;
  setFetchAgain: (value: boolean) => void;
  selectedData?: DynamicFormResponse;
  setSelectedData?: (value: DynamicFormResponse) => void;
}

export interface DynamicFormResponse extends DynamicFormPayload {
  id: string;
}

const DynamicForm = (props: IModalProps) => {
  const [isAccountRequired, setIsAccountRequired] = useState(false);
  const navigate = useNavigate();
  const { show, handleClose, setFetchAgain, selectedData } = props;
  const { postData, updateData, errList, isLoading } = useMutation(
    API_ROUTE.PAYMENT_METHODS,
    true
  );
  const handleCheckboxChange = () => {
    setIsAccountRequired(!isAccountRequired);
  };
  const defaultValues: DynamicFormPayload = {
    name: "",
    is_account_required: false,
    custom_fields: [
      {
        name: "",
        type: "text",
        options: "",
        is_required: true,
        multiple_value: false,
      },
    ],
  };

  const forMultipleValues = ["select", "checkbox", "radio"];

  const {
    watch,
    handleSubmit,
    control,
    register,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  // useValidationError({ errList, setError });
  // useHandleShowError(error);

  useEffect(() => {
    if (selectedData) {
      reset({
        name: selectedData.name,
        is_account_required: selectedData.is_account_required,
        custom_fields: selectedData.custom_fields,
      });
    } else {
      reset({
        name: "",
        is_account_required: false,
        custom_fields: [
          {
            name: "",
            type: "text",
            options: "",
            is_required: true,
            multiple_value: false,
          },
        ],
      });
    }
  }, [reset, selectedData]);

  useEffect(() => {
    if (errList) {
      Object.keys(errList).forEach((field) => {
        const fieldName = field as keyof DynamicFormPayload;
        if (errList?.[fieldName]) {
          errors[fieldName] = {
            type: "manual",
            message: errList[fieldName][0], // Assuming you want to use only the first error message
          };
        }
      });
    }
  }, [errList, setError]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "custom_fields",
  });

  const onSubmit = handleSubmit(async (data: DynamicFormPayload) => {
    if (selectedData) {
      const response = await updateData(
        selectedData.id,
        data as DynamicFormResponse
      );
      if (response?.status === 200) {
        toast.success("User updated successfully");
        reset();
        setFetchAgain(true);
        handleClose();
      }
    } else {
      const payload = data.custom_fields.map((field) => {
        const optionArry = field.options.split(",");
        return {
          name: field.name,
          type: field.type,
          options: optionArry,
          is_required: field.is_required,
          multiple_value:
            field.type.toLowerCase() === "select" ||
            field.type.toLowerCase() === "checkbox"
              ? true
              : false,
        };
      });

      try {
        const response = await postData({
          ...data,
          isAccountRequired: isAccountRequired,
          custom_fields: payload,
        });
        if (response?.status === 201) {
          toast.success("Payment Method Added Successfully");
          navigate(-1);
        }
      } catch (error) {}
    }
  });

  const typeValues = watch(`custom_fields`);
  // const formName = watch(`name`);
  const formRequired = watch(`is_account_required`);

  useEffect(() => {}, [formRequired]);

  const handleModalClose = () => {
    reset({
      name: "",
      is_account_required: false,
      custom_fields: [
        {
          name: "",
          type: "text",
          options: "",
          is_required: true,
          multiple_value: false,
        },
      ],
    });
    handleClose();
  };

  // const onFormSubmit = handleSubmit(async (data: DynamicFormPayload) => {
  //   if (selectedData) {
  //     const response = await updateData(
  //       selectedData?.id,
  //       data as DynamicFormResponse
  //     );
  //     if (response?.status === 200) {
  //       toast.success("Payment Method updated successfully");
  //       reset({
  //         name: "",
  //         is_account_required: false,
  //         custom_fields: [
  //           {
  //             name: "",
  //             type: "text",
  //             options: "",
  //             is_required: true,
  //             multiple_value: false,
  //           },
  //         ],
  //       });
  //       setFetchAgain(true);
  //       handleClose();
  //     }
  //   } else {
  //     const response = await postData(data as DynamicFormResponse);
  //     if (response?.status === 201) {
  //       toast.success("Payment Method Added successfully");
  //       reset({
  //         name: "",
  //         is_account_required: false,
  //         custom_fields: [
  //           {
  //             name: "",
  //             type: "text",
  //             options: "",
  //             is_required: true,
  //             multiple_value: false,
  //           },
  //         ],
  //       });
  //       setFetchAgain(true);
  //       handleClose();
  //     }
  //   }
  // });

  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <div className="text-gray-900  fs-2 fw-bold me-1">
            {selectedData ? "Update" : "Add"} Payment Method
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="">
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              {...register("name")}
              placeholder="Name"
            />
          </div>
          <div className="my-6">
            <label className="form-label mx-3">Is Account Required</label>
            {/* <input
                className="form-check-input"
                type="checkbox"
                // value="true"
                {...register("is_account_required", {
                  setValueAs: (value) => (value === true ? true : false),
                })}
              /> */}
            <input
              className="form-check-input"
              type="checkbox"
              checked={isAccountRequired}
              onChange={handleCheckboxChange}
            />
          </div>
          <div>
            {fields.map((field, index) => {
              const indexValue = index;
              return (
                <div
                  className="my-6  p-6 tw-rounded-lg tw-shadow-lg"
                  key={field.id}
                >
                  <h5 className="text-info my-5 tw-font-bold">
                    Custom Field Number: {index + 1}
                  </h5>
                  <div className="mb-3">
                    <label className="form-label">Input Field Name</label>
                    <input
                      type="text"
                      {...register(`custom_fields.${indexValue}.name`)}
                      placeholder="Enter the Field Name"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="form-label">Input Type</label>
                    <select
                      {...register(`custom_fields.${indexValue}.type`)}
                      className="form-select"
                    >
                      <option value="text">Text</option>
                      <option value="select">Select</option>
                      <option value="checkbox">Checkbox</option>
                      <option value="radio">Radio</option>
                      {/* <option value="textarea">Textarea</option> */}
                    </select>
                  </div>

                  {forMultipleValues.includes(typeValues[index].type) && (
                    <input
                      type="text"
                      {...register(`custom_fields.${index}.options`)}
                      placeholder={`Enter the options separated by comma`}
                      className="form-control mb-3"
                    />
                  )}

                  <div className="d-flex justify-content-between">
                    <div className="my-3">
                      <label className="form-label mx-3">
                        Is Input Field Required
                      </label>
                      <input
                        className="form-check-input tw-p-1"
                        type="checkbox"
                        {...register(`custom_fields.${indexValue}.is_required`)}
                      />
                    </div>
                    <button
                      className=" tw-bg-appRed hover:tw-bg-appRedHover  tw-text-white tw-h-12 tw-px-3 tw-font-bold tw-rounded-lg "
                      onClick={() => remove(index)}
                    >
                      Delete Input field
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="d-flex ">
              <button
                type="button"
                className="btn  btn-sm tw-bg-appBlue hover:tw-bg-appBlueHover tw-text-white hover:tw-text-white"
                onClick={() =>
                  append({
                    name: "",
                    type: "text",
                    options: "",
                    is_required: true,
                    multiple_value: false,
                  })
                }
              >
                Add More Custom Field
              </button>
            </div>
          </div>

          {/* <pre>{JSON.stringify(typeValues, null, 2)}</pre> */}
          {/* <div className="d-flex my-6 justify-content-end">
            <button className="btn btn-primary btn-sm" type="submit">
              Submit
            </button>
          </div> */}
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
          onClick={onSubmit}
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

export default DynamicForm;
