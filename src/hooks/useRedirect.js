import { useEffect } from "react";
import { redirect } from "react-router-dom";
function useRedirect(props) {
    const { path } = props;
    useEffect(() => {
        redirect(path);
    }, []);
    return null;
}
export default useRedirect;
