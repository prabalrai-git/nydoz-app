import { FileType } from "../../../types/fileUpload.type";
import API_ROUTE from "../../../service/api";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";

import { FILE_ACCEPT_TYPE } from "../../../constants/FileUpload";

import useMutation from "../../../hooks/useMutation";

interface IUploadProps {
    title: string;
    isRoutePrivate: boolean;
    description?: string;
    fileUploadType: FileType;
    isMultiple: boolean;
    isUploadRequired: boolean;
    fileInfo?: string | undefined;
    setFileInfo: (imageId: string | undefined) => void;
}

interface IUploadFileResponse {
    link: string;
}

const UploadFile: React.FC<IUploadProps> = (props: IUploadProps) => {
    const {
        fileUploadType,
        title,
        isMultiple,
        isUploadRequired,
        description,
        isRoutePrivate,
        setFileInfo,
    } = props;

    console.log(API_ROUTE[fileUploadType], "fileUploadType", fileUploadType);

    const { postData, error, isLoading } = useMutation<IUploadFileResponse>(
        API_ROUTE[fileUploadType],
        isRoutePrivate
    );

    const handleFileUpload = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = event.target.files;
        if (files) {
            const formData = new FormData();
            formData.append("file", files[0]);
            formData.append("type", fileUploadType);
            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                },
            };
            const response = await postData(formData, config);
            if (response) {
                setFileInfo(response?.data?.payload?.link as string);
            }
            console.log(response, "response");
        }
    };

    if (error) toast.error(error);

    return (
        <div>
            <label htmlFor='formFile' className='form-label'>
                {title}
                {isUploadRequired && <span className='text-danger'>*</span>}
                {isLoading && (
                    <Spinner animation='border' role='status'>
                        <span className='visually-hidden'>uploading...</span>
                    </Spinner>
                )}
            </label>
            <input
                className='form-control'
                multiple={isMultiple}
                accept={FILE_ACCEPT_TYPE[fileUploadType]}
                capture
                onChange={(event) => handleFileUpload(event)}
                type='file'
                id='formFile'
            />
            {description && <p className='text-muted'>{description}</p>}
            <ToastContainer />
        </div>
    );
};

export default UploadFile;
