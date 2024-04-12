import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { informationChannelSchema } from "../../../../validations/crm.validators";
import API_ROUTE from "../../../../service/api";
import useMutation from "../../../../hooks/useMutation";
const AddVisaType = (props) => {
    const { show, handleClose, setFetchAgain, selectedData } = props;
    const { postData, updateData, errList, error, isLoading } = useMutation(API_ROUTE.CM_VISITING_PURPOSES, true);
    const { register, reset, setError, handleSubmit, formState: { errors }, } = useForm({
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
        }
        else {
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
    const onFormSubmit = handleSubmit(async (data) => {
        if (selectedData) {
            const response = await updateData(selectedData.id, data);
            if (response?.status === 200) {
                toast.success("Visiting Purpose updated successfully");
                reset({
                    description: "",
                });
                setFetchAgain(true);
                handleClose();
            }
        }
        else {
            const response = await postData(data);
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
    return (_jsxs(Modal, { show: show, onHide: handleClose, className: "tw-mt-[10%]", children: [_jsx(Modal.Header, { closeButton: true, children: _jsx(Modal.Title, { children: _jsxs("div", { className: "text-gray-900  fs-2 fw-bold me-1", children: [selectedData ? "Update" : "Add", " Visiting Purpose"] }) }) }), _jsx(Modal.Body, { children: _jsx("form", { onSubmit: onFormSubmit, children: _jsx("div", { className: "row", children: _jsx("div", { className: "col-12 gap-5 gap-md-7 ", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: " form-label", children: "Description:" }), _jsx("textarea", { rows: 5, cols: 5, className: "form-control", placeholder: "Enter description", ...register("description") }), _jsx("p", { className: "text-danger mt-1", children: errors.description?.message })] }) }) }) }) }), _jsxs(Modal.Footer, { children: [_jsx(Button, { size: "sm", variant: "secondary", onClick: handleModalClose, children: "Cancel" }), _jsx(Button, { size: "sm", variant: "primary", className: "fw-bold hover:tw-bg-btnPrimaryHover", onClick: onFormSubmit, type: "submit", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "ms-2", children: "Adding..." }), _jsx(Spinner, { size: "sm", animation: "border", role: "status" })] })) : (_jsx("span", { className: "mx-3", children: selectedData ? "Update" : "Add" })) })] })] }));
};
export default AddVisaType;
