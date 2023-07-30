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

        default:
            return state;
    }
};

export default webSettingReducer;
