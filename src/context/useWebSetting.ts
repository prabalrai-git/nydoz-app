import { useContext } from "react";
import AuthContext from "./auth/AuthContext";

const useAuthContext = () => {
    const { webSetting, dispatchWebSetting } = useContext(AuthContext);
    return { webSetting, dispatchWebSetting };
};

export default useAuthContext;
