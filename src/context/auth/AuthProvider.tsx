import React, {
    FC,
    useReducer,
    useState,
    useEffect,
    useCallback,
    useLayoutEffect,
} from "react";
import authReducer from "./authReducer";
import AuthContext from "./AuthContext";
import { IState } from "./types";
import { IUserCompanyProductsResponse } from "../../types/payload.type";
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
    userCompanyAndItsProducts: undefined,
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
    const subdomainStr = "https://sabkura.app.dev.nydoz.com";
    const str = "https://app.dev.nydoz.com";
    const parts = str.split(".");

    console.log(parts, "parts");
    const tokenFromLocal =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token") ||
        null;
    // const [token, setToken] = useState<string | null>(tokenFromLocal);
    const { width } = useWindowSize();
    const [showSplashScreen, setShowSplashScreen] = useState<boolean>(true);
    const [auth, dispatch] = useReducer(authReducer, intialState);
    const { fetchData } = useFetch<IUseMeData>(API_ROUTE.LOGGED_IN_USER, true);
    const { fetchDataById } = useFetch<IUserCompanyProductsResponse>(
        API_ROUTE.GET_USER_COMPANY_AND_PRODUCTS,
        true
    );
    const [webSetting, dispatchWebSetting] = useReducer(webSettingReducer, {
        showProductSidebar: true,
        showProductSidebarApp: true,
        showCompanySidebar: true,
        urlData: {
            url: "",
            subdomain: "",
            path: "",
            hasSubdomain: false,
        },
    });

    const handleAuthenticationFn = useCallback(async () => {
        setShowSplashScreen(true);
        try {
            const response = await fetchData();
            console.log(response, "response in auth provider user auth");

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

    const handleUserCompanyAndItsProducts = useCallback(async () => {
        try {
            const response = await fetchDataById(
                API_ROUTE.GET_USER_COMPANY_AND_PRODUCTS
            );
            console.log(response, "response in auth provider user company");
            if (response?.data?.payload) {
                const userCompanyProduct = response?.data?.payload;
                dispatch({
                    type: "SET_USER_COMPANY_AND_PRODUCTS",
                    payload: {
                        userCompanyAndItsProduct: userCompanyProduct,
                    },
                });
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }, [fetchDataById]);

    useEffect(() => {
        if (tokenFromLocal) {
            handleAuthenticationFn();
            handleUserCompanyAndItsProducts();
        } else {
            setShowSplashScreen(false);
        }
    }, [
        handleAuthenticationFn,
        handleUserCompanyAndItsProducts,
        tokenFromLocal,
    ]);

    useLayoutEffect(() => {
        console.log("layout effect", width);
        let hasSubdomain = false;
        const subDomainName = window.location.hostname.split(".")[0];
        if (subDomainName && subDomainName !== "localhost") {
            hasSubdomain = true;
        }

        dispatchWebSetting({
            type: "SET_URL_DATA",
            payload: {
                urlData: {
                    url: window.location.href,
                    subdomain: window.location.hostname.split(".")[0],
                    path: window.location.pathname,
                    hasSubdomain: hasSubdomain,
                },
            },
        });
    }, []);

    return (
        <AuthContext.Provider
            value={{ auth, dispatch, webSetting, dispatchWebSetting }}>
            {showSplashScreen ? <LoadingPage /> : children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
