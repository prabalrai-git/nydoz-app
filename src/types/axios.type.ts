export interface IResponse<T> {
    message: string;
    payload: T;
    status: string;
}
