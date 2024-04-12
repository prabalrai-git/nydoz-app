import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import API_ROUTE from "../../../../service/api";
import useMutation from "../../../../hooks/useMutation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AsyncSelect from "../../../shared/molecules/AsyncReactSelect";
import { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
const AddFinancialAccount = (props) => {
    const navigate = useNavigate();
    const { show, handleClose, setFetchAgain, selectedData } = props;
    const { postData, errList, error, updateData, isLoading } = useMutation(API_ROUTE.POST_FINANCIAL_ACCOUNT, true);
    const [paymentMethods, setPaymentMethods] = useState(undefined);
    const [payementMethodIds, setPaymentMethodIds] = useState();
    const defaultValues = {
        institute_name: "",
        institute_site: "",
        account_name: "",
        account_number: "",
        swift_code: "",
        branch_name: "",
        branch_address: "",
        payment_method_ids: [],
    };
    const { watch, handleSubmit, control, register, setError, reset, formState: { errors }, } = useForm({
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
        }
        else {
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
                const fieldName = field;
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
    const onFormSubmit = handleSubmit(async (data) => {
        if (selectedData) {
            const response = await updateData(selectedData.id, data);
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
        }
        else {
            const response = await postData({
                ...data,
                payment_method_ids: payementMethodIds,
            });
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
    return (_jsxs(Modal, { size: "lg", show: show, onHide: handleClose, children: [_jsx(Modal.Header, { closeButton: true, children: _jsx(Modal.Title, { children: _jsxs("div", { className: "text-gray-900  fs-2 fw-bold me-1", children: [selectedData ? "Update" : "Add", " Financial Account"] }) }) }), _jsx(Modal.Body, { className: "", children: _jsxs("form", { onSubmit: onFormSubmit, children: [_jsxs("div", { className: "mb-3", children: [_jsx("label", { className: "form-label", children: "Institute Name" }), _jsx("input", { className: "form-control", ...register("institute_name"), placeholder: "Name" })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { className: "form-label", children: "Institute Site" }), _jsx("input", { className: "form-control", ...register("institute_site"), placeholder: "Description" })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { className: "form-label", children: "Account Name" }), _jsx("input", { className: "form-control", ...register("account_name"), placeholder: "Account Name" })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { className: "form-label", children: "Account Number" }), _jsx("input", { className: "form-control", ...register("account_number"), placeholder: "Account Number" })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { className: "form-label", children: "Swift Code" }), _jsx("input", { className: "form-control", ...register("swift_code"), placeholder: "Swift Code" })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { className: "form-label", children: "Branch Name" }), _jsx("input", { className: "form-control", ...register("branch_name"), placeholder: "Branch Name" })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { className: "form-label", children: "Branch Address" }), _jsx("input", { className: "form-control", ...register("branch_address"), placeholder: "Branch Address" })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { className: "form-label", children: "Payment Methods" }), _jsx(AsyncSelect, { placeholder: "Search for payment methods.", baseUrl: API_ROUTE.PAYMENT_METHODS, setSelectValue: setPaymentMethods, selectValue: paymentMethods, dataId: "id", showDataLabel: "name", setMultipleValues: setPaymentMethodIds, isMulti: true })] })] }) }), _jsxs(Modal.Footer, { children: [_jsx(Button, { size: "sm", variant: "secondary", onClick: handleModalClose, children: "Cancel" }), _jsx(Button, { size: "sm", variant: "primary", className: "fw-bold", onClick: onFormSubmit, type: "submit", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "ms-2", children: "uploading..." }), _jsx(Spinner, { size: "sm", animation: "border", role: "status" })] })) : (_jsx("span", { className: "mx-3", children: selectedData ? "Update" : "Add" })) })] })] }));
};
export default AddFinancialAccount;
