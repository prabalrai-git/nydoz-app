import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Images from "../../../../constants/Images";
import Modal from "react-bootstrap/Modal";
import UploadFile from "../../../shared/components/Upload";
import FILE_UPLOAD_TYPE from "../../../../constants/FileUpload";
import { DOCUMENT_UPLOAD_LIMIT } from "../../../../constants/AppSetting";
import API_ROUTE from "../../../../service/api";
import useMutation from "../../../../hooks/useMutation";
const AddClientDocuments = (props) => {
    const { show, handleClose, companyId, setFetchAgain, selectedData, clientId, } = props;
    const [fileInfo, setfileInfo] = useState();
    const [title, setTitle] = useState("");
    const { postData, error, isLoading, updateData } = useMutation(`${API_ROUTE.CLIENT_DOCUMENTS}/${clientId}/documents`, true);
    useEffect(() => {
        if (selectedData) {
            setTitle(selectedData.title);
        }
        else {
            setTitle("");
        }
    }, [selectedData]);
    const handleSubmit = async () => {
        if (selectedData?.id) {
            if (!title) {
                toast.error("Please enter document name");
                return;
            }
            const payload = {
                title: title,
                file_link: selectedData.file_link,
                is_restricted: selectedData.is_restricted,
                visible_to: selectedData.visible_to,
            };
            const response = await updateData(selectedData?.id, payload);
            if (response?.status === 200) {
                toast.success("Document updated successfully");
                setFetchAgain(true);
                setTitle("");
                setfileInfo(undefined);
                handleClose();
            }
        }
        else {
            if (!fileInfo || fileInfo.length === 0) {
                toast.error("Please select file to upload");
                return;
            }
            if (!title) {
                toast.error("Please enter document name");
                return;
            }
            const payload = {
                title: title,
                file_link: fileInfo[0],
                is_restricted: false,
                visible_to: [],
            };
            const response = await postData(payload);
            if (response?.status === 201) {
                toast.success("Document uploaded successfully");
                setFetchAgain(true);
                setTitle("");
                setfileInfo(undefined);
                handleClose();
            }
        }
    };
    useEffect(() => {
        if (error) {
            toast.error(error ?? "Error in uploading document. Please try again later.");
        }
    }, [error]);
    return (_jsxs(Modal, { show: show, onHide: handleClose, children: [_jsx(Modal.Header, { closeButton: true, children: _jsx(Modal.Title, { children: _jsx("div", { className: "text-gray-900  fs-2 fw-bold me-1", children: selectedData?.id ? "Update Documents" : "Upload Documents" }) }) }), _jsx(Modal.Body, { children: _jsx("div", { children: _jsx("form", { action: "", children: _jsxs("div", { className: "row", children: [_jsx("div", { className: "col-12 gap-5 gap-md-7 mb-6", children: _jsxs("div", { className: "fv-row flex-row-fluid fv-plugins-icon-container", children: [_jsx("label", { className: "required form-label", children: "Document Name:" }), _jsx("input", { value: title, className: "form-control", placeholder: "Enter document Name", type: "text", name: "title", onChange: (e) => {
                                                    setTitle(e.target.value);
                                                } })] }) }), _jsx("div", { className: "col-12", children: selectedData ? (_jsxs("div", { className: "d-flex justify-content-between align-items-center", children: [_jsxs("div", { className: "symbol symbol-label ", children: [_jsx("img", { className: "img-fluid", src: Images.Folder, alt: "Logo" }), _jsx("p", { className: "text-warning text-muted fs-7", children: "File Cannot be updated." })] }), _jsx("div", { children: selectedData?.is_restricted ? (_jsx("span", { className: "badge text-bg-primary", children: "Not Restricted" })) : (_jsx("span", { className: "badge text-bg-danger", children: "Restricted" })) })] })) : (_jsx(UploadFile, { fileUploadType: FILE_UPLOAD_TYPE.ANY_FILE_UPLOAD, isMultiple: true, fileUploadLimit: DOCUMENT_UPLOAD_LIMIT, isUploadRequired: true, isRoutePrivate: true, setFileInfo: setfileInfo, fileInfo: fileInfo, title: "Click to select files" })) })] }) }) }) }), _jsxs(Modal.Footer, { children: [_jsx(Button, { size: "sm", variant: "secondary", onClick: handleClose, children: "Cancel" }), _jsx(Button, { size: "sm", variant: "primary", className: "fw-bold", onClick: handleSubmit, children: isLoading ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "ms-2", children: "uploading..." }), _jsx(Spinner, { size: "sm", animation: "border", role: "status" })] })) : (_jsx("span", { className: "mx-3", children: selectedData ? "Update" : "Upload" })) })] })] }));
};
export default AddClientDocuments;
