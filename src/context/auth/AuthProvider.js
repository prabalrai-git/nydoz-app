import { jsx as _jsx } from "react/jsx-runtime";
import { useReducer, useState, useEffect, useCallback, useLayoutEffect, } from "react";
import authReducer from "./authReducer";
import AuthContext from "./AuthContext";
import useFetch from "../../hooks/useFetch";
import API_ROUTE from "../../service/api";
import LoadingPage from "../../ui/features/utils/LoadingPage";
import { toast } from "react-toastify";
import webSettingReducer from "./webSettingReducer";
import { getSubdomain } from "../../functions/getSubdomain";
const intialState = {
    isLoggedIn: false,
    userInfo: undefined,
    companyInfo: undefined,
    token: null,
    isAdmin: false,
    isCompanyOwner: false,
    subdomain: undefined,
    userCompanyAndItsProducts: undefined,
};
const AuthProvider = ({ children }) => {
    // const subdomainMain = getSubdomain();
    const tokenFromLocal = localStorage.getItem("token") || sessionStorage.getItem("token") || null;
    const [showSplashScreen, setShowSplashScreen] = useState(true);
    const [auth, dispatch] = useReducer(authReducer, intialState);
    const { fetchData } = useFetch(API_ROUTE.LOGGED_IN_USER, true);
    const { fetchDataById } = useFetch(API_ROUTE.GET_USER_COMPANY_AND_PRODUCTS, true);
    const [webSetting, dispatchWebSetting] = useReducer(webSettingReducer, {
        showProductSidebar: true,
        showProductSidebarApp: true,
        showCompanySidebar: true,
        urlData: {
            url: "",
            subdomain: "",
            path: "",
            hasSubdomain: false,
            protocol: "",
            domainBase: "",
        },
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
                };
                dispatch({
                    type: "SET_USER_INFO",
                    payload: {
                        userInfo,
                        token: tokenFromLocal,
                        isLoggedIn: true,
                    },
                });
            }
        }
        catch (error) {
            toast.error("Something went wrong");
            dispatch({
                type: "LOGOUT",
            });
        }
        finally {
            setShowSplashScreen(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tokenFromLocal]);
    const handleUserCompanyAndItsProducts = useCallback(async () => {
        try {
            const response = await fetchDataById(API_ROUTE.GET_USER_COMPANY_AND_PRODUCTS);
            if (response?.data?.payload) {
                const userCompanyProduct = response?.data?.payload;
                dispatch({
                    type: "SET_USER_COMPANY_AND_PRODUCTS",
                    payload: {
                        userCompanyAndItsProduct: userCompanyProduct,
                    },
                });
            }
        }
        catch (error) {
            toast.error("Something went wrong");
        }
    }, [fetchDataById]);
    useEffect(() => {
        if (tokenFromLocal) {
            handleAuthenticationFn();
            handleUserCompanyAndItsProducts();
        }
        else {
            setShowSplashScreen(false);
        }
    }, [handleAuthenticationFn, handleUserCompanyAndItsProducts, tokenFromLocal]);
    useLayoutEffect(() => {
        const subDomainInfo = getSubdomain();
        const hasSubdomain = subDomainInfo?.subDomain ? true : false;
        dispatchWebSetting({
            type: "SET_URL_DATA",
            payload: {
                urlData: {
                    url: window.location.href,
                    subdomain: subDomainInfo?.subDomain,
                    path: window.location.pathname,
                    hasSubdomain: hasSubdomain,
                    protocol: window.location.protocol,
                    domainBase: subDomainInfo?.domainBase,
                },
            },
        });
    }, []);
    return (_jsx(AuthContext.Provider, { value: { auth, dispatch, webSetting, dispatchWebSetting }, children: showSplashScreen ? _jsx(LoadingPage, {}) : children }));
};
export default AuthProvider;
