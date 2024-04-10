import { useCallback, useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  DynamicFormPayload,
  financialAccoutnResponse,
  transactionType,
} from "../../../../types/payload.type";
import API_ROUTE from "../../../../service/api";
import useMutation from "../../../../hooks/useMutation";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import useValidationError from "../../../../hooks/useValidationError";
import useHandleShowError from "../../../../hooks/useHandleShowError";
import AsyncReactSelect from "../../../shared/molecules/AsyncReactSelect";
import UploadFile from "../../../shared/components/Upload";
import FILE_UPLOAD_TYPE from "../../../../constants/FileUpload";
import { DOCUMENT_UPLOAD_LIMIT } from "../../../../constants/AppSetting";
import Select from "react-select";
import { ISelectProps } from "../../../../types/react-select.type";
import CompanyBreadcrumb from "../../../shared/molecules/CompanyBreadcrumb";
import { ITransactionResponse } from "../../../../types/products.types";
import useFetch from "../../../../hooks/useFetch";

type DynamicFormResponse = DynamicFormPayload & {
  id: string;
};

const AddTransaction = () => {
  const [paymentMethod, setPaymentMethod] = useState<
    DynamicFormResponse | undefined
  >();
  const [financialAccount, setFinancialAccount] = useState<
    financialAccoutnResponse | undefined
  >();
  const [transactionType, setTransactionType] = useState<
    transactionType | undefined
  >();
  const [fileInfo, setFileInfo] = useState<string[] | undefined>([]);

  const [customSelect, setCustomSelect] = useState({});
  const [paymentMethodForUpdate, setPaymentMethodForUpdate] = useState<
    DynamicFormPayload | undefined
  >();

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { postData, updateData, errList, error } = useMutation(
    `${API_ROUTE.POST_TRANSACTION}/${searchParams.get(
      "client_id"
    )}/transactions`,
    true
  );
  const { data, fetchData } = useFetch<transactionType[]>(
    API_ROUTE.PAYMENT_METHODS,
    true
  );

  useEffect(() => {
    if (location?.state?.data?.payment_method_id) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (data) {
      const paymentMethod = data.filter((item) => {
        return item.id === location?.state?.data?.payment_method_id;
      });

      const first = paymentMethod[0];
      const customValues = location?.state?.data.custom_field_values;
      let paymentMethodWithValue = first.custom_fields.map((item) => {
        for (let x in customValues) {
          if (item.name === x) {
            return { value: customValues[x], ...item };
          }
          // return;
        }
      });

      setPaymentMethodForUpdate(paymentMethodWithValue);
    }
  }, [data]);

  const defaultValues: TransactionPayload = {
    payment_method_id: "",
    financial_account_id: "",
    bill_number: "",
    physical_bill_number: "",
    amount: 0,
    payment_receipt_files: [""],
    remarks: "",
    transaction_type_id: "",
    custom_field_values: [],
  };

  const { watch, handleSubmit, control, register, setError, reset } = useForm({
    defaultValues: defaultValues,
  });
  type TransactionPayload = {
    payment_method_id: string;
    financial_account_id: string;
    bill_number: string;
    physical_bill_number: string;
    amount: number;
    payment_receipt_files: string[];
    remarks: string;
    transaction_type_id: string;
    custom_field_values: Record<string, string>[];
  };

  //   type TransactionResponse = TransactionPayload & {
  //     id: string;
  //   };

  const handleResetForm = useCallback(() => {
    const transactionDetails: ITransactionResponse = location?.state?.data;

    // const { logo, country, ...rest } = companyDetails;

    setFileInfo(location?.state?.data?.payment_receipt_files);
    // setPaymentMethod(location?.state?.data.payment_method);

    reset(transactionDetails);
  }, [location?.state?.data, reset]);

  useEffect(() => {
    if (location?.state?.data && location?.state?.data?.id) {
      handleResetForm();
    }
  }, [handleResetForm, location?.state, reset]);

  useValidationError({ errList, setError });
  useHandleShowError(error);

  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: "custom_field_values",
  // });

  const onSubmit = async (data: TransactionPayload) => {
    let custom_field_values = {};

    let final_custom_field_values;

    console.log(data.custom_field_values);
    console.log(Array.isArray(data.custom_field_values));
    if (Array.isArray(data.custom_field_values)) {
      data.custom_field_values.map((item) => {
        if (Object.keys(item).length > 1) {
          for (let key in item) {
            let value = item[key];

            Object.assign(custom_field_values, { [key]: value });
          }
        } else {
          let key = Object.keys(item)[0];
          let value = Object.values(item)[0];
          return Object.assign(custom_field_values, {
            [key]: value,
          });
        }
      });

      final_custom_field_values = {
        ...custom_field_values,
        ...customSelect,
      };
    } else {
    }

    if (location?.state?.data?.id) {
      const finalData = {
        payment_method_id: paymentMethod?.id
          ? paymentMethod?.id
          : data?.payment_method_id,
        financial_account_id: financialAccount?.id
          ? financialAccount?.id
          : data?.financial_account_id,
        bill_number: data.bill_number,
        physical_bill_number: data.physical_bill_number,
        amount: data.amount,
        payment_receipt_files: fileInfo,
        remarks: data.remarks,
        transaction_type_id: transactionType?.id
          ? transactionType?.id
          : data?.transaction_type_id,
        custom_field_values: final_custom_field_values,
      };

      return console.log(finalData, "this is update data");

      try {
        const response = await postData(finalData);
        if (response?.status === 201) {
          toast.success("Transactions Added Successfully");
          navigate(-1);
        }
      } catch (error) {}
    } else {
      data.custom_field_values.map((item) => {
        if (Object.keys(item).length > 1) {
          for (let key in item) {
            let value = item[key];

            Object.assign(custom_field_values, { [key]: value });
          }
        } else {
          let key = Object.keys(item)[0];
          let value = Object.values(item)[0];
          return Object.assign(custom_field_values, {
            [key]: value,
          });
        }
      });

      let final_custom_field_values = {
        ...custom_field_values,
        ...customSelect,
      };

      const finalData = {
        payment_method_id: paymentMethod?.id,
        financial_account_id: financialAccount?.id,
        bill_number: data.bill_number,
        physical_bill_number: data.physical_bill_number,
        amount: data.amount,
        payment_receipt_files: fileInfo,
        remarks: data.remarks,
        transaction_type_id: transactionType?.id,
        custom_field_values: final_custom_field_values,
      };

      try {
        const response = await postData(finalData);
        if (response?.status === 201) {
          toast.success("Transactions Added Successfully");
          navigate(-1);
        }
      } catch (error) {}
    }
  };

  const typeValues = watch(`custom_field_values`);

  // const formName = watch(`name`);
  //   const formRequired = watch(`is_account_required`);

  //   useEffect(() => {}, [formRequired]);

  return (
    <div className="card p-6 row">
      <CompanyBreadcrumb
        title={
          location?.state?.data?.id ? "Update Transaction" : "Add Transaction"
        }
        btnText="Back"
        showBreadcrumb={true}
      />

      <div className="col-12">
        <div className="">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="tw-flex tw-flex-col"
          >
            <div className=" col-12 col-md-6 gap-5 gap-md-7 mb-6 tw-flex tw-flex-col">
              <div className="fv-row flex-row-fluid fv-plugins-icon-container">
                <label className="form-label">Financial Account:</label>

                <AsyncReactSelect
                  placeholder="Search.."
                  baseUrl={API_ROUTE.FINANCIAL_ACCOUNT}
                  setSelectValue={setFinancialAccount}
                  selectValue={
                    location?.state?.data
                      ? location?.state?.data.financial_account
                      : financialAccount
                  }
                  dataId={"id" as never}
                  showDataLabel={"institute_name" as never}
                />
              </div>
              <div className="fv-row flex-row-fluid fv-plugins-icon-container">
                <label className="form-label">Payment Method:</label>

                <AsyncReactSelect
                  placeholder="Search.."
                  baseUrl={API_ROUTE.PAYMENT_METHODS}
                  setSelectValue={setPaymentMethod}
                  selectValue={
                    location?.state?.data
                      ? location?.state?.data.payment_method
                      : paymentMethod
                  }
                  // selectValue={paymentMethod}
                  dataId={"id" as never}
                  showDataLabel={"name" as never}
                />
              </div>

              {paymentMethod
                ? paymentMethod.custom_fields.map((item, index) => {
                    if (item.type === "select") {
                      let optionsArray: ISelectProps[] = [];
                      (item.options as unknown as string[]).map(
                        (item: string) => {
                          let each = { label: item, value: item };

                          optionsArray.push(each);
                        }
                      );

                      return (
                        <div className="mb-3">
                          <label className="form-label">{item.name}</label>
                          <Select
                            isSearchable
                            isClearable
                            className="react-select-container"
                            classNamePrefix="react-select"
                            options={optionsArray}
                            onChange={(e) =>
                              setCustomSelect((prev) => ({
                                ...prev,
                                [item.name]: [e?.value],
                              }))
                            }
                          />
                        </div>
                      );
                    } else if (item.type === "checkbox") {
                      return (
                        <>
                          <label className="form-label mx-3">{item.name}</label>
                          <div className="tw-flex tw-gap-6">
                            {(item.options as unknown as string[]).map(
                              (value: string) => {
                                return (
                                  <div
                                    className=" tw-flex tw-items-center"
                                    key={value}
                                  >
                                    <label className="form-label mx-3 tw-capitalize">
                                      {value}
                                    </label>

                                    <input
                                      onChange={(e) => {
                                        setCustomSelect((prev) => {
                                          const valuesArr = [
                                            ...(prev[item.name] || []),
                                          ]; // Ensure initial empty array
                                          if (e.target.checked) {
                                            if (!valuesArr.includes(value)) {
                                              valuesArr.push(value);
                                            }
                                          } else {
                                            const index =
                                              valuesArr.indexOf(value);
                                            if (index > -1) {
                                              valuesArr.splice(index, 1);
                                            }
                                          }

                                          return {
                                            ...prev,
                                            [item.name]: valuesArr,
                                          };
                                        });
                                      }}
                                      className="tw-mb-2 tw-w-[17px] tw-h-[17px] "
                                      type="checkbox"
                                      // checked={true}
                                    />
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </>
                      );
                    } else if (item.type === "radio") {
                      return (
                        <>
                          <label className="form-label">{item.name}</label>
                          <div className="tw-flex tw-gap-6">
                            {(item.options as unknown as string[]).map(
                              (value: string) => {
                                return (
                                  <div
                                    className=" tw-flex tw-items-center"
                                    key={value}
                                  >
                                    <label className="form-label mx-3 tw-capitalize">
                                      {value}
                                    </label>

                                    <input
                                      {...register(
                                        `custom_field_values.${index}.${item.name}`
                                      )}
                                      className="tw-mb-2 tw-w-[17px] tw-h-[17px] "
                                      type="radio"
                                      value={value}
                                    />
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </>
                      );
                    }
                    return (
                      <div className="mb-3">
                        <label className="form-label">{item.name}</label>
                        <input
                          {...register(
                            `custom_field_values.${index}.${item.name}`
                          )}
                          className="form-control"
                          type={item.type}
                          placeholder={`Enter ${item.name}`}
                          // value={"red"}
                        />
                      </div>
                    );
                  })
                : paymentMethodForUpdate
                ? paymentMethodForUpdate.map((item, index) => {
                    if (item.type === "select") {
                      let optionsArray: ISelectProps[] = [];
                      (item.options as unknown as string[]).map(
                        (item: string) => {
                          let each = { label: item, value: item };

                          optionsArray.push(each);
                        }
                      );
                      const defaultValue = optionsArray.filter((nextitem) => {
                        return nextitem.value === item.value[0];
                      });

                      return (
                        <div className="mb-3">
                          <label className="form-label">{item.name}</label>
                          <Select
                            isSearchable
                            isClearable
                            defaultValue={defaultValue[0]}
                            className="react-select-container"
                            classNamePrefix="react-select"
                            options={optionsArray}
                            onChange={(e) =>
                              setCustomSelect((prev) => ({
                                ...prev,
                                [item.name]: [e?.value],
                              }))
                            }
                          />
                        </div>
                      );
                    } else if (item.type === "checkbox") {
                      return (
                        <>
                          <label className="form-label mx-3">{item.name}</label>
                          <div className="tw-flex tw-gap-6">
                            {(item.options as unknown as string[]).map(
                              (value: string) => {
                                let checked = false;
                                if (item.value.includes(value)) {
                                  checked = true;
                                }

                                return (
                                  <div
                                    className=" tw-flex tw-items-center"
                                    key={value}
                                  >
                                    <label className="form-label mx-3 tw-capitalize">
                                      {value}
                                    </label>

                                    <input
                                      onChange={(e) => {
                                        setCustomSelect((prev) => {
                                          const valuesArr = [
                                            ...(prev[item.name] || []),
                                          ]; // Ensure initial empty array
                                          if (e.target.checked) {
                                            if (!valuesArr.includes(value)) {
                                              valuesArr.push(value);
                                            }
                                          } else {
                                            const index =
                                              valuesArr.indexOf(value);
                                            if (index > -1) {
                                              valuesArr.splice(index, 1);
                                            }
                                          }

                                          return {
                                            ...prev,
                                            [item.name]: valuesArr,
                                          };
                                        });
                                      }}
                                      className="tw-mb-2 tw-w-[17px] tw-h-[17px] "
                                      type="checkbox"
                                      checked={checked}
                                    />
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </>
                      );
                    } else if (item.type === "radio") {
                      return (
                        <>
                          <label className="form-label">{item.name}</label>
                          <div className="tw-flex tw-gap-6">
                            {(item.options as unknown as string[]).map(
                              (value: string) => {
                                let checked = false;
                                if (item.value === value) {
                                  checked = true;
                                }

                                return (
                                  <div
                                    className=" tw-flex tw-items-center"
                                    key={value}
                                  >
                                    <label className="form-label mx-3 tw-capitalize">
                                      {value}
                                    </label>

                                    <input
                                      {...register(
                                        `custom_field_values.${index}.${item.name}`
                                      )}
                                      className="tw-mb-2 tw-w-[17px] tw-h-[17px] "
                                      type="radio"
                                      value={value}
                                      checked={checked}
                                    />
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </>
                      );
                    }
                    return (
                      <div className="mb-3">
                        <label className="form-label">{item.name}</label>
                        <input
                          {...register(
                            `custom_field_values.${index}.${item.name}`
                          )}
                          className="form-control"
                          type={item.type}
                          placeholder={`Enter ${item.name}`}
                          value={item.value}
                        />
                      </div>
                    );
                  })
                : null}

              <div className="fv-row flex-row-fluid fv-plugins-icon-container">
                <label className="form-label">Transaction Type:</label>

                <AsyncReactSelect
                  placeholder="Search.."
                  baseUrl={API_ROUTE.TRANSACTION_TYPE}
                  setSelectValue={setTransactionType}
                  // selectValue={transactionType}
                  selectValue={
                    location?.state?.data
                      ? location?.state?.data.transaction_type
                      : transactionType
                  }
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
              <div>
                <h1>Payment Receipt Files</h1>
                <h1 className="tw-text-btnPrimary tw-mt-4 tw-font-semibold">
                  {location?.state?.data?.id
                    ? `${fileInfo?.length ? fileInfo?.length : 0} ${
                        fileInfo?.length && fileInfo?.length > 1
                          ? "files chosen"
                          : "file chosen"
                      }`
                    : `${fileInfo?.length ? fileInfo?.length : 0} ${
                        fileInfo?.length && fileInfo?.length > 1
                          ? "files chosen"
                          : "file chosen"
                      }`}
                </h1>
              </div>
              <div className="-tw-mt-8">
                <UploadFile
                  fileUploadType={FILE_UPLOAD_TYPE.ANY_FILE_UPLOAD}
                  isMultiple={true}
                  fileUploadLimit={DOCUMENT_UPLOAD_LIMIT}
                  isUploadRequired={true}
                  isRoutePrivate={true}
                  setFileInfo={setFileInfo}
                  fileInfo={fileInfo}
                  // title="Upload Payment Receipt Files"
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
            </div>

            {/* <pre>{JSON.stringify(typeValues, null, 2)}</pre> */}
            <div className="d-flex my-6 justify-content-end">
              <button className="btn btn-primary btn-md " type="submit">
                {location?.state?.data?.id ? "Update" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;
