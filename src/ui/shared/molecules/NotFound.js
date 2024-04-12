import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
const NotFound = (props) => {
    const navigate = useNavigate();
    const title = props.title;
    return (_jsxs("div", { className: 'text-center my-6 px-3', children: [_jsxs("h1", { className: 'text-warning', children: [title ?? "Not Found", " "] }), _jsx("button", { onClick: () => navigate(-1), className: 'btn btn-secondary my-3 btn-sm', children: "Go Back" })] }));
};
export default NotFound;
