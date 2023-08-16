import { IUserCompanyProductsResponse } from "../../types/payload.type";

export interface IUserInfo {
    id: string | null;
    email: string;
    email_verified_at: unknown;
    first_name: string;
    last_name: string;
    mobile: string;
    mobile_verified_at: unknown;
    isAdmin: boolean;
    permissions: string[];
}

export interface ICompanyInfo {
    id: string | undefined;
    name: string;
    subdomain: string;
    company_owner_id: string;
    status_id: string;
}

export interface IState {
    isLoggedIn: boolean;
    token: string | null;
    userInfo: undefined | IUserInfo;
    companyInfo: undefined | ICompanyInfo;
    isAdmin: boolean;
    isCompanyOwner: boolean;
    subdomain: string | undefined;
    userCompanyAndItsProducts: IUserCompanyProductsResponse | undefined;
}

export interface IWebSetting {
    showProductSidebar: boolean;
    showProductSidebarApp: boolean;
    showCompanySidebar: boolean;
    urlData: {
        url: string;
        subdomain: string;
        path: string;
        hasSubdomain: boolean;
    };
}

export type TAction =
    | { type: "LOGIN"; payload: { userInfo: IUserInfo; token: string } }
    | { type: "SET_TOKEN"; payload: { token: string | null } }
    | {
          type: "SET_USER_INFO";
          payload: {
              userInfo: IUserInfo;
              isLoggedIn: boolean;
              token: string | null;
          };
      }
    | {
          type: "SET_COMPANY_INFO";
          payload: { companyInfo: ICompanyInfo; isCompanyOwner: boolean };
      }
    | { type: "LOGOUT" }
    | { type: "TOGGLE_PRODUCT_SIDEBAR" }
    | { type: "TOGGLE_COMPANY_SIDEBAR" }
    | {
          type: "SET_PRODUCT_SIDEBAR";
          payload: { showProductSidebar: boolean };
      }
    | { type: "TOGGLE_PRODUCT_SIDEBAR_APP" }
    | {
          type: "SET_PRODUCT_SIDEBAR_APP";
          payload: { showProductSidebarApp: boolean };
      }
    | {
          type: "SET_URL_DATA";
          payload: { urlData: IWebSetting["urlData"] };
      }
    | {
          type: "SET_WINDOW_SIZE";
          payload: { windowWidthSize: number };
      }
    | {
          type: "SET_USER_COMPANY_AND_PRODUCTS";
          payload: {
              userCompanyAndItsProduct: IUserCompanyProductsResponse;
          };
      };
