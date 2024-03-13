import { Dispatch, createContext } from "react";
import { IState, TAction, IWebSetting } from "./types";

export interface AuthContextValue {
  auth: IState;
  dispatch: Dispatch<TAction>;
  webSetting: IWebSetting;
  dispatchWebSetting: Dispatch<TAction>;
}

const AuthContext = createContext<AuthContextValue>({
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
