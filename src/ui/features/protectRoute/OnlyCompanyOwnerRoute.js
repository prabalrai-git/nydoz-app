import { jsx as _jsx } from "react/jsx-runtime";
import useAuthContext from "../../../context/auth/useAuthContext";
import { Navigate } from "react-router-dom";
const OnlyCompanyOwnerRoute = ({ children, }) => {
    const { isCompanyOwner } = useAuthContext();
    return (_jsx("div", { children: isCompanyOwner ? _jsx("div", { children: children }) : _jsx(Navigate, { to: '/home' }) }));
};
export default OnlyCompanyOwnerRoute;
