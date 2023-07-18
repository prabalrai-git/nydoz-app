import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { IDocumentResponse } from "../../../types/payload.type";
import Images from "../../../constants/Images";

import Modal from "react-bootstrap/Modal";
import UploadFile from "../../shared/components/Upload";
import FILE_UPLOAD_TYPE from "../../../constants/FileUpload";
import { DOCUMENT_UPLOAD_LIMIT } from "../../../constants/AppSetting";
import API_ROUTE from "../../../service/api";
import useMutation from "../../../hooks/useMutation";

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
    selectedData?: IDocumentResponse;
    setSelectedData?: (value: IDocumentResponse) => void;
}

const AddDocuments = (props: IModalProps) => {
    const { show, handleClose, companyId, setFetchAgain, selectedData } = props;
    const [fileInfo, setfileInfo] = useState<string[] | undefined>();
    const [title, setTitle] = useState<string>("");
    const { postData, error, isLoading, updateData } =
        useMutation<IDocumentResponse>(
            `${API_ROUTE.POST_DOCUMENTS_BY_COMPANY_ID}/${companyId}/documents`,
            true
        );

    useEffect(() => {
        if (selectedData) {
            setTitle(selectedData.title);
        } else {
            setTitle("");
        }
    }, [selectedData]);

    const handleSubmit = async () => {
        if (selectedData?.id) {
            if (!title) {
                toast.error("Please enter document name");
                return;
            }

            const payload: IUploadPayload = {
                title: title,
                file_link: selectedData.file_link,
                is_restricted: selectedData.is_restricted,
                visible_to: selectedData.visible_to,
            };

            const response = await updateData(selectedData?.id, payload);
            console.log(response, "response");
            if (response?.status === 200) {
                toast.success("Document updated successfully");
                setFetchAgain(true);
                setTitle("");
                setfileInfo(undefined);
                handleClose();
            }
        } else {
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
                setTitle("");
                setfileInfo(undefined);
                handleClose();
            }
        }
    };

    useEffect(() => {
        if (error) {
            toast.error(
                error ?? "Error in uploading document. Please try again later."
            );
        }
    }, [error]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <div className='text-gray-900  fs-2 fw-bold me-1'>
                        {selectedData?.id
                            ? "Update Documents"
                            : "Upload Documents"}
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
                                        value={title}
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
                                {selectedData ? (
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div className='symbol symbol-label '>
                                            <img
                                                className='img-fluid'
                                                src={Images.Folder}
                                                alt='Logo'
                                            />
                                            <p className='text-warning text-muted fs-7'>
                                                File Cannot be updated.
                                            </p>
                                        </div>
                                        <div>
                                            {selectedData?.is_restricted ? (
                                                <span className='badge text-bg-primary'>
                                                    Not Restricted
                                                </span>
                                            ) : (
                                                <span className='badge text-bg-danger'>
                                                    Restricted
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ) : (
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
                                )}
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
                        <span className='mx-3'>
                            {selectedData ? "Update" : "Upload"}
                        </span>
                    )}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddDocuments;
