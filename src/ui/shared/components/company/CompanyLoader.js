import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Spinner } from "react-bootstrap";
import ImageAtom from "../../atoms/ImageAtom";
const CompanyLoadingPage = (props) => {
    const { companyName, imgSrc } = props;
    return (_jsxs("div", { className: 'd-flex align-items-center flex-direction-column justify-content-center vh-100', children: [imgSrc ? (_jsx(ImageAtom, { src: imgSrc, alt: `${companyName} Logo` ?? "Company Logo" })) : (_jsx("div", { className: 'fs-7', children: companyName })), _jsxs("div", { className: 'text-center', children: [_jsx(Spinner, { className: 'mx-2', variant: 'warning', animation: 'grow', size: 'sm' }), _jsx(Spinner, { className: 'mx-2', variant: 'warning', animation: 'grow', size: 'sm' }), _jsx(Spinner, { className: 'mx-2', variant: 'warning', animation: 'grow', size: 'sm' }), _jsx(Spinner, { className: 'mx-2', variant: 'warning', animation: 'grow', size: 'sm' }), _jsx(Spinner, { className: 'mx-2', variant: 'warning', animation: 'grow', size: 'sm' })] })] }));
};
export default CompanyLoadingPage;
