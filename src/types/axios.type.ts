import { ColumnDef } from "@tanstack/react-table";

export interface IResponse<T> {
    message: string;
    payload: T;
    status: string;
    meta_data?: {
        pagination: IPagination;
    };
}

export interface IData<T> {
    debug: unknown;
    message: string;
    payload: T | undefined;
    status: string;
    meta_data?: {
        pagination: IPagination;
    };
}

export interface IErrorData {
    code: number;
    errors?: Record<string, string[]>;
    message: string;
    status: string;
}

export interface IPagination {
    total: number;
    per_page: number;
    last_page: number;
    current_page: number;
    from: number;
    to: number;
}

export interface ITableProps<T> {
    columns: ColumnDef<T>[];
    data: T[];
}
