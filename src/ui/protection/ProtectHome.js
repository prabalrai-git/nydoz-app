import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from "react-router-dom";
import useSubdomain from "../../hooks/useSubdomain";
const ProtectHomeRoute = ({ children }) => {
    const subDomainFromUrl = useSubdomain();
    return (_jsx("div", { children: subDomainFromUrl ? (_jsx(Navigate, { to: `/${subDomainFromUrl}` })) : (_jsx("div", { children: children })) }));
};
export default ProtectHomeRoute;
