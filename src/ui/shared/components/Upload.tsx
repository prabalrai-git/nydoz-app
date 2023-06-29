import { FileType } from "../../../types/fileUpload.type";
import API_ROUTE from "../../../service/api";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import { FILE_ACCEPT_TYPE } from "../../../constants/FileUpload";
import useMutation from "../../../hooks/useMutation";
import { useEffect } from "react";

interface IUploadProps {
    title: string;
    isRoutePrivate: boolean;
    description?: string;
    fileUploadType: FileType;
    isMultiple: boolean;
    isUploadRequired: boolean;
    fileUploadLimit: number;
    fileInfo?: string[] | undefined;
    setFileInfo: (fileInfo: string[] | undefined) => void;
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
        fileUploadLimit,
    } = props;

    console.log(API_ROUTE[fileUploadType], "fileUploadType", fileUploadType);

    const { postData, error, isLoading } = useMutation<IUploadFileResponse>(
        API_ROUTE[fileUploadType],
        isRoutePrivate
    );

    useEffect(() => {
        if (error) {
            toast.error(error);
            setFileInfo(undefined);
        }
    }, [error, setFileInfo]);

    const handleFileUpload = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.files) {
            const files = event.target.files;

            if (!files) return;

            const filesArray: File[] = [];

            for (let i = 0; i < files.length; i++) {
                filesArray.push(files[i]);
            }

            if (filesArray.length > fileUploadLimit) {
                return toast.error(`File upload limit is ${fileUploadLimit}`);
            }

            handleFileUploadResponse(filesArray);
        }
    };

    const handleFileUploadResponse = async (filesArray: File[]) => {
        if (filesArray?.length === 0) return toast.error("No file found");

        const fileResponseList: string[] = [];
        await Promise.all(
            filesArray.map(async (file) => {
                const formData = new FormData();
                formData.append("file", file);

                const config = {
                    headers: {
                        "content-type": "multipart/form-data",
                    },
                };

                const response = await postData(formData, config);
                console.log(response, "response");

                if (response?.data?.status === "ok") {
                    if (response?.data?.payload?.link) {
                        console.log("link", response?.data?.payload?.link);
                        fileResponseList.push(response?.data?.payload?.link);
                    }
                }
            })
        );

        console.log(fileResponseList, "fileResponseList");
        setFileInfo(fileResponseList);
    };

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
