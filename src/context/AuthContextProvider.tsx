import React, { FC, useState, useEffect, useMemo } from "react";
import Spinner from "react-bootstrap/Spinner";

import {
    AuthContext,
    AuthContextProps,
    ILoginResponse,
    IUserState,
} from "../context/AuthContext";
import useFetch from "../hooks/useFetch";
import API_ROUTE from "../service/api";

interface IUseMeData {
    city: string;
    country: string;
    country_calling_code: string;
    email: string;
    first_name: string;
    id: string;
    last_name: string;
    mobile: string;
    postal_code: string;
    profile_picture: string;
    secondary_email: string;
    state: string;
    status: null;
    status_id: number;
    street_address: string;
}

const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const { fetchData } = useFetch<IUseMeData>(API_ROUTE.LOGGED_IN_USER, true);

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
    const [showSplashScreen, setShowSplashScreen] = useState(true);

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
        console.log(token, "saved token");

        return true;
    };

    const handleAuthenticationFn = async () => {
        const response = await fetchData();
        // console.log(response, "response");

        try {
            if (response?.status === 200) {
                const { id, email, first_name, last_name, mobile } =
                    response.data.payload;

                const user: IUserState = {
                    id,
                    email,
                    email_verified_at: null,
                    first_name,
                    last_name,
                    mobile,
                    mobile_verified_at: null,
                    isAdmin: false,
                    permissions: [],
                };
                setUserInfo(user);
                setToken(token);
            }
        } catch (error) {
            logoutFn();
        } finally {
            setShowSplashScreen(false);
        }
    };

    useEffect(() => {
        console.log(token, "Effect token");
        if (token) {
            handleAuthenticationFn();
        } else {
            logoutFn();
            setShowSplashScreen(false);
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
            {!showSplashScreen ? (
                children
            ) : (
                <Spinner size='sm' animation='border' role='status'></Spinner>
            )}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
