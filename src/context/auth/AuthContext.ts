import { Dispatch, createContext } from "react";
import { IState, TAction } from "./types";

interface IWebSetting {
    showProductSidebar: boolean;
    showProductSidebarApp: boolean;
}

export interface AuthContextValue {
    state: IState;
    dispatch: Dispatch<TAction>;
    webSetting: IWebSetting;
    dispatchWebSetting: Dispatch<TAction>;
}

const AuthContext = createContext<AuthContextValue>({
    state: {
        isLoggedIn: false,
        userInfo: undefined,
        companyInfo: undefined,
        token: null,
        isAdmin: false,
        isCompanyOwner: false,
        subdomain: undefined,
    },
    dispatch: () => null,
    webSetting: {
        showProductSidebar: true,
        showProductSidebarApp: false,
    },
    dispatchWebSetting: () => null,
});

export default AuthContext;
