import UploadFile from "../../shared/components/Upload";
import FILE_UPLOAD_TYPE from "../../../constants/FileUpload";
import { useState } from "react";

const Dashboard = () => {
    const [imageInfo, setImageInfo] = useState<string | undefined>();
    return (
        <div className='container'>
            <UploadFile
                title='Upload File'
                fileUploadType={FILE_UPLOAD_TYPE.IMAGE}
                isMultiple={false}
                isRoutePrivate={true}
                isUploadRequired={true}
                fileInfo={imageInfo}
                setFileInfo={setImageInfo}
            />
        </div>
    );
};

export default Dashboard;
