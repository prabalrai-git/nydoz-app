import { useMemo, useState } from "react";

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { IPaginatedTableProps, IPagination } from "../../../types/axios.type";
import { Spinner } from "react-bootstrap";

// props required

function TanStackTable<T>(props: IPaginatedTableProps<T>) {
    const {
        columns,
        data,
        pagination,
        isLoading,
        setFetchAgain,
        baseUrl,
        setFetchUrl,
    } = props;
    // page=1&page_size=5

    const [paginationState, setPaginationState] =
        useState<IPagination>(pagination);

    const noOfPages = useMemo(() => {
        if (pagination.total === 0) return 0;
        return Math.ceil(pagination.total / pagination.per_page);
    }, [pagination.total, pagination.per_page]);

    const handlePrevious = () => {
        if (paginationState.current_page === 1) return;
        setPaginationState((prevState) => ({
            ...prevState,
            currentPage: prevState.current_page - 1,
        }));
        const newUrl = `${baseUrl}?page=${
            paginationState.current_page - 1
        }&page_size=${paginationState.per_page}`;
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("page", (paginationState.current_page - 1).toString());
        searchParams.set("page_size", paginationState.per_page.toString());
        window.history.replaceState(
            null,
            "",
            `${window.location.pathname}?${searchParams.toString()}`
        );
        setFetchUrl(newUrl);
        setFetchAgain(true);
    };

    const handleNext = () => {
        if (paginationState.current_page === pagination?.last_page) return;
        setPaginationState((prevState) => ({
            ...prevState,
            currentPage: prevState.current_page + 1,
        }));
        const newUrl = `${baseUrl}?page=${
            paginationState.current_page + 1
        }&page_size=${paginationState.per_page}`;

        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("page", (paginationState.current_page + 1).toString());
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
        const newUrl = `${baseUrl}?page=${pageNumber}&page_size=${paginationState.per_page}`;
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("page", pageNumber.toString());
        searchParams.set("page_size", paginationState.per_page.toString());
        window.history.replaceState(
            null,
            "",
            `${window.location.pathname}?${searchParams.toString()}`
        );
        setFetchUrl(newUrl);
        setFetchAgain(true);
    };

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className='border '>
            {data && data?.length > 0 && (
                <div className='min-h-50vh block max-w-full overflow-x-scroll overflow-y-hidden p-6'>
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
                                    onClick={handlePrevious}
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
                            <li className='page-item next'>
                                <button
                                    onClick={handleNext}
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
        </div>
    );
}

export default TanStackTable;
