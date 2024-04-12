import { jsx as _jsx } from "react/jsx-runtime";
import FileView from "../molecules/FileView";
const FileList = (props) => {
    const { fileInfo } = props;
    return (_jsx("div", { className: 'd-flex', children: fileInfo.map((url, index) => (_jsx(FileView, { url: url }, index))) }));
};
export default FileList;
