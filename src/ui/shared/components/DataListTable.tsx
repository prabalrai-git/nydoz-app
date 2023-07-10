import TanStackTable from "../molecules/TanStackTable";
import SearchBar from "../molecules/SearchBar";
import { ITableProps, IPagination } from "../../../types/axios.type";

interface IDataListProps<T> extends ITableProps<T> {
    showSearchBar: boolean;
    pagination: IPagination;
    showPagination: boolean;
}

function DataListTable<T>(props: IDataListProps<T>) {
    const { showSearchBar, columns, data, pagination, showPagination } = props;
    return (
        <div>
            {showSearchBar && <SearchBar />}
            <TanStackTable
                columns={columns}
                data={data}
                pagination={pagination}
                showPagination={showPagination}
            />
        </div>
    );
}

export default DataListTable;
