import React, { FC, createContext, useState, useEffect, useMemo } from "react";
import useFetch from "../hooks/useFetch";
import API_ROUTE from "../service/api";

// email: "rahul@sabkura.com";
// email_verified_at: null;
// first_name: "Rahul";
// id: "99823f98-8a1c-4e4e-bb2b-176ca103a262";
// last_name: "Prasad";
// mobile: "9819828300";
// mobile_verified_at: null;

interface IUserState {
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

interface ILoginResponse {
    user: IUserState;
    token: string;
}

interface AuthContextProps {
    userInfo: IUserState | undefined;
    token: string | null;
    loginFn: (
        userDataFromLogin: ILoginResponse,
        rememberMe: boolean
    ) => boolean;
    logoutFn: () => boolean;
}

export const AuthContext = createContext<AuthContextProps>({
    userInfo: {
        id: null,
        email: "",
        email_verified_at: null,
        first_name: "",
        last_name: "",
        mobile: "",
        mobile_verified_at: null,
        isAdmin: false,
        permissions: [],
    },
    token: null,
    loginFn: () => false,
    logoutFn: () => false,
});

const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const { fetchData } = useFetch<ILoginResponse>(
        API_ROUTE.LOGGED_IN_USER,
        true
    );

    const userInitialState = useMemo<IUserState>(() => {
        return {
            id: null,
            email: "",
            email_verified_at: null,
            first_name: "",
            last_name: "",
            mobile: "",
            mobile_verified_at: null,
            isAdmin: false,
            permissions: [],
        };
    }, []);

    const tokenFromLocal =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token") ||
        null;

    const [token, setToken] = useState<string | null>(tokenFromLocal);
    const [userInfo, setUserInfo] = useState<IUserState | undefined>();

    const loginFn = (
        userDataFromLogin: ILoginResponse,
        rememberMe: boolean
    ) => {
        const { user, token } = userDataFromLogin;
        setUserInfo(user);
        localStorage.setItem("rememberMe", rememberMe.toString());
        setToken(token);
        if (rememberMe) {
            localStorage.setItem("token", JSON.stringify(token));
        } else {
            sessionStorage.setItem("token", JSON.stringify(token));
        }
        return true;
    };

    useEffect(() => {
        const isLoggedIn = async () => {
            const response = await fetchData();
            if (response) {
                const { user, token } = response.data;
                setUserInfo(user);
                setToken(token);
            }
        };

        if (token) {
            isLoggedIn();
        } else {
            setUserInfo(userInitialState);
        }
    }, [fetchData, token, userInitialState]);

    const logoutFn = () => {
        const rememberMeFromLocal = localStorage.getItem("rememberMe");
        if (rememberMeFromLocal) {
            localStorage.removeItem("token");
        } else {
            sessionStorage.removeItem("token");
        }
        setToken(null);
        setUserInfo(userInitialState);
        localStorage.removeItem("rememberMe");
        return true;
    };

    const authContextValue: AuthContextProps = {
        userInfo,
        token,
        loginFn,
        logoutFn,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
