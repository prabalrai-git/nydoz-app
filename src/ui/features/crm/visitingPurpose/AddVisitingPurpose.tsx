import { useEffect } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { informationChannelSchema } from "../../../../validations/crm.validators";
import {
  IVisitingPurposePayload,
  IVisitingPurposeResponse,
} from "../../../../types/products.types";

import API_ROUTE from "../../../../service/api";

import useMutation from "../../../../hooks/useMutation";

interface FormData {
  description: string;
}

interface IModalProps {
  show: boolean;
  handleClose: () => void;
  companyId: string;
  setFetchAgain: (value: boolean) => void;
  selectedData?: IVisitingPurposeResponse;
  setSelectedData?: (value: IVisitingPurposeResponse) => void;
}

const AddVisaType = (props: IModalProps) => {
  const { show, handleClose, setFetchAgain, selectedData } = props;
  const { postData, updateData, errList, error, isLoading } =
    useMutation<IVisitingPurposeResponse>(API_ROUTE.CM_VISITING_PURPOSES, true);

  const {
    register,
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(informationChannelSchema),
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
        description: selectedData.description,
      });
    } else {
      reset({
        description: "",
      });
    }
  }, [reset, selectedData]);

  useEffect(() => {
    if (errList?.description) {
      setError("description", {
        type: "manual",
        message: errList?.description[0],
      });
    }
  }, [errList, setError]);

  const onFormSubmit = handleSubmit(async (data: FormData) => {
    if (selectedData) {
      const response = await updateData(
        selectedData.id,
        data as IVisitingPurposePayload
      );
      if (response?.status === 200) {
        toast.success("Visiting Purpose updated successfully");
        reset({
          description: "",
        });
        setFetchAgain(true);
        handleClose();
      }
    } else {
      const response = await postData(data as IVisitingPurposePayload);
      if (response?.status === 201) {
        toast.success("Visiting Purpose Added successfully");
        reset({
          description: "",
        });
        setFetchAgain(true);
        handleClose();
      }
    }
  });

  const handleModalClose = () => {
    reset({
      description: "",
    });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} className="tw-mt-[10%]">
      <Modal.Header closeButton>
        <Modal.Title>
          <div className="text-gray-900  fs-2 fw-bold me-1">
            {selectedData ? "Update" : "Add"} Visiting Purpose
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={onFormSubmit}>
          <div className="row">
            <div className="col-12 gap-5 gap-md-7 ">
              <div className="fv-row flex-row-fluid fv-plugins-icon-container">
                <label className=" form-label">Description:</label>
                <textarea
                  rows={5}
                  cols={5}
                  className="form-control"
                  placeholder="Enter description"
                  {...register("description")}
                />
                <p className="text-danger mt-1">
                  {errors.description?.message}
                </p>
              </div>
            </div>
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
          className="fw-bold hover:tw-bg-btnPrimaryHover"
          onClick={onFormSubmit}
          type="submit"
        >
          {isLoading ? (
            <>
              <span className="ms-2">Adding...</span>
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

export default AddVisaType;
