import { useForm } from "react-hook-form";
import { ITransactionTypeFields } from "../../../../types/payload.type";
import API_ROUTE from "../../../../service/api";
import useMutation from "../../../../hooks/useMutation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IModalProps } from "../user/AddUser";
import { useEffect } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";

const AddTransactionTypes = (props: IModalProps) => {
  const navigate = useNavigate();
  const { show, handleClose, setFetchAgain, selectedData } = props;
  const { postData, updateData, errList, error, isLoading } = useMutation(
    API_ROUTE.POST_TRANSACTION_TYPE,
    true
  );

  const defaultValues: ITransactionTypeFields = {
    name: "",
    description: "",
    transaction_effect: "",
  };

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

  useEffect(() => {
    if (selectedData) {
      reset({
        name: selectedData.name,
        description: selectedData.description,
        transaction_effect: selectedData.transaction_effect,
      });
    } else {
      reset({
        name: "",
        description: "",
        transaction_effect: "",
      });
    }
  }, [reset, selectedData]);

  useEffect(() => {
    if (errList) {
      Object.keys(selectedData).forEach((field) => {
        const fieldName = field as keyof ITransactionTypeFields;
        if (errList?.[fieldName]) {
          errors[fieldName] = {
            type: "manual",
            message: errList[fieldName][0], // Assuming you want to use only the first error message
          };
        }
      });
    }
  }, [errList, setError]);

  // useValidationError({ errList, setError });
  // useHandleShowError(error);

  const onFormSubmit = handleSubmit(async (data: ITransactionTypeFields) => {
    if (selectedData) {
      const response = await updateData(
        selectedData.id,
        data as ITransactionTypeFields
      );
      if (response?.status === 200) {
        toast.success("User updated successfully");
        reset({
          name: "",
          description: "",
          transaction_effect: "",
        });
        setFetchAgain(true);
        handleClose();
      }
    } else {
      const response = await postData(data as ITransactionTypeFields);
      if (response?.status === 201) {
        toast.success("User Added successfully");
        reset({
          name: "",
          description: "",
          transaction_effect: "",
        });
        setFetchAgain(true);
        handleClose();
      }
    }
  });

  // const onSubmit = async (data: ITransactionTypeFields) => {
  //   try {
  //     const response = await postData({
  //       ...data,
  //     });
  //     if (response?.status === 201) {
  //       toast.success("Transaction Type Added Successfully");
  //       navigate(-1);
  //     }
  //   } catch (error) {}
  // };

  // const formName = watch(`name`);

  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <div className="text-gray-900  fs-2 fw-bold me-1">
            {selectedData ? "Update" : "Add"} Transaction Type
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="">
        <form>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              {...register("name")}
              placeholder="Name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              className="form-control"
              {...register("description")}
              placeholder="Description"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Transaction Effect</label>
            <input
              className="form-control"
              {...register("transaction_effect")}
              placeholder="Transaction Effect"
            />
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
        <Button size="sm" variant="secondary" onClick={onFormSubmit}>
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

export default AddTransactionTypes;
