import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { FileEarmarkCheck } from "react-bootstrap-icons";
import Spinner from "react-bootstrap/Spinner";
const UploadFileView = (props) => {
    const { url } = props;
    const isImage = url?.match(/\.(jpeg|jpg|gif|png)$/) !== null && url !== undefined;
    const relativeUrl = `${import.meta.env.VITE_BASE_URL}${url}`;
    return (_jsx("div", { className: "img-thumbnil-container m-2", children: url ? (_jsx(_Fragment, { children: isImage ? (_jsx("img", { src: relativeUrl, className: "img-thumbnail", alt: "file" })) : (_jsx("div", { className: "img-thumbnail py-3 px-1", children: _jsx(FileEarmarkCheck, { color: "green", size: 50 }) })) })) : (_jsx(Spinner, { animation: "border", variant: "primary" })) }));
};
export default UploadFileView;
