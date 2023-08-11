import { useContext } from "react";
import AuthContext from "./auth/AuthContext";

const useWebSetting = () => {
    const { webSetting, dispatchWebSetting } = useContext(AuthContext);
    const { urlData } = webSetting;
    const { subdomain, url, path, hasSubdomain } = urlData;

    return {
        webSetting,
        subdomain,
        url,
        path,
        hasSubdomain,
        dispatchWebSetting,
    };
};

export default useWebSetting;
