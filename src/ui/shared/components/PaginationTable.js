import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { flexRender, getCoreRowModel, useReactTable, } from "@tanstack/react-table";
import { Spinner } from "react-bootstrap";
import NotFound from "../molecules/NotFound";
// props required
function PaginatedTanStackTable(props) {
    const { columns, data, pagination, isLoading, setFetchAgain, baseUrl, setFetchUrl, } = props;
    // page=1&page_size=5
    const [paginationState, setPaginationState] = useState(pagination);
    const noOfPages = useMemo(() => {
        if (pagination?.total === undefined || pagination?.total === 0)
            return 0;
        return Math.ceil(pagination.total / pagination.per_page);
    }, [pagination.total, pagination.per_page]);
    const handlePrevious = (currentPage) => {
        if (currentPage === 1)
            return;
        setPaginationState((prevState) => ({
            ...prevState,
            currentPage: currentPage - 1,
        }));
        const newUrl = `${baseUrl}?page=${currentPage - 1}&page_size=${paginationState.per_page}`;
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("page", (currentPage - 1).toString());
        searchParams.set("page_size", paginationState.per_page.toString());
        window.history.replaceState(null, "", `${window.location.pathname}?${searchParams.toString()}`);
        setFetchUrl(newUrl);
        setFetchAgain(true);
    };
    const handleNext = (currentPage) => {
        if (currentPage === pagination?.last_page)
            return;
        setPaginationState((prevState) => ({
            ...prevState,
            currentPage: currentPage + 1,
        }));
        const newUrl = `${baseUrl}?page=${currentPage + 1}&page_size=${paginationState.per_page}`;
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("page", (currentPage + 1).toString());
        searchParams.set("page_size", paginationState.per_page.toString());
        window.history.replaceState(null, "", `${window.location.pathname}?${searchParams.toString()}`);
        setFetchUrl(newUrl);
        setFetchAgain(true);
    };
    const changePage = (pageNumber) => {
        setPaginationState((prevState) => ({
            ...prevState,
            currentPage: pageNumber,
        }));
        const newUrl = `${baseUrl}?page=${pageNumber}&page_size=${paginationState.per_page}`;
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("page", pageNumber.toString());
        searchParams.set("page_size", paginationState.per_page.toString());
        window.history.replaceState(null, "", `${window.location.pathname}?${searchParams.toString()}`);
        setFetchUrl(newUrl);
        setFetchAgain(true);
    };
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    return (_jsxs("div", { className: " ", children: [data && data?.length > 0 && (_jsxs("div", { className: "min-h-50vh block max-w-full overflow-x-scroll overflow-y-hidden p-6", children: [_jsxs("div", { className: "d-flex justify-content-between tw-mb-2 ", children: [_jsx("div", { className: "flex-1 " }), _jsxs("ul", { className: "pagination ", children: [_jsx("li", { className: pagination.current_page === 1
                                            ? "page-item previous disabled"
                                            : "page-item previous", children: _jsxs("button", { onClick: () => handlePrevious(pagination.current_page), className: "page-link", children: [_jsx("i", { className: "previous" }), _jsx("span", { className: "mx-2", children: "prev" })] }) }), Array.from(Array(noOfPages).keys()).map((_item, index) => (_jsx("li", { className: "page-item", children: _jsx("button", { onClick: () => changePage(index + 1), className: pagination.current_page === index + 1
                                                ? "page-link active "
                                                : "page-link ", children: index + 1 }) }, index + 1))), _jsx("li", { className: pagination.per_page * pagination.current_page >=
                                            pagination.total
                                            ? "page-item next disabled"
                                            : "page-item next", children: _jsxs("button", { onClick: () => handleNext(pagination.current_page), className: "page-link", children: [_jsx("span", { className: "mx-2", children: "next" }), _jsx("i", { className: "next" })] }) })] })] }), _jsxs("table", { className: "table align-middle table-row-dashed fs-6 gy-5 dataTable  ", children: [_jsx("thead", { children: table.getHeaderGroups().map((headerGroup) => (_jsx("tr", { className: "text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0", children: headerGroup.headers.map((header) => {
                                        return (_jsxs("th", { colSpan: header.colSpan, children: [header.isPlaceholder
                                                    ? null
                                                    : flexRender(header.column.columnDef.header, header.getContext()), header.column.getCanResize() && (_jsx("div", { onMouseDown: header.getResizeHandler(), onTouchStart: header.getResizeHandler() }))] }, header.id));
                                    }) }, headerGroup.id))) }), _jsx("tbody", { className: "fw-semibold text-gray-600 min-h-50vh", children: isLoading ? (_jsx("div", { className: "d-flex h-75vh flex-center", children: _jsx(Spinner, {}) })) : (_jsx(_Fragment, { children: table.getRowModel().rows.map((row) => {
                                        return (_jsx("tr", { children: row.getVisibleCells().map((cell) => {
                                                return (_jsx("td", { children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id));
                                            }) }, row.id));
                                    }) })) })] })] })), data?.length === 0 && isLoading === false && (_jsx(NotFound, { title: "No data found" }))] }));
}
export default PaginatedTanStackTable;
