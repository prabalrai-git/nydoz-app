import React, { FC, useState, useEffect, useMemo } from "react";
import {
    AuthContext,
    AuthContextProps,
    ILoginResponse,
    IUserState,
} from "../context/AuthContext";
import useFetch from "../hooks/useFetch";
import API_ROUTE from "../service/api";

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
            localStorage.setItem("token", token);
        } else {
            sessionStorage.setItem("token", token);
        }
        return true;
    };

    const handleAuthenticationFn = async () => {
        const response = await fetchData();
        if (response?.data) {
            const { user, token } = response.data;
            setUserInfo(user);
            setToken(token);
        }
        return true;
    };

    useEffect(() => {
        if (token) {
            handleAuthenticationFn();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
        handleAuthenticationFn,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
