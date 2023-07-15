import { TAction, IState } from "./types";

const authReducer = (state: IState, action: TAction): IState => {
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
            };
        case "LOGOUT":
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
