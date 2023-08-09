import { TAction, IWebSetting } from "./types";

const webSettingReducer = (
    state: IWebSetting,
    action: TAction
): IWebSetting => {
    switch (action.type) {
        case "TOGGLE_PRODUCT_SIDEBAR":
            return {
                ...state,
                showProductSidebar: !state.showProductSidebar,
            };

        case "TOGGLE_PRODUCT_SIDEBAR_APP":
            return {
                ...state,
                showProductSidebarApp: !state.showProductSidebarApp,
            };
        case "TOGGLE_COMPANY_SIDEBAR":
            return {
                ...state,
                showCompanySidebar: !state.showCompanySidebar,
            };
        case "SET_PRODUCT_SIDEBAR":
            return {
                ...state,
                showProductSidebar: action.payload.showProductSidebar,
            };
        case "SET_PRODUCT_SIDEBAR_APP":
            return {
                ...state,
                showProductSidebarApp: action.payload.showProductSidebarApp,
            };
        case "SET_URL_DATA":
            return {
                ...state,
                urlData: action.payload.urlData,
            };

        default:
            return state;
    }
};

export default webSettingReducer;
