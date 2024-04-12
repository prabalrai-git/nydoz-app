import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { flexRender, getCoreRowModel, useReactTable, } from "@tanstack/react-table";
import { Spinner } from "react-bootstrap";
import { capitalizeText } from "../../../functions/TextMuatations";
import useFetch from "../../../hooks/useFetch";
import { IoSearch } from "react-icons/io5";
import { Pagination } from "antd";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
// props required
function SearchPaginationList(props) {
    const { columns, baseUrl, searchParamsArray } = props;
    const [fetchUrl, setFetchUrl] = useState(baseUrl);
    const [tableData, setTableData] = useState([]);
    const { isloading, data, pagination, fetchData, setPage, setPageSize } = useFetch(fetchUrl, true);
    const [fetchAgain, setFetchAgain] = useState(false);
    const handleRefresh = () => {
        setFetchAgain(true);
    };
    useEffect(() => {
        if (fetchAgain) {
            fetchData();
            setFetchAgain(false);
        }
    }, [fetchAgain, fetchData, fetchUrl]);
    useEffect(() => {
        if (data !== undefined && data.length > 0) {
            setTableData(data);
        }
    }, [data]);
    const table = useReactTable({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    const [searchState, setSearchState] = useState({});
    // const getQueryParams = () => {
    //   const query = new URLSearchParams(window.location.search);
    //   const queryObject: SearchState = {};
    //   query.forEach((value, key) => {
    //     queryObject[key as string] = value;
    //   });
    //   return queryObject;
    // };
    const setQueryParams = (queryParams) => {
        const searchParams = new URLSearchParams(window.location.search);
        Object.keys(queryParams).forEach((key) => {
            searchParams.set(key, queryParams[key]);
        });
        window.history.replaceState(null, "", `${window.location.pathname}?${searchParams.toString()}`);
        return searchParams;
    };
    useEffect(() => {
        // const query = getQueryParams();
        // if (Object.keys(query).length === 0) {
        //   setSearchState({
        //     page: pagination.current_page.toString(),
        //     page_size: pagination.per_page.toString(),
        //   });
        //   window.history.replaceState(null, "", `${window.location.pathname} `);
        //   setFetchUrl(`${baseUrl}`);
        //   setFetchAgain(true);
        // } else {
        //   setSearchState(getQueryParams());
        //   const newUrl = `${baseUrl}${window.location.search}`;
        //   setFetchUrl(newUrl);
        //   setFetchAgain(true);
        // }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // const noOfPages = useMemo(() => {
    //   if (pagination?.total === undefined || pagination?.total === 0) return 0;
    //   return Math.ceil(pagination.total / pagination.per_page);
    // }, [pagination.total, pagination.per_page]);
    // const handlePrevious = (currentPage: number) => {
    //   if (currentPage === 1) return;
    //   setSearchState((prevState) => ({
    //     ...prevState,
    //     page: (currentPage - 1).toString(),
    //   }));
    //   const queryParams = {
    //     ...searchState,
    //     page: (currentPage - 1).toString(),
    //   };
    //   const searchParams = setQueryParams(queryParams);
    //   const newUrl = `${baseUrl}?${searchParams.toString()}`;
    //   setFetchUrl(newUrl);
    //   setFetchAgain(true);
    // };
    // const handleNext = (currentPage: number) => {
    //   if (currentPage === pagination?.last_page) return;
    //   setSearchState((prevState) => ({
    //     ...prevState,
    //     page: (currentPage + 1).toString(),
    //   }));
    //   const queryParams = {
    //     ...searchState,
    //     page: (currentPage + 1).toString(),
    //   };
    //   const searchParams = setQueryParams(queryParams);
    //   const newUrl = `${baseUrl}?${searchParams.toString()}`;
    //   setFetchUrl(newUrl);
    //   setFetchAgain(true);
    // };
    // const handleChangePage = (pageNumber: number) => {
    //   if (pageNumber === pagination?.current_page) return;
    //   setSearchState((prevState) => ({
    //     ...prevState,
    //     page: pageNumber.toString(),
    //   }));
    //   const queryParams = { ...searchState, page: pageNumber.toString() };
    //   const searchParams = setQueryParams(queryParams);
    //   const newUrl = `${baseUrl}?${searchParams.toString()}`;
    //   setFetchUrl(newUrl);
    //   setFetchAgain(true);
    // };
    const handleSearch = () => {
        const searchParams = setQueryParams({
            ...searchState,
            page: (1).toString(),
        });
        const newUrl = `${baseUrl}?${searchParams.toString()}`;
        // return console.log(newUrl, "newUrl");
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
    // const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //   setSearchState((prevState) => ({
    //     ...prevState,
    //     page_size: e.target.value,
    //   }));
    //   const queryParams = {
    //     ...searchState,
    //     page_size: e.target.value,
    //   };
    //   const searchParams = setQueryParams(queryParams);
    //   const newUrl = `${baseUrl}?${searchParams.toString()}`;
    //   setFetchUrl(newUrl);
    //   setFetchAgain(true);
    // };
    const itemRender = (_, type, originalElement) => {
        if (type === "prev") {
            return (_jsxs("a", { className: "tw-flex tw-items-center tw-mr-4 tw-font-medium tw-text-gray-400", children: [_jsx(GrFormPrevious, { size: 22 }), _jsx("p", { children: " prev" })] }));
        }
        if (type === "next") {
            return (_jsxs("a", { className: "tw-flex tw-items-center tw-mx-2 tw-font-medium tw-text-gray-400", children: [_jsx("p", { children: " prev" }), _jsx(GrFormNext, { size: 22 })] }));
        }
        return originalElement;
    };
    return (_jsxs("div", { className: "search-table-container", children: [data && data?.length > 0 && (_jsxs("div", { className: "min-h-50vh  ", children: [_jsx("div", { className: searchParamsArray.length > 1
                            ? "col-12 col-md-12"
                            : "col-12 col-md-6 ", children: _jsxs("div", { className: "input-group mb-3 tw-cursor-pointer  ", children: [_jsx("span", { onClick: handleReset, className: "input-group-text hover:tw-bg-gray-200   ", id: "basic-addon1", children: "Reset" }), searchParamsArray.map((item, index) => (_jsx("input", { onChange: (e) => setSearchState({
                                        ...searchState,
                                        [item]: e.target.value,
                                    }), value: searchState[item] ?? "", type: "text", className: "form-control form-control-sm  ", placeholder: capitalizeText(item.replace(/_/g, " ")) }, index))), _jsx("span", { onClick: handleSearch, className: "btn tw-bg-appBlue btn-sm input-group-text tw-flex tw-items-center hover:tw-bg-appBlueHover tw-justify-center", children: _jsx(IoSearch, { color: "white", size: 20 }) })] }) }), _jsxs("div", { className: "tw-flex tw-justify-between tw-my-12 xsm:tw-flex-col tw-gap-8 sm:tw-flex-row ", children: [_jsx("div", { className: "flex-1", children: _jsxs("h6", { className: " tw-text-appBlue py-2 md:tw-p-6 xsm:tw-p-2 tw-text-center tw-px-12 tw-rounded-md tw-border-gray-300 tw-border-[2px] tw-text-sm", children: [_jsx("span", { className: "tw-text-black", children: " Showing :" }), _jsxs("span", { className: "mx-3 tw-font-semibold", children: [pagination?.from ?? "N/A", " to ", pagination?.to ?? "N/A"] }), _jsxs("span", { className: "tw-font-semibold", children: [_jsxs("span", { className: "tw-text-black tw-font-normal", children: ["of total :", " "] }), pagination?.to && pagination?.from
                                                    ? pagination?.to - pagination?.from + 1
                                                    : 0, " ", "entries."] })] }) }), _jsx(Pagination, { size: "small", 
                                // defaultPageSize={10}
                                // defaultCurrent={1}
                                pageSize: pagination?.per_page, current: pagination?.current_page, pageSizeOptions: [1, 5, 10, 20, 50, 100, 200], showSizeChanger: true, total: pagination?.total, onChange: (page, pageSize) => {
                                    setPageSize(pageSize);
                                    setPage(page);
                                    setFetchAgain(true);
                                }, itemRender: itemRender })] }), _jsx("div", { className: "table-responsive tw-min-h-[40vh]", children: _jsxs("table", { className: "table  table-bordered table-hover align-middle table-row-dashed fs-6  dataTable table-striped ", children: [_jsx("thead", { className: "thead-light", children: table.getHeaderGroups().map((headerGroup) => (_jsx("tr", { className: "text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0 ", children: headerGroup.headers.map((header) => {
                                            return (_jsxs("th", { className: "xsm:tw-min-w-[250px] md:tw-min-w-[180px] lg:tw-min-w-[180px] xl:tw-min-w-[90px] gy-5", colSpan: header.colSpan, children: [header.isPlaceholder
                                                        ? null
                                                        : flexRender(header.column.columnDef.header, header.getContext()), header.column.getCanResize() && (_jsx("div", { onMouseDown: header.getResizeHandler(), onTouchStart: header.getResizeHandler() }))] }, header.id));
                                        }) }, headerGroup.id))) }), _jsx("tbody", { className: "fw-semibold text-gray-600 min-h-50vh search-table-body", children: isloading ? (_jsx("span", { className: "d-flex h-75vh flex-center w-100", children: _jsx(Spinner, {}) })) : (_jsx(_Fragment, { children: table.getRowModel().rows.map((row) => {
                                            return (_jsx("tr", { children: row.getVisibleCells().map((cell) => {
                                                    return (_jsx("td", { children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id));
                                                }) }, row.id));
                                        }) })) })] }) })] })), data?.length === 0 && isloading === false && (_jsxs("div", { className: "text-center my-6 px-3", children: [_jsx("h1", { className: "text-warning", children: "Data Not Found. " }), _jsx("button", { onClick: handleRefresh, className: "btn btn-secondary my-3 btn-sm", children: "Refresh" })] })), isloading && (_jsx("div", { className: "text-center my-6 px-3", children: _jsx(Spinner, { variant: "warning" }) }))] }));
}
export default SearchPaginationList;
