import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
const Heading = (props) => {
    const { title, btnText, showBreadcrumb, children } = props;
    const navigate = useNavigate();
    return (_jsxs("div", { className: 'app-toolbar-wrapper d-flex flex-stack flex-wrap gap-4 w-100 ', children: [_jsxs("div", { className: 'page-title d-flex flex-column justify-content-center gap-1 me-3', children: [_jsx("h1", { className: 'page-heading d-flex flex-column justify-content-center text-dark fw-bold fs-3 m-0', children: title }), showBreadcrumb && children] }), btnText && (_jsx("div", { className: 'd-flex align-items-center gap-2 gap-lg-3', children: _jsx("button", { onClick: () => navigate(-1), className: 'btn btn-flex btn-secondary   fs-7 fw-bold btn-sm', children: btnText }) }))] }));
};
export default Heading;
