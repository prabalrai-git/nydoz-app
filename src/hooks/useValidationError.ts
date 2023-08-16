import { useEffect } from "react";

import { FieldValues, UseFormSetError } from "react-hook-form";

interface IErrorList {
    [key: string]: string[];
}

// interface IUseValidationError<T> {
//     errList:  Record<string, string[]> | undefined
//     setError: UseFormSetError;
// }

interface IUseValidationError<T extends FieldValues> {
    errList?: IErrorList;
    setError: UseFormSetError<T>;
}

function useValidationError<T extends FieldValues>({
    errList,
    setError,
}: IUseValidationError<T>) {
    useEffect(() => {
        if (errList) {
            Object.keys(errList).forEach((fieldName) => {
                const errorMessages = errList[fieldName];
                setError(fieldName as string as "root", {
                    type: "server",
                    message: errorMessages[0],
                });
            });
        }
    }, [errList, setError]);
}

export default useValidationError;
