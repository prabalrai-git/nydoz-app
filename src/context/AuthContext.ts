import { createContext } from "react";

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
