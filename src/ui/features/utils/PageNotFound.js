import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useNavigate } from "react-router-dom";
const PageNotFound = () => {
    const navigate = useNavigate();
    return (_jsx("div", { className: "", children: _jsx("div", { className: "d-flex align-items-center justify-content-center h-75vh ", children: _jsxs("div", { className: "text-center  tw-flex tw-flex-col tw-gap-12 ", children: [_jsx("h1", { className: "display-1 fw-bold", children: "404" }), _jsxs("div", { children: [_jsxs("p", { className: "fs-3", children: [_jsx("span", { className: "text-danger", children: "Oops!" }), " Page not found."] }), _jsx("br", {}), _jsx("p", { className: "lead ", children: "The page you\u2019re looking for doesn\u2019t exist." })] }), _jsxs("div", { children: [_jsx(Link, { to: "/", className: "btn btn-secondary  mx-3", children: "Go Home" }), _jsx("button", { onClick: () => navigate(-1), className: " btn btn-primary  mx-3 hover:tw-bg-btnPrimaryHover", children: "Back" })] })] }) }) }));
};
export default PageNotFound;
