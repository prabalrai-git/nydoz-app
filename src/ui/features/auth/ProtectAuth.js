import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, useLocation } from "react-router-dom";
import useAuthContext from "../../../context/auth/useAuthContext";
const ProtectAuth = ({ children }) => {
    // const { userInfo, token } = useContext(AuthContext);
    const { isLoggedIn, token } = useAuthContext();
    const location = useLocation().pathname;
    return isLoggedIn && token ? (_jsx(Navigate, { to: "/", state: { from: location }, replace: true })) : (children);
};
export default ProtectAuth;
