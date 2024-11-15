import { ColumnDef } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";

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
  meta_data: {
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
  data: T[] | undefined;
  setPage: Dispatch<SetStateAction<number>>;
  setPageSize: Dispatch<SetStateAction<number>>;
  setFetchAgain: Dispatch<SetStateAction<boolean>>;
  pagination?: IPagination;
}

export interface IPaginatedTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  baseUrl: string;
  setFetchUrl: (fetchUrl: string) => void;
  pagination: IPagination;
  isLoading: boolean;
  setFetchAgain: (fetchAgain: boolean) => void;
}

export interface ISearchPaginatedTableProps<T> extends IPaginatedTableProps<T> {
  searchParamsArray: string[];
}

export interface ISearchPaginationListProps<T> {
  columns: ColumnDef<T>[];
  baseUrl: string;
  searchParamsArray: string[];
}
