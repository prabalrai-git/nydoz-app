import { useContext } from "react";
import AuthContext from "./auth/AuthContext";

const useWebSetting = () => {
    const { webSetting, dispatchWebSetting } = useContext(AuthContext);
    return { webSetting, dispatchWebSetting };
};

export default useWebSetting;
