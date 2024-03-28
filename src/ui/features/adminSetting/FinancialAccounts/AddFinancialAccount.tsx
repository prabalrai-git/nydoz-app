import { useForm } from "react-hook-form";
import {
  IDynamicForm,
  IFinancialAccountFields,
} from "../../../../types/payload.type";
import API_ROUTE from "../../../../service/api";
import useMutation from "../../../../hooks/useMutation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AsyncSelect from "../../../shared/molecules/AsyncReactSelect";
import { useEffect, useState } from "react";
import { IFinancialAccountReponse } from "./FinancialAccountsList";
import { Button, Modal, Spinner } from "react-bootstrap";

interface IModalProps {
  show: boolean;
  handleClose: () => void;
  companyId: string;
  setFetchAgain: (value: boolean) => void;
  selectedData?: IFinancialAccountReponse;
  setSelectedData?: (value: IFinancialAccountReponse) => void;
}

const AddFinancialAccount = (props: IModalProps) => {
  const navigate = useNavigate();
  const { show, handleClose, setFetchAgain, selectedData } = props;
  const { postData, errList, error, updateData, isLoading } = useMutation(
    API_ROUTE.POST_FINANCIAL_ACCOUNT,
    true
  );

  const [paymentMethods, setPaymentMethods] = useState<
    IDynamicForm | undefined
  >(undefined);

  const [payementMethodIds, setPaymentMethodIds] = useState<
    string[] | undefined
  >();

  const defaultValues: IFinancialAccountFields = {
    institute_name: "",
    institute_site: "",
    account_name: "",
    account_number: "",
    swift_code: "",
    branch_name: "",
    branch_address: "",
    payment_method_ids: [],
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
        //
        institute_name: selectedData.institute_name,
        institute_site: selectedData.institute_site,
        account_name: selectedData.account_name,
        account_number: selectedData.account_number,
        swift_code: selectedData.swift_code,
        branch_name: selectedData.branch_name,
        branch_address: selectedData.branch_address,
        payment_method_ids: selectedData.payment_method_ids,
      });
    } else {
      reset({
        institute_name: "",
        institute_site: "",
        account_name: "",
        account_number: "",
        swift_code: "",
        branch_name: "",
        branch_address: "",
        payment_method_ids: [],
      });
    }
  }, [reset, selectedData]);

  useEffect(() => {
    if (errList) {
      Object.keys(errList).forEach((field) => {
        const fieldName = field as keyof IFinancialAccountFields;
        if (errList?.[fieldName]) {
          errors[fieldName] = {
            type: "manual",
            message: errList[fieldName][0], // Assuming you want to use only the first error message
          };
        }
      });
    }
  }, [errList, setError]);

  // const onSubmit = async (data: IFinancialAccountFields) => {
  //   try {
  //     const response = await postData({
  //       ...data,
  //       payment_method_ids: payementMethodIds,
  //     });
  //     if (response?.status === 201) {
  //       toast.success("Financial Account Added Successfully");
  //       navigate(-1);
  //     }
  //   } catch (error) {}
  // };

  const onFormSubmit = handleSubmit(async (data: IFinancialAccountFields) => {
    if (selectedData) {
      const response = await updateData(
        selectedData.id,
        data as IFinancialAccountFields
      );
      if (response?.status === 200) {
        toast.success("Financial Account updated successfully");
        reset({
          institute_name: "",
          institute_site: "",
          account_name: "",
          account_number: "",
          swift_code: "",
          branch_name: "",
          branch_address: "",
          payment_method_ids: [],
        });
        setFetchAgain(true);
        handleClose();
      }
    } else {
      const response = await postData({
        ...data,
        payment_method_ids: payementMethodIds,
      } as IFinancialAccountFields);
      if (response?.status === 201) {
        toast.success("Financial Account Added successfully");
        reset({
          institute_name: "",
          institute_site: "",
          account_name: "",
          account_number: "",
          swift_code: "",
          branch_name: "",
          branch_address: "",
          payment_method_ids: [],
        });
        setFetchAgain(true);
        handleClose();
      }
    }
  });

  const handleModalClose = () => {
    reset({
      institute_name: "",
      institute_site: "",
      account_name: "",
      account_number: "",
      swift_code: "",
      branch_name: "",
      branch_address: "",
      payment_method_ids: [],
    });
    handleClose();
  };

  // const formName = watch(`name`);

  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <div className="text-gray-900  fs-2 fw-bold me-1">
            {selectedData ? "Update" : "Add"} Financial Account
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="">
        <form onSubmit={onFormSubmit}>
          <div className="mb-3">
            <label className="form-label">Institute Name</label>
            <input
              className="form-control"
              {...register("institute_name")}
              placeholder="Name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Institute Site</label>
            <input
              className="form-control"
              {...register("institute_site")}
              placeholder="Description"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Account Name</label>
            <input
              className="form-control"
              {...register("account_name")}
              placeholder="Account Name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Account Number</label>
            <input
              className="form-control"
              {...register("account_number")}
              placeholder="Account Number"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Swift Code</label>
            <input
              className="form-control"
              {...register("swift_code")}
              placeholder="Swift Code"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Branch Name</label>
            <input
              className="form-control"
              {...register("branch_name")}
              placeholder="Branch Name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Branch Address</label>
            <input
              className="form-control"
              {...register("branch_address")}
              placeholder="Branch Address"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Payment Methods</label>
            {/* <input
                className="form-control"
                {...register("payment_method_ids")}
                placeholder="Payment Methods"
              /> */}
            <AsyncSelect
              placeholder="Search for payment methods."
              baseUrl={API_ROUTE.PAYMENT_METHODS}
              setSelectValue={setPaymentMethods}
              selectValue={paymentMethods}
              dataId="id"
              showDataLabel="name"
              setMultipleValues={setPaymentMethodIds}
              isMulti={true}
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

export default AddFinancialAccount;
