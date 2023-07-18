import { useEffect } from "react";
import { toast } from "react-toastify";

function useHandleShowError(error: string | null) {
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);
}

export default useHandleShowError;
