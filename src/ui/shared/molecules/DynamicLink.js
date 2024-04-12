import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from "react";
import APP_SETTING from "../../../config/AppSetting";
import { Link } from "react-router-dom";
import useWebSetting from "../../../context/useWebSetting";
import useAuthContext from "../../../context/auth/useAuthContext";
const DynamicLink = (props) => {
    const appEnvironment = APP_SETTING.ENVIRONMENT;
    const { subdomain, pathName, children, className } = props;
    const { hasSubdomain, domainBase, protocol } = useWebSetting();
    // const clientManagement = `http://localhost:5173/workspace/mozilla/products/client-management/dashboard`;
    const { isLoggedIn, token } = useAuthContext();
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        }
    }, [token]);
    return (_jsx(_Fragment, { children: appEnvironment !== "development" ? (_jsx(_Fragment, { children: hasSubdomain ? (_jsx(Link, { to: pathName, className: className, children: children })) : (_jsxs("a", { href: `${protocol}://www.${subdomain}.${domainBase}/${pathName}`, className: className, children: [children, _jsx("h6", { children: `${protocol}://www.${subdomain}.${domainBase}/${pathName}` })] })) })) : (_jsx(Link, { to: `http://${subdomain}.localhost:5174/${pathName}`, className: className, children: children })
        // <Link to={`/workspace/${pathName}`} className={className}>
        //   {children}
        // </Link>
        ) }));
};
export default DynamicLink;
