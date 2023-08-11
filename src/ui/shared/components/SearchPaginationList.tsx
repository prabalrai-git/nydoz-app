import { useEffect, useMemo, useState } from "react";

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ISearchPaginationListProps } from "../../../types/axios.type";
import { Spinner } from "react-bootstrap";
import NotFound from "../molecules/NotFound";
import { capitalizeText } from "../../../functions/TextMuatations";
import useFetch from "../../../hooks/useFetch";

interface SearchState {
    [key: string]: string;
}
// props required

function SearchPaginationList<T>(props: ISearchPaginationListProps<T>) {
    const { columns, baseUrl, searchParamsArray } = props;
    const [fetchUrl, setFetchUrl] = useState(baseUrl);
    const [tableData, setTableData] = useState<T[] | []>([]);
    const { fetchDataById, isloading, data, pagination } = useFetch<T[]>(
        fetchUrl,
        true
    );
    const [fetchAgain, setFetchAgain] = useState(false);

    useEffect(() => {
        if (fetchAgain) {
            fetchDataById(fetchUrl);
            setFetchAgain(false);
        }
    }, [fetchAgain, fetchDataById, fetchUrl]);

    useEffect(() => {
        if (data !== undefined && data.length > 0) {
            setTableData(data);
        }
    }, [data]);

    const table = useReactTable<T>({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
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
            setSearchState({
                page: pagination.current_page.toString(),
                page_size: pagination.per_page.toString(),
            });
            window.history.replaceState(
                null,
                "",
                `${
                    window.location.pathname
                }?page=${pagination.current_page.toString()}&page_size=${pagination.per_page.toString()} `
            );
            setFetchUrl(
                `${baseUrl}?page=${pagination.current_page.toString()}&page_size=${pagination.per_page.toString()}`
            );
            setFetchAgain(true);
        } else {
            setSearchState(getQueryParams());
            const newUrl = `${baseUrl}${window.location.search}`;
            console.log(newUrl, "sdsd");
            setFetchUrl(newUrl);
            setFetchAgain(true);
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

        setSearchState((prevState) => ({
            ...prevState,
            page: (currentPage - 1).toString(),
        }));

        const queryParams = {
            ...searchState,
            page: (currentPage - 1).toString(),
        };

        const searchParams = setQueryParams(queryParams);
        const newUrl = `${baseUrl}?${searchParams.toString()}`;

        setFetchUrl(newUrl);
        setFetchAgain(true);
    };

    const handleNext = (currentPage: number) => {
        if (currentPage === pagination?.last_page) return;

        setSearchState((prevState) => ({
            ...prevState,
            page: (currentPage + 1).toString(),
        }));

        const queryParams = {
            ...searchState,
            page: (currentPage + 1).toString(),
        };

        const searchParams = setQueryParams(queryParams);
        const newUrl = `${baseUrl}?${searchParams.toString()}`;

        setFetchUrl(newUrl);
        setFetchAgain(true);
    };

    const changePage = (pageNumber: number) => {
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
        const searchParams = setQueryParams({
            ...searchState,
            page: (1).toString(),
        });
        const newUrl = `${baseUrl}?${searchParams.toString()}`;
        setFetchUrl(newUrl);
        setFetchAgain(true);
    };

    const handleReset = () => {
        if (
            JSON.stringify({
                page: pagination.current_page.toString(),
                page_size: pagination.per_page.toString(),
            }) === JSON.stringify(searchState)
        )
            return;
        setSearchState({
            page: pagination.current_page.toString(),
            page_size: pagination.per_page.toString(),
        });
        window.history.replaceState(
            null,
            "",
            `${
                window.location.pathname
            }?page=${pagination.current_page.toString()}&page_size=${pagination.per_page.toString()} `
        );
        const newUrl = `${baseUrl}`;
        setFetchUrl(newUrl);
        setFetchAgain(true);
    };

    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchState((prevState) => ({
            ...prevState,
            page_size: e.target.value,
        }));

        const queryParams = {
            ...searchState,
            page_size: e.target.value,
        };

        const searchParams = setQueryParams(queryParams);
        const newUrl = `${baseUrl}?${searchParams.toString()}`;

        setFetchUrl(newUrl);
        setFetchAgain(true);
    };

    return (
        <div className='search-table-container'>
            {data && data?.length > 0 && (
                <div className='min-h-50vh block max-w-full overflow-x-scroll overflow-y-hidden p-6'>
                    <div
                        className={
                            searchParamsArray.length > 1
                                ? "col-12 col-md-12"
                                : "col-12 col-md-6 "
                        }>
                        <div className='input-group mb-3'>
                            <span
                                onClick={handleReset}
                                className='input-group-text'
                                id='basic-addon1'>
                                {/* <ArrowDownUp size={20} /> */}
                                Reset
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
                        <div className='flex-2'>
                            <select
                                value={pagination.per_page}
                                className='form-select form-select-sm'
                                onChange={(e) => handlePageSizeChange(e)}>
                                <option value='5'>15</option>
                                <option value='10'>10</option>
                                <option value='20'>20</option>
                            </select>
                        </div>
                        <div className='flex-1'>
                            <h6 className='bg-light text-info py-2'>
                                <span>
                                    {" "}
                                    Showing :{pagination?.from ?? "N/A"}
                                </span>
                                <span className='mx-3'>
                                    to :{pagination?.to ?? "N/A"}
                                </span>
                                <span>
                                    of total :{pagination?.total} entries.
                                </span>
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
                        <tbody className='fw-semibold text-gray-600 min-h-50vh search-table-body'>
                            {isloading ? (
                                <span className='d-flex h-75vh flex-center w-100'>
                                    <Spinner />
                                </span>
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
            {data?.length === 0 && isloading === false && (
                <NotFound title='No data found' />
            )}
        </div>
    );
}

export default SearchPaginationList;
