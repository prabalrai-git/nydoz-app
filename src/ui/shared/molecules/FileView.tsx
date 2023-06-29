import { FileEarmarkCheck } from "react-bootstrap-icons";
import Spinner from "react-bootstrap/Spinner";

interface IProps {
    url?: string;
}

const UploadFileView = (props: IProps) => {
    const { url } = props;
    console.log(url, "url");
    const isImage =
        url?.match(/\.(jpeg|jpg|gif|png)$/) !== null && url !== undefined;
    const relativeUrl = `${import.meta.env.VITE_BASE_URL}${url}`;

    return (
        <div className='img-thumbnil-container m-2'>
            {url ? (
                <>
                    {isImage ? (
                        <img
                            src={relativeUrl}
                            className='img-thumbnail'
                            alt='file'
                        />
                    ) : (
                        <div className='img-thumbnail py-3 px-1'>
                            <FileEarmarkCheck color='green' size={50} />
                        </div>
                    )}
                </>
            ) : (
                <Spinner animation='border' variant='primary' />
            )}
        </div>
    );
};

export default UploadFileView;
