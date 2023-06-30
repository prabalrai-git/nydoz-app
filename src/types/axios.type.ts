export interface IResponse<T> {
    message: string;
    payload: T;
    status: string;
}

export interface IData<T> {
    debug: unknown;
    message: string;
    payload: T | undefined;
    status: string;
}

export interface IErrorData {
    code: number;
    message: string;
    status: string;
}
