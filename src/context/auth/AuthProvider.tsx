import React, { FC, useReducer, useState, useEffect, useCallback } from "react";
import authReducer from "./authReducer";
import AuthContext from "./AuthContext";
import { IState, IWebSetting } from "./types";
import useFetch from "../../hooks/useFetch";
import API_ROUTE from "../../service/api";
import LoadingPage from "../../ui/features/utils/LoadingPage";
import { toast } from "react-toastify";
import webSettingReducer from "./webSettingReducer";
import { useWindowSize } from "usehooks-ts";

const intialState: IState = {
    isLoggedIn: false,
    userInfo: undefined,
    companyInfo: undefined,
    token: null,
    isAdmin: false,
    isCompanyOwner: false,
    subdomain: undefined,
};

interface IUseMeData {
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

const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const tokenFromLocal =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token") ||
        null;
    // const [token, setToken] = useState<string | null>(tokenFromLocal);
    const { width } = useWindowSize();
    const [showSplashScreen, setShowSplashScreen] = useState<boolean>(true);
    const [state, dispatch] = useReducer(authReducer, intialState);
    const { fetchData } = useFetch<IUseMeData>(API_ROUTE.LOGGED_IN_USER, true);
    const [webSetting, dispatchWebSetting] = useReducer(webSettingReducer, {
        showProductSidebar: width > 768 ? true : false,
        showProductSidebarApp: false,
    });

    const handleAuthenticationFn = useCallback(async () => {
        setShowSplashScreen(true);
        try {
            const response = await fetchData();

            if (response?.data?.payload) {
                const userResponseObj = response?.data?.payload;
                const userInfo = {
                    id: userResponseObj?.id,
                    email: userResponseObj?.email,
                    email_verified_at: userResponseObj?.email_verified_at,
                    first_name: userResponseObj?.first_name,
                    last_name: userResponseObj?.last_name,
                    mobile: userResponseObj?.mobile,
                    mobile_verified_at: userResponseObj?.mobile_verified_at,
                    isAdmin: userResponseObj?.isAdmin,
                    permissions: userResponseObj?.permissions,
                } as IUseMeData;
                dispatch({
                    type: "SET_USER_INFO",
                    payload: {
                        userInfo,
                        token: tokenFromLocal,
                        isLoggedIn: true,
                    },
                });
            }
        } catch (error) {
            // console.log(error, "error in auth provider");
            toast.error("Something went wrong");
            dispatch({
                type: "LOGOUT",
            });
        } finally {
            setShowSplashScreen(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tokenFromLocal]);

    useEffect(() => {
        if (tokenFromLocal) {
            handleAuthenticationFn();
        } else {
            setShowSplashScreen(false);
        }
    }, [handleAuthenticationFn, tokenFromLocal]);

    return (
        <AuthContext.Provider
            value={{ state, dispatch, webSetting, dispatchWebSetting }}>
            {showSplashScreen ? <LoadingPage /> : children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
