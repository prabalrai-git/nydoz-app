import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, useLocation } from "react-router-dom";
import useAuthContext from "../../../context/auth/useAuthContext";
const Protected = ({ children }) => {
    const { isLoggedIn, token } = useAuthContext();
    const location = useLocation().pathname;
    return isLoggedIn && token ? (children) : (_jsx(Navigate, { to: "/auth/login", state: { from: location }, replace: true }));
};
export default Protected;
