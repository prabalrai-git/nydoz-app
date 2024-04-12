import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import API_ROUTE from "../../../../service/api";
import useMutation from "../../../../hooks/useMutation";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
const AddTransactionTypes = (props) => {
    const { show, handleClose, setFetchAgain, selectedData } = props;
    const { postData, updateData, errList, error, isLoading } = useMutation(API_ROUTE.POST_TRANSACTION_TYPE, true);
    const defaultValues = {
        name: "",
        description: "",
        transaction_effect: "",
    };
    const { handleSubmit, register, setError, reset, formState: { errors }, } = useForm({
        defaultValues: defaultValues,
    });
    useEffect(() => {
        if (selectedData) {
            reset({
                name: selectedData.name,
                description: selectedData.description,
                transaction_effect: selectedData.transaction_effect,
            });
        }
        else {
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
    // useValidationError({ errList, setError });
    // useHandleShowError(error);
    const onFormSubmit = handleSubmit(async (data) => {
        if (selectedData) {
            const response = await updateData(selectedData.id, data);
            if (response?.status === 200) {
                toast.success("Trascation type updated successfully");
                reset({
                    name: "",
                    description: "",
                    transaction_effect: "",
                });
                setFetchAgain(true);
                handleClose();
            }
        }
        else {
            // return console.log(data, "hello world");
            const response = await postData(data);
            if (response?.status === 201) {
                toast.success("Transaction type added successfully");
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
    const handleModalClose = () => {
        reset({
            name: "",
            description: "",
            transaction_effect: "",
        });
        handleClose();
    };
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
    return (_jsxs(Modal, { size: "lg", show: show, onHide: handleClose, children: [_jsx(Modal.Header, { closeButton: true, children: _jsx(Modal.Title, { children: _jsxs("div", { className: "text-gray-900  fs-2 fw-bold me-1", children: [selectedData ? "Update" : "Add", " Transaction Type"] }) }) }), _jsx(Modal.Body, { className: "", children: _jsxs("form", { children: [_jsxs("div", { className: "mb-3", children: [_jsx("label", { className: "form-label", children: "Name" }), _jsx("input", { className: "form-control", ...register("name"), placeholder: "Name" })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { className: "form-label", children: "Description" }), _jsx("input", { className: "form-control", ...register("description"), placeholder: "Description" })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { className: "form-label", children: "Transaction Effect" }), _jsxs("select", { ...register("transaction_effect"), className: "form-select", children: [_jsx("option", { value: "debit", children: "Debit" }), _jsx("option", { value: "credit", children: "Credit" })] })] })] }) }), _jsxs(Modal.Footer, { children: [_jsx(Button, { size: "sm", variant: "secondary", onClick: handleModalClose, children: "Cancel" }), _jsx(Button, { size: "sm", variant: "primary", className: "fw-bold", onClick: onFormSubmit, type: "submit", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "ms-2", children: "uploading..." }), _jsx(Spinner, { size: "sm", animation: "border", role: "status" })] })) : (_jsx("span", { className: "mx-3", children: selectedData ? "Update" : "Add" })) })] })] }));
};
export default AddTransactionTypes;
