import { createContext } from "react";

// email: "rahul@sabkura.com";
// email_verified_at: null;
// first_name: "Rahul";
// id: "99823f98-8a1c-4e4e-bb2b-176ca103a262";
// last_name: "Prasad";
// mobile: "9819828300";
// mobile_verified_at: null;

export interface IUserState {
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

export interface ILoginResponse {
    user: IUserState;
    token: string;
}

export interface AuthContextProps {
    userInfo: IUserState | undefined;
    token: string | null;
    loginFn: (userDataFromLogin: ILoginResponse, rememberMe: boolean) => void;
    handleAuthenticationFn: () => void;
    logoutFn: () => void;
}

export const authContextDefaults: AuthContextProps = {
    userInfo: undefined,
    token: null,
    loginFn: () => null,
    handleAuthenticationFn: () => null,
    logoutFn: () => null,
};

export const AuthContext = createContext<AuthContextProps>(authContextDefaults);
