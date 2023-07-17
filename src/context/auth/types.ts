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
}

export type TAction =
    | { type: "LOGIN"; payload: { userInfo: IUserInfo; token: string } }
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
    | { type: "LOGOUT" };
