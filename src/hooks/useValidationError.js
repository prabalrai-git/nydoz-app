import { useEffect } from "react";
function useValidationError({ errList, setError, }) {
    useEffect(() => {
        if (errList) {
            Object.keys(errList).forEach((fieldName) => {
                const errorMessages = errList[fieldName];
                setError(fieldName, {
                    type: "server",
                    message: errorMessages[0],
                });
            });
        }
    }, [errList, setError]);
}
export default useValidationError;
