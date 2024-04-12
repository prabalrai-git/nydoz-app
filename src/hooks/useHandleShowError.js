import { useEffect } from "react";
import { toast } from "react-toastify";
function useHandleShowError(error) {
    useEffect(() => {
        if (error) {
            toast.error(error || "Something went wrong");
        }
    }, [error]);
}
export default useHandleShowError;
