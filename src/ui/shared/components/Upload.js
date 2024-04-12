import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
//  state passed const [fileInfo, setfileInfo] = useState<string[] | undefined>();
import { useState, useEffect } from "react";
import API_ROUTE from "../../../service/api";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import { FILE_ACCEPT_TYPE } from "../../../constants/FileUpload";
import useMutation from "../../../hooks/useMutation";
import InputGroup from "react-bootstrap/InputGroup";
const UploadFile = (props) => {
    const { fileUploadType, title, isMultiple, isUploadRequired, description, isRoutePrivate, setFileInfo, fileUploadLimit, } = props;
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const { postData, error, isLoading } = useMutation(API_ROUTE[fileUploadType], isRoutePrivate);
    // console.log(fileInfo, "this is file info");
    useEffect(() => {
        // setFileInfo(fileInfo);
        if (error) {
            toast.error(error);
            setFileInfo(undefined);
        }
    }, [error, setFileInfo]);
    const handleFileUpload = async (event) => {
        if (event.target.files) {
            const files = event.target.files;
            if (!files)
                return;
            const filesArray = [];
            for (let i = 0; i < files.length; i++) {
                filesArray.push(files[i]);
            }
            if (filesArray.length > fileUploadLimit) {
                return toast.error(`File upload limit is ${fileUploadLimit}`);
            }
            handleFileUploadResponse(filesArray);
        }
    };
    const handleFileUploadResponse = async (filesArray) => {
        if (filesArray?.length === 0)
            return toast.error("No file found");
        const fileResponseList = [];
        await Promise.all(filesArray.map(async (file) => {
            const formData = new FormData();
            formData.append("file", file);
            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                },
            };
            const response = await postData(formData, config);
            if (response?.data?.status === "ok") {
                setUploadSuccess(true);
                if (response?.data?.payload?.link) {
                    fileResponseList.push(response?.data?.payload?.link);
                }
            }
        }));
        setFileInfo(fileResponseList);
    };
    return (_jsxs("div", { className: "", children: [_jsx("label", { htmlFor: "formFile", className: "form-label", children: title && (_jsx("span", { className: isUploadRequired ? "required text-primary " : "text-primary ", children: title })) }), _jsxs(InputGroup, { className: "mb-3", children: [_jsx("input", { className: "form-control", multiple: isMultiple, accept: FILE_ACCEPT_TYPE[fileUploadType], capture: true, onChange: (event) => handleFileUpload(event), type: "file", id: "formFile" }), _jsxs(InputGroup.Text, { id: "basic-addon2", children: [isLoading && (_jsx(Spinner, { size: "sm", variant: "primary", animation: "border", role: "status" })), !isLoading && !uploadSuccess && (_jsx("span", { children: _jsx("i", { style: {
                                        fontSize: "1.3rem",
                                    }, className: "bi bi-cloud-upload" }) })), !isLoading && uploadSuccess && (_jsx("span", { children: _jsx("i", { style: {
                                        fontSize: "1.3rem",
                                        color: "green",
                                    }, className: "bi bi-check-circle" }) }))] })] }), description && _jsx("div", { className: "text-muted fs-7", children: description })] }));
};
export default UploadFile;
