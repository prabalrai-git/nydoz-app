import { TAction, IState } from "./types";

const authReducer = (state: IState, action: TAction): IState => {
    const handleLogout = () => {
        console.log("logout");
        localStorage.removeItem("token");
    };
    const handleuserInfo = () => {
        console.log("set user info", state);
    };
    const handleCompanyInfo = () => {
        console.log("set companyinfo", state);
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
            handleuserInfo();

            return {
                ...state,
                userInfo: action.payload.userInfo,
                isLoggedIn: action.payload.isLoggedIn,
                token: action.payload.token,
            };

        case "SET_COMPANY_INFO":
            handleCompanyInfo();
            return {
                ...state,
                userInfo: state.userInfo,
                companyInfo: action.payload.companyInfo,
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
