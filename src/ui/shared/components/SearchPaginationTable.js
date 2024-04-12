import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { flexRender, getCoreRowModel, useReactTable, } from "@tanstack/react-table";
import { Spinner } from "react-bootstrap";
import NotFound from "../molecules/NotFound";
import { capitalizeText } from "../../../functions/TextMuatations";
// props required
function PaginatedTanStackTable(props) {
    const { columns, data, pagination, isLoading, setFetchAgain, baseUrl, setFetchUrl, searchParamsArray, } = props;
    // page=1&page_size=5
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    const [searchState, setSearchState] = useState({});
    const getQueryParams = () => {
        const query = new URLSearchParams(window.location.search);
        const queryObject = {};
        query.forEach((value, key) => {
            queryObject[key] = value;
        });
        return queryObject;
    };
    const setQueryParams = (queryParams) => {
        const searchParams = new URLSearchParams(window.location.search);
        Object.keys(queryParams).forEach((key) => {
            searchParams.set(key, queryParams[key]);
        });
        window.history.replaceState(null, "", `${window.location.pathname}?${searchParams.toString()}`);
        return searchParams;
    };
    useEffect(() => { }, [pagination]);
    useEffect(() => {
        const query = getQueryParams();
        if (Object.keys(query).length === 0) {
            setSearchState({
                page: pagination.current_page.toString(),
                page_size: pagination.per_page.toString(),
            });
            window.history.replaceState(null, "", `${window.location.pathname}?page=${pagination.current_page.toString()}&page_size=${pagination.per_page.toString()} `);
        }
        else {
            setSearchState(getQueryParams());
            const newUrl = `${baseUrl}${window.location.search}`;
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
    const handlePrevious = (currentPage) => {
        if (currentPage === 1)
            return;
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
    const handleNext = (currentPage) => {
        if (currentPage === pagination?.last_page)
            return;
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
    const changePage = (pageNumber) => {
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
        if (JSON.stringify({
            page: pagination.current_page.toString(),
            page_size: pagination.per_page.toString(),
        }) === JSON.stringify(searchState))
            return;
        setSearchState({
            page: pagination.current_page.toString(),
            page_size: pagination.per_page.toString(),
        });
        window.history.replaceState(null, "", `${window.location.pathname}?page=${pagination.current_page.toString()}&page_size=${pagination.per_page.toString()} `);
        const newUrl = `${baseUrl}`;
        setFetchUrl(newUrl);
        setFetchAgain(true);
    };
    const handlePageSizeChange = (e) => {
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
    return (_jsxs("div", { className: "search-table-container", children: [data && data?.length > 0 && (_jsxs("div", { className: "min-h-50vh block max-w-full overflow-x-scroll overflow-y-hidden p-6", children: [_jsx("div", { className: searchParamsArray.length > 1
                            ? "col-12 col-md-12"
                            : "col-12 col-md-6 ", children: _jsxs("div", { className: "input-group mb-3", children: [_jsx("span", { onClick: handleReset, className: "input-group-text", id: "basic-addon1", children: "Reset" }), searchParamsArray.map((item, index) => (_jsx("input", { onChange: (e) => setSearchState({
                                        ...searchState,
                                        [item]: e.target.value,
                                    }), value: searchState[item] ?? "", type: "text", className: "form-control form-control-sm placeholder-hover", placeholder: capitalizeText(item.replace(/_/g, " ")) }, index))), _jsx("span", { onClick: handleSearch, className: "btn btn-info btn-sm input-group-text", children: _jsx("i", { className: "bi bi-search" }) })] }) }), _jsxs("div", { className: "d-flex justify-content-between ", children: [_jsx("div", { className: "flex-2", children: _jsxs("select", { value: pagination.per_page, className: "form-select form-select-sm", onChange: (e) => handlePageSizeChange(e), children: [_jsx("option", { value: "5", children: "15" }), _jsx("option", { value: "10", children: "10" }), _jsx("option", { value: "20", children: "20" })] }) }), _jsx("div", { className: "flex-1", children: _jsxs("h6", { className: "bg-light text-info py-2", children: [_jsxs("span", { children: [" Showing :", pagination?.from ?? "N/A"] }), _jsxs("span", { className: "mx-3", children: ["to :", pagination?.to ?? "N/A"] }), _jsxs("span", { children: ["of total :", pagination?.total, " entries."] })] }) }), _jsxs("ul", { className: "pagination ", children: [_jsx("li", { className: pagination.current_page === 1
                                            ? "page-item previous disabled"
                                            : "page-item previous", children: _jsxs("button", { onClick: () => handlePrevious(pagination.current_page), className: "page-link", children: [_jsx("i", { className: "previous" }), _jsx("span", { className: "mx-2", children: "prev" })] }) }), Array.from(Array(noOfPages).keys()).map((_item, index) => (_jsx("li", { className: "page-item", children: _jsx("button", { onClick: () => changePage(index + 1), className: pagination.current_page === index + 1
                                                ? "page-link active "
                                                : "page-link ", children: index + 1 }) }, index + 1))), _jsx("li", { className: pagination.per_page * pagination.current_page >=
                                            pagination.total
                                            ? "page-item next disabled"
                                            : "page-item next", children: _jsxs("button", { onClick: () => handleNext(pagination.current_page), className: "page-link", children: [_jsx("span", { className: "mx-2", children: "next" }), _jsx("i", { className: "next" })] }) })] })] }), _jsxs("table", { className: "table align-middle table-row-dashed fs-6  dataTable  ", children: [_jsx("thead", { children: table.getHeaderGroups().map((headerGroup) => (_jsx("tr", { className: "text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0", children: headerGroup.headers.map((header) => {
                                        return (_jsxs("th", { colSpan: header.colSpan, children: [header.isPlaceholder
                                                    ? null
                                                    : flexRender(header.column.columnDef.header, header.getContext()), header.column.getCanResize() && (_jsx("div", { onMouseDown: header.getResizeHandler(), onTouchStart: header.getResizeHandler() }))] }, header.id));
                                    }) }, headerGroup.id))) }), _jsx("tbody", { className: "fw-semibold text-gray-600 min-h-50vh search-table-body", children: isLoading ? (_jsx("span", { className: "d-flex h-75vh flex-center", children: _jsx(Spinner, {}) })) : (_jsx(_Fragment, { children: table.getRowModel().rows.map((row) => {
                                        return (_jsx("tr", { children: row.getVisibleCells().map((cell) => {
                                                return (_jsx("td", { children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id));
                                            }) }, row.id));
                                    }) })) })] })] })), data?.length === 0 && isLoading === false && (_jsx(NotFound, { title: "No data found" }))] }));
}
export default PaginatedTanStackTable;
