import { TAction, IState } from "./types";

const authReducer = (state: IState, action: TAction): IState => {
    const handleLogout = () => {
        // console.log("logout");
        localStorage.removeItem("token");
        localStorage.removeItem("rememberMe");
    };

    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                userInfo: action.payload.userInfo,
                token: action.payload.token,
                isLoggedIn: true,
            };
        case "SET_USER_INFO":
            return {
                ...state,
                userInfo: action.payload.userInfo,
                isLoggedIn: action.payload.isLoggedIn,
                token: action.payload.token,
            };

        case "SET_TOKEN":
            return {
                ...state,
                token: action.payload.token,
            };
        case "SET_USER_COMPANY_AND_PRODUCTS":
            return {
                ...state,
                userInfo: state.userInfo,
                userCompanyAndItsProducts:
                    action.payload.userCompanyAndItsProduct,
            };

        case "SET_COMPANY_INFO":
            return {
                ...state,
                companyInfo: action.payload.companyInfo,
                isCompanyOwner: action.payload.isCompanyOwner,
            };
        case "LOGOUT":
            handleLogout();
            return {
                ...state,
                isLoggedIn: false,
                userInfo: undefined,
                token: null,
                isAdmin: false,
                isCompanyOwner: false,
                companyInfo: undefined,
                subdomain: undefined,
                userCompanyAndItsProducts: undefined,
            };
        default:
            return state;
    }
};

export default authReducer;
