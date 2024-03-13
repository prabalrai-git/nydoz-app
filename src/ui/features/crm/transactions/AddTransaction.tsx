import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { ICustomFields } from "../../../../types/payload.type";
import API_ROUTE from "../../../../service/api";
import useMutation from "../../../../hooks/useMutation";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import useValidationError from "../../../../hooks/useValidationError";
import useHandleShowError from "../../../../hooks/useHandleShowError";
import AsyncReactSelect from "../../../shared/molecules/AsyncReactSelect";
import UploadFile from "../../../shared/components/Upload";
import FILE_UPLOAD_TYPE from "../../../../constants/FileUpload";
import { DOCUMENT_UPLOAD_LIMIT } from "../../../../constants/AppSetting";

const AddTransaction = () => {
  const [paymentMethodId, setPaymentMethodId] = useState();
  const [financialAccountId, setFinancialAccountId] = useState();
  const [transactionTypeId, setTransactionTypeId] = useState();
  const [fileInfo, setFileInfo] = useState<string[] | undefined>();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { postData, errList, error } = useMutation(
    `${API_ROUTE.POST_TRANSACTION}/${searchParams.get(
      "client_id"
    )}/transactions`,
    true
  );

  //   console.log(searchParams.get("client_id"));
  type TransactionPayload = {
    payment_method_id: string;
    financial_account_id: string;
    bill_number: string;
    physical_bill_number: string;
    amount: number;
    payment_receipt_files: string[];
    remarks: string;
    transaction_type_id: string;
    custom_field_values: ICustomFields[];
  };

  //   type TransactionResponse = TransactionPayload & {
  //     id: string;
  //   };

  const defaultValues: TransactionPayload = {
    payment_method_id: "",
    financial_account_id: "",
    bill_number: "",
    physical_bill_number: "",
    amount: 0,
    payment_receipt_files: [""],
    remarks: "",
    transaction_type_id: "",
    custom_field_values: [
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

  const { watch, handleSubmit, control, register, setError } = useForm({
    defaultValues: defaultValues,
  });

  useValidationError({ errList, setError });
  useHandleShowError(error);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "custom_field_values",
  });

  const onSubmit = async (data: TransactionPayload) => {
    // return console.log({ ...data, finacial_account_id: financialAccountId });
    const payload = data.custom_field_values.map((field) => {
      const optionArry = field.options.split(",");

      return {
        name: field.name,
        type: field.type,
        options: optionArry,
        is_required: field.is_required,
        multiple_value: field.multiple_value,
      };
    });

    const finalData = {
      payment_method_id: paymentMethodId?.id,
      financial_account_id: financialAccountId?.id,
      bill_number: data.bill_number,
      physical_bill_number: data.physical_bill_number,
      amount: data.amount,
      payment_receipt_files: fileInfo,
      remarks: data.remarks,
      transaction_type_id: transactionTypeId?.id,
    };

    // return console.log(finalData, "hello");
    try {
      const response = await postData({
        ...finalData,
        custom_fields: payload,
      });
      if (response?.status === 201) {
        toast.success("Transactions Added Successfully");
        navigate(-1);
      }
    } catch (error) {}
  };

  const typeValues = watch(`custom_field_values`);
  // const formName = watch(`name`);
  //   const formRequired = watch(`is_account_required`);

  //   useEffect(() => {}, [formRequired]);

  return (
    <div className="card p-6 row">
      <div className="col-12 mb-6">
        <h3>Add Transaction</h3>
      </div>
      <div className="col-12">
        <div className="">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="tw-flex tw-flex-col"
          >
            {/* <div className="mb-3">
              <label className="form-label">Payment Method</label>
              <input
                className="form-control"
                {...register("paymentMethod")}
                placeholder="Name"
              />
            </div> */}
            <div className=" col-12 col-md-6 gap-5 gap-md-7 mb-6 tw-flex tw-flex-col">
              <div className="fv-row flex-row-fluid fv-plugins-icon-container">
                <label className="form-label">Payment Method:</label>

                <AsyncReactSelect
                  placeholder="Search.."
                  baseUrl={API_ROUTE.PAYMENT_METHODS}
                  setSelectValue={setPaymentMethodId}
                  selectValue={paymentMethodId}
                  dataId={"id" as never}
                  showDataLabel={"name" as never}
                />
              </div>
              <div className="fv-row flex-row-fluid fv-plugins-icon-container">
                <label className="form-label">Financial Account:</label>

                <AsyncReactSelect
                  placeholder="Search.."
                  baseUrl={API_ROUTE.FINANCIAL_ACCOUNT}
                  setSelectValue={setFinancialAccountId}
                  selectValue={financialAccountId}
                  dataId={"id" as never}
                  showDataLabel={"institute_name" as never}
                />
              </div>
              <div className="fv-row flex-row-fluid fv-plugins-icon-container">
                <label className="form-label">Transaction Type:</label>

                <AsyncReactSelect
                  placeholder="Search.."
                  baseUrl={API_ROUTE.TRANSACTION_TYPE}
                  setSelectValue={setTransactionTypeId}
                  selectValue={transactionTypeId}
                  dataId={"id" as never}
                  showDataLabel={"name" as never}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Bill Number</label>
                <input
                  className="form-control"
                  {...register("bill_number")}
                  placeholder="Bill Number"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Physical Bill Number</label>
                <input
                  className="form-control"
                  {...register("physical_bill_number")}
                  placeholder="Physical Bill Number"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Amount</label>
                <input
                  type="number"
                  className="form-control"
                  {...register("amount")}
                  placeholder="Amount"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Remarks</label>
                <input
                  className="form-control"
                  {...register("remarks")}
                  placeholder="Remarks"
                />
              </div>
              <UploadFile
                fileUploadType={FILE_UPLOAD_TYPE.ANY_FILE_UPLOAD}
                isMultiple={true}
                fileUploadLimit={DOCUMENT_UPLOAD_LIMIT}
                isUploadRequired={true}
                isRoutePrivate={true}
                setFileInfo={setFileInfo}
                fileInfo={fileInfo}
                title="Upload Payment Receipt Files"
              />
            </div>

            <div>
              {fields.map((field, index) => {
                const indexValue = index;
                return (
                  <div className="my-6 shadow shadow-sm p-6" key={field.id}>
                    <h5 className="text-info my-3">SN : {index + 1}</h5>
                    <div className="mb-3">
                      <label className="form-label">Input Field Name</label>
                      <input
                        type="text"
                        {...register(`custom_field_values.${indexValue}.name`)}
                        placeholder="Enter the Field Name"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-6">
                      <label className="form-label">Input Type</label>
                      <select
                        {...register(`custom_field_values.${indexValue}.type`)}
                        className="form-select"
                      >
                        <option value="text">Text</option>
                        <option value="select">Select</option>
                        <option value="checkbox">Checkbox</option>
                        <option value="radio">Radio</option>
                        <option value="textarea">Textarea</option>
                      </select>
                    </div>

                    {forMultipleValues.includes(typeValues[index].type) && (
                      <input
                        type="text"
                        {...register(`custom_field_values.${index}.options`)}
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
                          className="form-check-input"
                          type="checkbox"
                          {...register(
                            `custom_field_values.${indexValue}.is_required`
                          )}
                        />
                      </div>
                      <button
                        className="btn btn-light-danger btn-sm "
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
                  className="btn btn-primary btn-sm btn-info"
                  onClick={() =>
                    append({
                      name: "",
                      type: "text",
                      options: "",
                      is_required: true,
                      multiple_value: true,
                    })
                  }
                >
                  Add More Custom Field
                </button>
              </div>
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

export default AddTransaction;
