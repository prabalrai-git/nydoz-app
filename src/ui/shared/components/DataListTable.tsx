import TanStackTable from "../molecules/TanStackTable";
import SearchBar from "../molecules/SearchBar";
import { ITableProps, IPagination } from "../../../types/axios.type";
import Pagination from "../molecules/Pagination";

interface IDataListProps<T> extends ITableProps<T> {
    showSearchBar: boolean;
    pagination: IPagination | undefined;
    showPagination: boolean;
}

function DataListTable<T>(props: IDataListProps<T>) {
    const { showSearchBar, columns, data, pagination, showPagination } = props;
    return (
        <div>
            {showSearchBar && <SearchBar />}
            <TanStackTable columns={columns} data={data} />
            {showPagination && pagination && (
                <Pagination pagination={pagination} />
            )}
        </div>
    );
}

export default DataListTable;
