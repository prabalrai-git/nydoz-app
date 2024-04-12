import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import CompanyBreadcrumb from "../../../shared/molecules/CompanyBreadcrumb";
import useFetch from "../../../../hooks/useFetch";
const AddTransaction = () => {
    const [paymentMethod, setPaymentMethod] = useState();
    const [financialAccount, setFinancialAccount] = useState();
    const [transactionType, setTransactionType] = useState();
    const [fileInfo, setFileInfo] = useState([]);
    const [customSelect, setCustomSelect] = useState({});
    const [paymentMethodForUpdate, setPaymentMethodForUpdate] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const { postData, updateData, errList, error } = useMutation(`${API_ROUTE.POST_TRANSACTION}/${searchParams.get("client_id")}/transactions`, true);
    const { data, fetchData } = useFetch(API_ROUTE.PAYMENT_METHODS, true);
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
    const defaultValues = {
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
    //   type TransactionResponse = TransactionPayload & {
    //     id: string;
    //   };
    const handleResetForm = useCallback(() => {
        const transactionDetails = location?.state?.data;
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
    const onSubmit = async (data) => {
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
                }
                else {
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
        }
        else {
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
            }
            catch (error) { }
        }
        else {
            data.custom_field_values.map((item) => {
                if (Object.keys(item).length > 1) {
                    for (let key in item) {
                        let value = item[key];
                        Object.assign(custom_field_values, { [key]: value });
                    }
                }
                else {
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
            }
            catch (error) { }
        }
    };
    const typeValues = watch(`custom_field_values`);
    // const formName = watch(`name`);
    //   const formRequired = watch(`is_account_required`);
    //   useEffect(() => {}, [formRequired]);
    return (_jsxs("div", { className: "card p-6 row", children: [_jsx(CompanyBreadcrumb, { title: location?.state?.data?.id ? "Update Transaction" : "Add Transaction", btnText: "Back", showBreadcrumb: true }), _jsx("div", { className: "col-12", children: _jsx("div", { className: "", children: _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "tw-flex tw-flex-col", children: [_jsxs("div", { className: " col-12 col-md-6 gap-5 gap-md-7 mb-6 tw-flex tw-flex-col", children: [_jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "form-label", children: "Financial Account:" }), _jsx(AsyncReactSelect, { placeholder: "Search..", baseUrl: API_ROUTE.FINANCIAL_ACCOUNT, setSelectValue: setFinancialAccount, selectValue: location?.state?.data
                                                    ? location?.state?.data.financial_account
                                                    : financialAccount, dataId: "id", showDataLabel: "institute_name" })] }), _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "form-label", children: "Payment Method:" }), _jsx(AsyncReactSelect, { placeholder: "Search..", baseUrl: API_ROUTE.PAYMENT_METHODS, setSelectValue: setPaymentMethod, selectValue: location?.state?.data
                                                    ? location?.state?.data.payment_method
                                                    : paymentMethod, 
                                                // selectValue={paymentMethod}
                                                dataId: "id", showDataLabel: "name" })] }), paymentMethod
                                        ? paymentMethod.custom_fields.map((item, index) => {
                                            if (item.type === "select") {
                                                let optionsArray = [];
                                                item.options.map((item) => {
                                                    let each = { label: item, value: item };
                                                    optionsArray.push(each);
                                                });
                                                return (_jsxs("div", { className: "mb-3", children: [_jsx("label", { className: "form-label", children: item.name }), _jsx(Select, { isSearchable: true, isClearable: true, className: "react-select-container", classNamePrefix: "react-select", options: optionsArray, onChange: (e) => setCustomSelect((prev) => ({
                                                                ...prev,
                                                                [item.name]: [e?.value],
                                                            })) })] }));
                                            }
                                            else if (item.type === "checkbox") {
                                                return (_jsxs(_Fragment, { children: [_jsx("label", { className: "form-label mx-3", children: item.name }), _jsx("div", { className: "tw-flex tw-gap-6", children: item.options.map((value) => {
                                                                return (_jsxs("div", { className: " tw-flex tw-items-center", children: [_jsx("label", { className: "form-label mx-3 tw-capitalize", children: value }), _jsx("input", { onChange: (e) => {
                                                                                setCustomSelect((prev) => {
                                                                                    const valuesArr = [
                                                                                        ...(prev[item.name] || []),
                                                                                    ]; // Ensure initial empty array
                                                                                    if (e.target.checked) {
                                                                                        if (!valuesArr.includes(value)) {
                                                                                            valuesArr.push(value);
                                                                                        }
                                                                                    }
                                                                                    else {
                                                                                        const index = valuesArr.indexOf(value);
                                                                                        if (index > -1) {
                                                                                            valuesArr.splice(index, 1);
                                                                                        }
                                                                                    }
                                                                                    return {
                                                                                        ...prev,
                                                                                        [item.name]: valuesArr,
                                                                                    };
                                                                                });
                                                                            }, className: "tw-mb-2 tw-w-[17px] tw-h-[17px] ", type: "checkbox" })] }, value));
                                                            }) })] }));
                                            }
                                            else if (item.type === "radio") {
                                                return (_jsxs(_Fragment, { children: [_jsx("label", { className: "form-label", children: item.name }), _jsx("div", { className: "tw-flex tw-gap-6", children: item.options.map((value) => {
                                                                return (_jsxs("div", { className: " tw-flex tw-items-center", children: [_jsx("label", { className: "form-label mx-3 tw-capitalize", children: value }), _jsx("input", { ...register(`custom_field_values.${index}.${item.name}`), className: "tw-mb-2 tw-w-[17px] tw-h-[17px] ", type: "radio", value: value })] }, value));
                                                            }) })] }));
                                            }
                                            return (_jsxs("div", { className: "mb-3", children: [_jsx("label", { className: "form-label", children: item.name }), _jsx("input", { ...register(`custom_field_values.${index}.${item.name}`), className: "form-control", type: item.type, placeholder: `Enter ${item.name}` })] }));
                                        })
                                        : paymentMethodForUpdate
                                            ? paymentMethodForUpdate.map((item, index) => {
                                                if (item.type === "select") {
                                                    let optionsArray = [];
                                                    item.options.map((item) => {
                                                        let each = { label: item, value: item };
                                                        optionsArray.push(each);
                                                    });
                                                    const defaultValue = optionsArray.filter((nextitem) => {
                                                        return nextitem.value === item.value[0];
                                                    });
                                                    return (_jsxs("div", { className: "mb-3", children: [_jsx("label", { className: "form-label", children: item.name }), _jsx(Select, { isSearchable: true, isClearable: true, defaultValue: defaultValue[0], className: "react-select-container", classNamePrefix: "react-select", options: optionsArray, onChange: (e) => setCustomSelect((prev) => ({
                                                                    ...prev,
                                                                    [item.name]: [e?.value],
                                                                })) })] }));
                                                }
                                                else if (item.type === "checkbox") {
                                                    return (_jsxs(_Fragment, { children: [_jsx("label", { className: "form-label mx-3", children: item.name }), _jsx("div", { className: "tw-flex tw-gap-6", children: item.options.map((value) => {
                                                                    let checked = false;
                                                                    if (item.value.includes(value)) {
                                                                        checked = true;
                                                                    }
                                                                    return (_jsxs("div", { className: " tw-flex tw-items-center", children: [_jsx("label", { className: "form-label mx-3 tw-capitalize", children: value }), _jsx("input", { onChange: (e) => {
                                                                                    setCustomSelect((prev) => {
                                                                                        const valuesArr = [
                                                                                            ...(prev[item.name] || []),
                                                                                        ]; // Ensure initial empty array
                                                                                        if (e.target.checked) {
                                                                                            if (!valuesArr.includes(value)) {
                                                                                                valuesArr.push(value);
                                                                                            }
                                                                                        }
                                                                                        else {
                                                                                            const index = valuesArr.indexOf(value);
                                                                                            if (index > -1) {
                                                                                                valuesArr.splice(index, 1);
                                                                                            }
                                                                                        }
                                                                                        return {
                                                                                            ...prev,
                                                                                            [item.name]: valuesArr,
                                                                                        };
                                                                                    });
                                                                                }, className: "tw-mb-2 tw-w-[17px] tw-h-[17px] ", type: "checkbox", checked: checked })] }, value));
                                                                }) })] }));
                                                }
                                                else if (item.type === "radio") {
                                                    return (_jsxs(_Fragment, { children: [_jsx("label", { className: "form-label", children: item.name }), _jsx("div", { className: "tw-flex tw-gap-6", children: item.options.map((value) => {
                                                                    let checked = false;
                                                                    if (item.value === value) {
                                                                        checked = true;
                                                                    }
                                                                    return (_jsxs("div", { className: " tw-flex tw-items-center", children: [_jsx("label", { className: "form-label mx-3 tw-capitalize", children: value }), _jsx("input", { ...register(`custom_field_values.${index}.${item.name}`), className: "tw-mb-2 tw-w-[17px] tw-h-[17px] ", type: "radio", value: value, checked: checked })] }, value));
                                                                }) })] }));
                                                }
                                                return (_jsxs("div", { className: "mb-3", children: [_jsx("label", { className: "form-label", children: item.name }), _jsx("input", { ...register(`custom_field_values.${index}.${item.name}`), className: "form-control", type: item.type, placeholder: `Enter ${item.name}`, value: item.value })] }));
                                            })
                                            : null, _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "form-label", children: "Transaction Type:" }), _jsx(AsyncReactSelect, { placeholder: "Search..", baseUrl: API_ROUTE.TRANSACTION_TYPE, setSelectValue: setTransactionType, 
                                                // selectValue={transactionType}
                                                selectValue: location?.state?.data
                                                    ? location?.state?.data.transaction_type
                                                    : transactionType, dataId: "id", showDataLabel: "name" })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { className: "form-label", children: "Bill Number" }), _jsx("input", { className: "form-control", ...register("bill_number"), placeholder: "Bill Number" })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { className: "form-label", children: "Physical Bill Number" }), _jsx("input", { className: "form-control", ...register("physical_bill_number"), placeholder: "Physical Bill Number" })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { className: "form-label", children: "Amount" }), _jsx("input", { type: "number", className: "form-control", ...register("amount"), placeholder: "Amount" })] }), _jsxs("div", { children: [_jsx("h1", { children: "Payment Receipt Files" }), _jsx("h1", { className: "tw-text-btnPrimary tw-mt-4 tw-font-semibold", children: location?.state?.data?.id
                                                    ? `${fileInfo?.length ? fileInfo?.length : 0} ${fileInfo?.length && fileInfo?.length > 1
                                                        ? "files chosen"
                                                        : "file chosen"}`
                                                    : `${fileInfo?.length ? fileInfo?.length : 0} ${fileInfo?.length && fileInfo?.length > 1
                                                        ? "files chosen"
                                                        : "file chosen"}` })] }), _jsx("div", { className: "-tw-mt-8", children: _jsx(UploadFile, { fileUploadType: FILE_UPLOAD_TYPE.ANY_FILE_UPLOAD, isMultiple: true, fileUploadLimit: DOCUMENT_UPLOAD_LIMIT, isUploadRequired: true, isRoutePrivate: true, setFileInfo: setFileInfo, fileInfo: fileInfo }) }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { className: "form-label", children: "Remarks" }), _jsx("input", { className: "form-control", ...register("remarks"), placeholder: "Remarks" })] })] }), _jsx("div", { className: "d-flex my-6 justify-content-end", children: _jsx("button", { className: "btn btn-primary btn-md ", type: "submit", children: location?.state?.data?.id ? "Update" : "Submit" }) })] }) }) })] }));
};
export default AddTransaction;
