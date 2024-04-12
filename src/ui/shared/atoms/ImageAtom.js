import { jsx as _jsx } from "react/jsx-runtime";
const ImageAtom = (props) => {
    const { src, alt, className } = props;
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const imageURL = `${BASE_URL}${src}`;
    return _jsx("img", { src: imageURL, alt: alt, className: className });
};
export default ImageAtom;
