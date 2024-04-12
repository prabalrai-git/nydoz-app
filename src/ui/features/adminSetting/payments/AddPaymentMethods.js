import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import API_ROUTE from "../../../../service/api";
import useMutation from "../../../../hooks/useMutation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Modal, Spinner } from "react-bootstrap";
const DynamicForm = (props) => {
    const [isAccountRequired, setIsAccountRequired] = useState(false);
    const navigate = useNavigate();
    const { show, handleClose, setFetchAgain, selectedData } = props;
    const { postData, updateData, errList, isLoading } = useMutation(API_ROUTE.PAYMENT_METHODS, true);
    const handleCheckboxChange = () => {
        setIsAccountRequired(!isAccountRequired);
    };
    const defaultValues = {
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
    const { watch, handleSubmit, control, register, setError, reset, formState: { errors }, } = useForm({
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
        }
        else {
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
    const { fields, append, remove } = useFieldArray({
        control,
        name: "custom_fields",
    });
    const onSubmit = handleSubmit(async (data) => {
        if (selectedData) {
            const response = await updateData(selectedData.id, data);
            if (response?.status === 200) {
                toast.success("Payment Method updated successfully");
                reset();
                setFetchAgain(true);
                handleClose();
            }
        }
        else {
            const payload = data.custom_fields.map((field) => {
                const optionArry = field.options.split(",");
                return {
                    name: field.name,
                    type: field.type,
                    options: optionArry,
                    is_required: field.is_required,
                    multiple_value: field.type.toLowerCase() === "select" ||
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
                    setFetchAgain(true);
                    handleClose();
                }
            }
            catch (error) { }
        }
    });
    const typeValues = watch(`custom_fields`);
    // const formName = watch(`name`);
    const formRequired = watch(`is_account_required`);
    useEffect(() => { }, [formRequired]);
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
    return (_jsxs(Modal, { size: "lg", show: show, onHide: handleClose, children: [_jsx(Modal.Header, { closeButton: true, children: _jsx(Modal.Title, { children: _jsxs("div", { className: "text-gray-900  fs-2 fw-bold me-1", children: [selectedData ? "Update" : "Add", " Payment Method"] }) }) }), _jsx(Modal.Body, { className: "", children: _jsxs("form", { onSubmit: onSubmit, children: [_jsxs("div", { className: "mb-3", children: [_jsx("label", { className: "form-label", children: "Name" }), _jsx("input", { className: "form-control", ...register("name"), placeholder: "Name" })] }), _jsxs("div", { className: "my-6", children: [_jsx("label", { className: "form-label mx-3", children: "Is Account Required" }), _jsx("input", { className: "form-check-input", type: "checkbox", checked: isAccountRequired, onChange: handleCheckboxChange })] }), _jsxs("div", { children: [fields.map((field, index) => {
                                    const indexValue = index;
                                    return (_jsxs("div", { className: "my-6  p-6 tw-rounded-lg tw-shadow-lg", children: [_jsxs("h5", { className: "text-info my-5 tw-font-bold", children: ["Custom Field Number: ", index + 1] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { className: "form-label", children: "Input Field Name" }), _jsx("input", { type: "text", ...register(`custom_fields.${indexValue}.name`), placeholder: "Enter the Field Name", className: "form-control" })] }), _jsxs("div", { className: "mb-6", children: [_jsx("label", { className: "form-label", children: "Input Type" }), _jsxs("select", { ...register(`custom_fields.${indexValue}.type`), className: "form-select", children: [_jsx("option", { value: "text", children: "Text" }), _jsx("option", { value: "select", children: "Select" }), _jsx("option", { value: "checkbox", children: "Checkbox" }), _jsx("option", { value: "radio", children: "Radio" })] })] }), forMultipleValues.includes(typeValues[index].type) && (_jsx("input", { type: "text", ...register(`custom_fields.${index}.options`), placeholder: `Enter the options separated by comma`, className: "form-control mb-3" })), _jsxs("div", { className: "d-flex justify-content-between", children: [_jsxs("div", { className: "my-3", children: [_jsx("label", { className: "form-label mx-3", children: "Is Input Field Required" }), _jsx("input", { className: "form-check-input tw-p-1", type: "checkbox", ...register(`custom_fields.${indexValue}.is_required`) })] }), _jsx("button", { className: " tw-bg-appRed hover:tw-bg-appRedHover  tw-text-white tw-h-12 tw-px-3 tw-font-bold tw-rounded-lg ", onClick: () => remove(index), children: "Delete Input field" })] })] }, field.id));
                                }), _jsx("div", { className: "d-flex ", children: _jsx("button", { type: "button", className: "btn  btn-sm tw-bg-appBlue hover:tw-bg-appBlueHover tw-text-white hover:tw-text-white", onClick: () => append({
                                            name: "",
                                            type: "text",
                                            options: "",
                                            is_required: true,
                                            multiple_value: false,
                                        }), children: "Add More Custom Field" }) })] })] }) }), _jsxs(Modal.Footer, { children: [_jsx(Button, { size: "sm", variant: "secondary", onClick: handleModalClose, children: "Cancel" }), _jsx(Button, { size: "sm", variant: "primary", className: "fw-bold", onClick: onSubmit, type: "submit", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "ms-2", children: "uploading..." }), _jsx(Spinner, { size: "sm", animation: "border", role: "status" })] })) : (_jsx("span", { className: "mx-3", children: selectedData ? "Update" : "Add" })) })] })] }));
};
export default DynamicForm;
