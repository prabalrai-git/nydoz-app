import { useForm, useFieldArray } from "react-hook-form";
import {
  IDynamicForm,
  IFinancialAccountFields,
  ITransactionTypeFields,
} from "../../../../types/payload.type";
import API_ROUTE from "../../../../service/api";
import useMutation from "../../../../hooks/useMutation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useValidationError from "../../../../hooks/useValidationError";
import useHandleShowError from "../../../../hooks/useHandleShowError";
import AsyncSelect from "../../../shared/molecules/AsyncReactSelect";
import { useState } from "react";

const AddFinancialAccount = () => {
  const navigate = useNavigate();
  const { postData, errList, error } = useMutation(
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

  const { watch, handleSubmit, control, register, setError } = useForm({
    defaultValues: defaultValues,
  });

  useValidationError({ errList, setError });
  useHandleShowError(error);

  const onSubmit = async (data: IFinancialAccountFields) => {
    // console.log(data);

    // return console.log(
    //   { ...data, payment_method_ids: payementMethodIds },
    //   "payload"
    // );

    try {
      const response = await postData({
        ...data,
        payment_method_ids: payementMethodIds,
      });
      if (response?.status === 201) {
        toast.success("Financial Account Added Successfully");
        navigate(-1);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  // const formName = watch(`name`);

  return (
    <div className="card p-6 row">
      <div className="col-12 mb-6">
        <h3>Add Financial Accounts</h3>
      </div>
      <div className="col-12">
        <div className="">
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <div className="d-flex my-6 justify-content-end">
              <button className="btn btn-primary btn-sm" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFinancialAccount;
