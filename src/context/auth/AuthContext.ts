import { Dispatch, createContext } from "react";
import { IState, TAction } from "./types";

export interface AuthContextValue {
    state: IState;
    dispatch: Dispatch<TAction>;
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
});

export default AuthContext;
