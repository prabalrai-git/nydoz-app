import TanStackTable from "../molecules/TanStackTable";
import SearchBar from "../molecules/SearchBar";
import { ITableProps, IPagination } from "../../../types/axios.type";
import Pagination from "../molecules/Pagination";

interface IDataListProps<T> extends ITableProps<T> {
    showSearchBar: boolean;
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
    pagination: IPagination | undefined;
    showPagination: boolean;
    setFetchAgain: (fetchAgain: boolean) => void;
    handlePrevious: () => void;
    handleNext: () => void;
    handlePerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function DataListTable<T>(props: IDataListProps<T>) {
    const {
        showSearchBar,
        columns,
        data,
        pagination,
        showPagination,
        searchTerm,
        setSearchTerm,
        setFetchAgain,
        handleNext,
        handlePrevious,
        handlePerPageChange,
    } = props;
    return (
        <div>
            {
                <div className='card-header border-0 pt-6'>
                    <div className='card-title'>
                        <div className='flex-1'>
                            {showSearchBar && (
                                <SearchBar
                                    setFetchAgain={setFetchAgain}
                                    searchTerm={searchTerm}
                                    setSearchTerm={setSearchTerm}
                                    placeholder='Search'
                                />
                            )}
                        </div>
                    </div>

                    <div className='card-toolbar'>
                        <div
                            className='d-flex justify-content-end'
                            data-kt-customer-table-toolbar='base'>
                            <h6 className='bg-light text-info  p-3'>
                                Total :{pagination?.total}
                            </h6>
                        </div>
                    </div>
                </div>
            }

            <TanStackTable columns={columns} data={data} />
            {showPagination && pagination && (
                <Pagination
                    handlePrevious={handlePrevious}
                    handleNext={handleNext}
                    pagination={pagination}
                    handlePerPageChange={handlePerPageChange}
                />
            )}
        </div>
    );
}

export default DataListTable;
