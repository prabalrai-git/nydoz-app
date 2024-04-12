import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const BackButton = () => {
    const navigate = useNavigate();
    return (_jsx(Button, { onClick: () => navigate(-1), className: 'btn btn-secondary fs-7 fw-bold btn-sm mb-3', children: _jsx("span", { children: "Back" }) }));
};
export default BackButton;
