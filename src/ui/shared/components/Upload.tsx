//  state passed const [fileInfo, setfileInfo] = useState<string[] | undefined>();
import { useState, useEffect } from "react";
import { FileType } from "../../../types/fileUpload.type";
import API_ROUTE from "../../../service/api";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import { FILE_ACCEPT_TYPE } from "../../../constants/FileUpload";
import useMutation from "../../../hooks/useMutation";
import InputGroup from "react-bootstrap/InputGroup";

interface IUploadProps {
  title?: string;
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

  const [uploadSuccess, setUploadSuccess] = useState(false);

  const { postData, error, isLoading } = useMutation<IUploadFileResponse>(
    API_ROUTE[fileUploadType],
    isRoutePrivate
  );

  // console.log(fileInfo, "this is file info");

  useEffect(() => {
    // setFileInfo(fileInfo);
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

        if (response?.data?.status === "ok") {
          setUploadSuccess(true);
          if (response?.data?.payload?.link) {
            fileResponseList.push(response?.data?.payload?.link);
          }
        }
      })
    );

    setFileInfo(fileResponseList);
  };

  return (
    <div className="">
      <label htmlFor="formFile" className="form-label">
        {title && (
          <span
            className={
              isUploadRequired ? "required text-primary " : "text-primary "
            }
          >
            {title}
          </span>
        )}
      </label>

      <InputGroup className="mb-3">
        <input
          className="form-control"
          multiple={isMultiple}
          accept={FILE_ACCEPT_TYPE[fileUploadType]}
          capture
          onChange={(event) => handleFileUpload(event)}
          type="file"
          id="formFile"
        />

        <InputGroup.Text id="basic-addon2">
          {isLoading && (
            <Spinner
              size="sm"
              variant="primary"
              animation="border"
              role="status"
            />
          )}
          {!isLoading && !uploadSuccess && (
            <span>
              <i
                style={{
                  fontSize: "1.3rem",
                }}
                className="bi bi-cloud-upload"
              ></i>
            </span>
          )}
          {!isLoading && uploadSuccess && (
            <span>
              <i
                style={{
                  fontSize: "1.3rem",
                  color: "green",
                }}
                className="bi bi-check-circle"
              ></i>
            </span>
          )}
        </InputGroup.Text>
      </InputGroup>

      {description && <div className="text-muted fs-7">{description}</div>}
    </div>
  );
};

export default UploadFile;
