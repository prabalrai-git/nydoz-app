import { useEffect, useMemo, useState } from "react";

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    ISearchPaginatedTableProps,
    IPagination,
} from "../../../types/axios.type";
import { Spinner } from "react-bootstrap";
import NotFound from "../molecules/NotFound";
import { capitalizeText } from "../../../functions/TextMuatations";
import { ArrowDownUp } from "react-bootstrap-icons";

interface SearchState {
    [key: string]: string;
}
// props required

function PaginatedTanStackTable<T>(props: ISearchPaginatedTableProps<T>) {
    const {
        columns,
        data,
        pagination,
        isLoading,
        setFetchAgain,
        baseUrl,
        setFetchUrl,
        searchParamsArray,
    } = props;
    // page=1&page_size=5
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    const [paginationState, setPaginationState] =
        useState<IPagination>(pagination);
    const [searchState, setSearchState] = useState<SearchState>({});

    const getQueryParams = () => {
        const query = new URLSearchParams(window.location.search);
        const queryObject: SearchState = {};
        query.forEach((value, key) => {
            queryObject[key as string] = value;
        });
        return queryObject;
    };

    const setQueryParams = (queryParams: SearchState) => {
        const searchParams = new URLSearchParams(window.location.search);
        Object.keys(queryParams).forEach((key: string) => {
            searchParams.set(key, queryParams[key] as string);
        });
        window.history.replaceState(
            null,
            "",
            `${window.location.pathname}?${searchParams.toString()}`
        );
        return searchParams;
    };

    useEffect(() => {
        const query = getQueryParams();
        if (Object.keys(query).length === 0) {
            console.log(
                "query if",
                getQueryParams(),
                "searchState",
                searchState
            );
            setSearchState((prevState) => ({
                ...prevState,
                page: paginationState.current_page.toString(),
                page_size: paginationState.per_page.toString(),
            }));

            window.history.replaceState(
                null,
                "",
                `${window.location.pathname}?${query.toString()}`
            );
        } else {
            setSearchState(getQueryParams());
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const noOfPages = useMemo(() => {
        if (pagination?.total === undefined || pagination?.total === 0)
            return 0;
        return Math.ceil(pagination.total / pagination.per_page);
    }, [pagination.total, pagination.per_page]);

    const handlePrevious = (currentPage: number) => {
        if (currentPage === 1) return;

        setPaginationState((prevState) => ({
            ...prevState,
            currentPage: currentPage - 1,
        }));
        const newUrl = `${baseUrl}?page=${currentPage - 1}&page_size=${
            paginationState.per_page
        }`;
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("page", (currentPage - 1).toString());
        searchParams.set("page_size", paginationState.per_page.toString());
        window.history.replaceState(
            null,
            "",
            `${window.location.pathname}?${searchParams.toString()}`
        );
        setFetchUrl(newUrl);
        setFetchAgain(true);
    };

    const handleNext = (currentPage: number) => {
        if (currentPage === pagination?.last_page) return;
        setPaginationState((prevState) => ({
            ...prevState,
            currentPage: currentPage + 1,
        }));
        const newUrl = `${baseUrl}?page=${currentPage + 1}&page_size=${
            paginationState.per_page
        }`;

        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("page", (currentPage + 1).toString());
        searchParams.set("page_size", paginationState.per_page.toString());
        window.history.replaceState(
            null,
            "",
            `${window.location.pathname}?${searchParams.toString()}`
        );
        setFetchUrl(newUrl);
        setFetchAgain(true);
    };

    const changePage = (pageNumber: number) => {
        setPaginationState((prevState) => ({
            ...prevState,
            currentPage: pageNumber,
        }));

        setSearchState((prevState) => ({
            ...prevState,
            page: pageNumber.toString(),
        }));

        const queryParams = { ...searchState, page: pageNumber.toString() };
        const searchParams = setQueryParams(queryParams);
        const newUrl = `${baseUrl}?${searchParams.toString()}`;

        setFetchUrl(newUrl);
        setFetchAgain(true);
    };

    const handleSearch = () => {
        console.log(searchState, "searchState");
        const searchParams = setQueryParams(searchState);
        setFetchUrl(`${baseUrl}?${searchParams.toString()}`);
        setFetchAgain(true);
    };

    return (
        <div className='border '>
            {data && data?.length > 0 && (
                <div className='min-h-50vh block max-w-full overflow-x-scroll overflow-y-hidden p-6 '>
                    <div
                        className={
                            searchParamsArray.length > 1
                                ? "col-12 col-md-12"
                                : "col-12 col-md-6 "
                        }>
                        <div className='input-group mb-3'>
                            <span
                                className='input-group-text'
                                id='basic-addon1'>
                                <ArrowDownUp size={20} />
                            </span>
                            {searchParamsArray.map(
                                (item: string, index: number) => (
                                    <input
                                        key={index}
                                        onChange={(e) =>
                                            setSearchState({
                                                ...searchState,
                                                [item]: e.target.value,
                                            })
                                        }
                                        value={searchState[item] ?? ""}
                                        type='text'
                                        className='form-control form-control-sm placeholder-hover'
                                        placeholder={capitalizeText(
                                            item.replace(/_/g, " ")
                                        )}
                                    />
                                )
                            )}
                            <span
                                onClick={handleSearch}
                                className='btn btn-info btn-sm input-group-text'>
                                <i className='bi bi-search'></i>
                            </span>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between '>
                        <div className='flex-1'>
                            <h6 className='bg-light text-info py-2'>
                                <span>From :{pagination?.from ?? "N/A"}</span>
                                <span className='mx-3'>
                                    To :{pagination?.to ?? "N/A"}
                                </span>
                                <span>Total :{pagination?.total}</span>
                            </h6>
                        </div>
                        <ul className='pagination '>
                            <li
                                className={
                                    pagination.current_page === 1
                                        ? "page-item previous disabled"
                                        : "page-item previous"
                                }>
                                <button
                                    onClick={() =>
                                        handlePrevious(pagination.current_page)
                                    }
                                    className='page-link'>
                                    <i className='previous'></i>
                                    <span className='mx-2'>prev</span>
                                </button>
                            </li>
                            {Array.from(Array(noOfPages).keys()).map(
                                (_item: unknown, index: number) => (
                                    <li key={index + 1} className='page-item'>
                                        <button
                                            onClick={() =>
                                                changePage(index + 1)
                                            }
                                            className={
                                                pagination.current_page ===
                                                index + 1
                                                    ? "page-link active "
                                                    : "page-link "
                                            }>
                                            {index + 1}
                                        </button>
                                    </li>
                                )
                            )}
                            <li
                                className={
                                    pagination.per_page *
                                        pagination.current_page >=
                                    pagination.total
                                        ? "page-item next disabled"
                                        : "page-item next"
                                }>
                                <button
                                    onClick={() =>
                                        handleNext(pagination.current_page)
                                    }
                                    className='page-link'>
                                    <span className='mx-2'>next</span>
                                    <i className='next'></i>
                                </button>
                            </li>
                        </ul>
                    </div>

                    <table className='table align-middle table-row-dashed fs-6 gy-5 dataTable  '>
                        <thead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr
                                    className='text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0'
                                    key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <th
                                                key={header.id}
                                                colSpan={header.colSpan}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext()
                                                      )}
                                                {header.column.getCanResize() && (
                                                    <div
                                                        onMouseDown={header.getResizeHandler()}
                                                        onTouchStart={header.getResizeHandler()}></div>
                                                )}
                                            </th>
                                        );
                                    })}
                                </tr>
                            ))}
                        </thead>
                        <tbody className='fw-semibold text-gray-600 min-h-50vh'>
                            {isLoading ? (
                                <div className='d-flex h-75vh flex-center'>
                                    <Spinner />
                                </div>
                            ) : (
                                <>
                                    {table.getRowModel().rows.map((row) => {
                                        return (
                                            <tr key={row.id}>
                                                {row
                                                    .getVisibleCells()
                                                    .map((cell) => {
                                                        return (
                                                            <td key={cell.id}>
                                                                {flexRender(
                                                                    cell.column
                                                                        .columnDef
                                                                        .cell,
                                                                    cell.getContext()
                                                                )}
                                                            </td>
                                                        );
                                                    })}
                                            </tr>
                                        );
                                    })}
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
            {data?.length === 0 && isLoading === false && (
                <NotFound title='No data found' />
            )}
        </div>
    );
}

export default PaginatedTanStackTable;
