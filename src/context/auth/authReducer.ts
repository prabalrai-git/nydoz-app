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
            // console.log("SET_USER_INFO", action.payload);

            return {
                ...state,
                userInfo: action.payload.userInfo,
                isLoggedIn: action.payload.isLoggedIn,
                token: action.payload.token,
            };

        case "SET_COMPANY_INFO":
            // console.log("SET_COMPANY_INFO", action.payload);
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
            };
        default:
            return state;
    }
};

export default authReducer;
