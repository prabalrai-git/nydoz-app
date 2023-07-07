import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { CloudArrowUpFill } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import UploadFile from "../../shared/components/Upload";
import FILE_UPLOAD_TYPE from "../../../constants/FileUpload";
import { DOCUMENT_UPLOAD_LIMIT } from "../../../constants/AppSetting";
import API_ROUTE from "../../../service/api";
import useMutation from "../../../hooks/useMutation";
import Spinner from "react-bootstrap/Spinner";

interface IUploadResponse {
    id: string;
    title: string;
    file_link: string;
    uploaded_by: string;
    is_restricted: boolean;
    visible_to?: string[];
}

interface IUploadPayload {
    title: string;
    file_link: string;
    is_restricted: boolean;
    visible_to?: string[];
}

interface IModalProps {
    show: boolean;
    handleClose: () => void;
    companyId: string;
    setFetchAgain: (value: boolean) => void;
}

const AddDocuments = (props: IModalProps) => {
    const { show, handleClose, companyId, setFetchAgain } = props;
    const [fileInfo, setfileInfo] = useState<string[] | undefined>();
    const [title, setTitle] = useState<string>("");
    const { postData, error, isLoading } = useMutation<IUploadResponse>(
        `${API_ROUTE.POST_DOCUMENTS_BY_COMPANY_ID}/${companyId}/documents`,
        true
    );

    const handleSubmit = async () => {
        if (!fileInfo || fileInfo.length === 0) {
            toast.error("Please select file to upload");
            return;
        }
        if (!title) {
            toast.error("Please enter document name");
            return;
        }
        const payload: IUploadPayload = {
            title: title,
            file_link: fileInfo[0],
            is_restricted: false,
            visible_to: [],
        };

        const response = await postData(payload);
        if (response?.status === 201) {
            toast.success("Document uploaded successfully");
            setFetchAgain(true);
            handleClose();
        } else {
            toast.error(error ?? "Error in uploading document");
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <div className='text-gray-900  fs-2 fw-bold me-1'>
                        Upload Documents
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <form action=''>
                        <div className='row'>
                            <div className='col-12 gap-5 gap-md-7 mb-6'>
                                <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                    <label className='required form-label'>
                                        Document Name:
                                    </label>
                                    <input
                                        className='form-control'
                                        placeholder='Enter document Name'
                                        type='text'
                                        name='title'
                                        onChange={(e) => {
                                            setTitle(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className='col-12'>
                                <UploadFile
                                    fileUploadType={
                                        FILE_UPLOAD_TYPE.ANY_FILE_UPLOAD
                                    }
                                    isMultiple={true}
                                    fileUploadLimit={DOCUMENT_UPLOAD_LIMIT}
                                    isUploadRequired={true}
                                    isRoutePrivate={true}
                                    setFileInfo={setfileInfo}
                                    fileInfo={fileInfo}
                                    title='Click to select files'
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button size='sm' variant='secondary' onClick={handleClose}>
                    Cancel
                </Button>
                <Button
                    size='sm'
                    variant='primary'
                    className='fw-bold'
                    onClick={handleSubmit}>
                    {isLoading ? (
                        <>
                            <span className='ms-2'>uploading...</span>
                            <Spinner
                                size='sm'
                                animation='border'
                                role='status'></Spinner>
                        </>
                    ) : (
                        <span className='me-3'>Submit</span>
                    )}
                    <CloudArrowUpFill />
                </Button>
            </Modal.Footer>
            <ToastContainer />
        </Modal>
    );
};

export default AddDocuments;
