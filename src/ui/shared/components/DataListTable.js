import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import TanStackTable from "../molecules/TanStackTable";
import SearchBar from "../molecules/SearchBar";
import Pagination from "../molecules/Pagination";
function DataListTable(props) {
    const { showSearchBar, columns, data, pagination, showPagination, searchTerm, setSearchTerm, setFetchAgain, handleNext, handlePrevious, handlePerPageChange, } = props;
    return (_jsxs("div", { children: [_jsxs("div", { className: 'card-header border-0 pt-6', children: [_jsx("div", { className: 'card-title', children: _jsx("div", { className: 'flex-1', children: showSearchBar && (_jsx(SearchBar, { setFetchAgain: setFetchAgain, searchTerm: searchTerm, setSearchTerm: setSearchTerm, placeholder: 'Search' })) }) }), _jsx("div", { className: 'card-toolbar', children: _jsx("div", { className: 'd-flex justify-content-end', "data-kt-customer-table-toolbar": 'base', children: _jsxs("h6", { className: 'bg-light text-info  p-3', children: ["Total :", pagination?.total] }) }) })] }), _jsx(TanStackTable, { columns: columns, data: data }), showPagination && pagination && (_jsx(Pagination, { handlePrevious: handlePrevious, handleNext: handleNext, pagination: pagination, handlePerPageChange: handlePerPageChange }))] }));
}
export default DataListTable;
