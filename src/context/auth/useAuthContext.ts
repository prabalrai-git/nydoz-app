import { useContext } from "react";
import AuthContext from "./AuthContext";

const useAuthContext = () => {
    const { dispatch, state } = useContext(AuthContext);
    return { ...state, dispatch };
};

export default useAuthContext;
