import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { flexRender, getCoreRowModel, useReactTable, } from "@tanstack/react-table";
import { Pagination } from "antd";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
// import { Search } from "react-bootstrap-icons";
function TanStackTable(props) {
    const { columns, data, setPage, setPageSize, setFetchAgain, pagination } = props;
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    const itemRender = (_, type, originalElement) => {
        if (type === "prev") {
            return (_jsxs("a", { className: "tw-flex tw-items-center tw-mr-4 tw-font-medium tw-text-gray-400", children: [_jsx(GrFormPrevious, { size: 22 }), _jsx("p", { children: " prev" })] }));
        }
        if (type === "next") {
            return (_jsxs("a", { className: "tw-flex tw-items-center tw-mx-2 tw-font-medium tw-text-gray-400", children: [_jsx("p", { children: " prev" }), _jsx(GrFormNext, { size: 22 })] }));
        }
        return originalElement;
    };
    return (_jsxs("div", { className: "", children: [_jsxs("div", { className: "tw-flex xsm:tw-flex-col md:tw-flex-row xsm:tw-justify-between tw-pb-10 tw-pt-4 tw-gap-8", children: [_jsx("div", { children: _jsxs("h6", { className: " tw-text-appBlue py-2 md:tw-p-6 xsm:tw-p-2 tw-text-center tw-px-12 tw-rounded-md tw-border-gray-300 tw-border-[2px] tw-text-sm", children: [_jsx("span", { className: "tw-text-black", children: " Showing :" }), _jsxs("span", { className: "mx-3 tw-font-semibold", children: [pagination?.from ?? "N/A", " to ", pagination?.to ?? "N/A"] }), _jsxs("span", { className: "tw-font-semibold", children: [_jsx("span", { className: "tw-text-black tw-font-normal", children: "of total : " }), pagination?.to && pagination?.from
                                            ? pagination?.to - pagination?.from + 1
                                            : 0, " ", "entries."] })] }) }), _jsx("div", { className: "  ", children: _jsx(Pagination, { size: "small", 
                            // defaultPageSize={10}
                            // defaultCurrent={1}
                            pageSize: pagination?.per_page, current: pagination?.current_page, pageSizeOptions: [5, 10, 20, 50, 100, 200], showSizeChanger: true, total: pagination?.total, onChange: (page, pageSize) => {
                                setPageSize(pageSize);
                                setPage(page);
                                setFetchAgain(true);
                            }, itemRender: itemRender }) })] }), data && data?.length > 0 && (_jsxs("div", { className: "tw-min-h-[35vh] block max-w-full overflow-x-scroll overflow-y-hidden  ", children: [_jsx("div", { className: "row align-items-center" }), _jsxs("table", { className: "table table-md align-middle table-row-dashed   dataTable   ", children: [_jsx("thead", { children: table.getHeaderGroups().map((headerGroup) => (_jsx("tr", { className: "text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0", children: headerGroup.headers.map((header) => {
                                        return (_jsxs("th", { colSpan: header.colSpan, children: [header.isPlaceholder
                                                    ? null
                                                    : flexRender(header.column.columnDef.header, header.getContext()), header.column.getCanResize() && (_jsx("div", { onMouseDown: header.getResizeHandler(), onTouchStart: header.getResizeHandler() }))] }, header.id));
                                    }) }, headerGroup.id))) }), _jsx("tbody", { className: "fw-semibold text-gray-600 min-h-50vh", children: table.getRowModel().rows.map((row) => {
                                    return (_jsx("tr", { children: row.getVisibleCells().map((cell) => {
                                            return (_jsx("td", { children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id));
                                        }) }, row.id));
                                }) })] })] }))] }));
}
export default TanStackTable;
