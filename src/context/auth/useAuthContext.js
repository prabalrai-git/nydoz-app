import { useContext } from "react";
import AuthContext from "./AuthContext";
const useAuthContext = () => {
    const { dispatch, auth } = useContext(AuthContext);
    return { ...auth, dispatch };
};
export default useAuthContext;
