import { createContext } from "react";
const AuthContext = createContext({
    auth: {
        isLoggedIn: false,
        userInfo: undefined,
        companyInfo: undefined,
        token: null,
        isAdmin: false,
        isCompanyOwner: false,
        subdomain: undefined,
        userCompanyAndItsProducts: undefined,
    },
    dispatch: () => null,
    webSetting: {
        showProductSidebar: true,
        showProductSidebarApp: false,
        showCompanySidebar: true,
        urlData: {
            url: "",
            subdomain: "",
            path: "",
            hasSubdomain: false,
            domainBase: "",
            protocol: "",
        },
    },
    dispatchWebSetting: () => null,
});
export default AuthContext;
