import UploadFile from "../../shared/components/Upload";
import FILE_UPLOAD_TYPE from "../../../constants/FileUpload";
import { useState } from "react";
import FileList from "../../shared/components/FileList";

const Dashboard = () => {
    const [imageInfo, setImageInfo] = useState<string[] | undefined>();
    return (
        <div className='container'>
            {imageInfo && imageInfo?.length > 0 && (
                <FileList fileInfo={imageInfo} />
            )}
            <UploadFile
                title='Upload File'
                fileUploadType={FILE_UPLOAD_TYPE.JSON}
                isMultiple={true}
                isRoutePrivate={true}
                isUploadRequired={true}
                fileUploadLimit={4}
                fileInfo={imageInfo}
                setFileInfo={setImageInfo}
            />
        </div>
    );
};

export default Dashboard;
