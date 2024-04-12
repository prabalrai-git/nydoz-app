import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CompanySocialLinkSchema } from "../../../validations/company.validator";
import API_ROUTE from "../../../service/api";
import useMutation from "../../../hooks/useMutation";
const AddSocialLink = (props) => {
    const { companyId, show, handleClose, setFetchAgain, selectedData } = props;
    const postURl = `${API_ROUTE.GET_SOCIAL_LINKS_BY_COMPANYID}/${companyId}/social-links`;
    const { postData, updateData, errList, error, isLoading } = useMutation(postURl, true);
    const { register, reset, setError, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(CompanySocialLinkSchema),
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
                title: selectedData.title,
                link: selectedData.link,
            });
        }
        else {
            reset({
                title: "",
                link: "",
            });
        }
    }, [reset, selectedData]);
    useEffect(() => {
        if (errList?.title) {
            setError("title", {
                type: "manual",
                message: errList?.title[0],
            });
        }
        if (errList?.link) {
            setError("link", {
                type: "manual",
                message: errList?.link[0],
            });
        }
    }, [errList, setError]);
    const onFormSubmit = handleSubmit(async (data) => {
        if (selectedData) {
            const response = await updateData(selectedData.id, data);
            if (response?.status === 200) {
                toast.success("Social Link updated successfully");
                reset({
                    title: "",
                    link: "",
                });
                setFetchAgain(true);
                handleClose();
            }
        }
        else {
            const response = await postData(data);
            if (response?.status === 201) {
                toast.success("Social Link Added successfully");
                reset({
                    title: "",
                    link: "",
                });
                setFetchAgain(true);
                handleClose();
            }
        }
    });
    const handleCloseModal = () => {
        reset({
            title: "",
            link: "",
        });
        handleClose();
    };
    return (_jsxs(Modal, { show: show, onHide: handleClose, children: [_jsx(Modal.Header, { closeButton: true, children: _jsx(Modal.Title, { children: _jsxs("div", { className: "text-gray-900  fs-2 fw-bold me-1", children: [selectedData ? "Update" : "Add", " Social Link"] }) }) }), _jsx(Modal.Body, { children: _jsx("div", { children: _jsx("form", { onSubmit: onFormSubmit, children: _jsxs("div", { className: "row", children: [_jsx("div", { className: "col-12 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "Social Link" }), _jsx("input", { className: "form-control", placeholder: "Enter socail media links.  Eg:- Facebook.com, Twitter, etc\r\n                                        ", type: "text", ...register("title") }), _jsx("p", { className: "text-danger mt-1", children: errors.title?.message })] }) }), _jsx("div", { className: "col-12 gap-5 gap-md-7 ", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "Website Link" }), _jsx("input", { className: "form-control", placeholder: "Enter website link. Eg:- https://example.com", ...register("link") }), _jsx("p", { className: "text-danger mt-1", children: errors.link?.message })] }) })] }) }) }) }), _jsxs(Modal.Footer, { children: [_jsx(Button, { size: "sm", variant: "secondary", onClick: handleCloseModal, children: "Cancel" }), _jsx(Button, { size: "sm", variant: "primary", className: "fw-bold", onClick: onFormSubmit, type: "submit", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "ms-2", children: "uploading..." }), _jsx(Spinner, { size: "sm", animation: "border", role: "status" })] })) : (_jsx("span", { className: "mx-3", children: selectedData ? "Update" : "Add" })) })] })] }));
};
export default AddSocialLink;
