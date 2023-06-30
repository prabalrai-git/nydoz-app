import FileView from "../molecules/FileView";

interface FileListProps {
    fileInfo: string[];
}

const FileList = (props: FileListProps) => {
    const { fileInfo } = props;

    return (
        <div className='d-flex'>
            {fileInfo.map((url: string, index: number) => (
                <FileView key={index} url={url} />
            ))}
        </div>
    );
};

export default FileList;
