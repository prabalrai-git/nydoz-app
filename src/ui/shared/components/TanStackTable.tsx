import { ColumnDef } from "@tanstack/react-table";
import { IPagination } from "../../../types/axios.type";
import { RESULT_PER_PAGE_LIST } from "../../../constants/AppSetting";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

interface ITableProps<T> {
    columns: ColumnDef<T>[];
    data: T[];
    pagination: IPagination;
}

function TanStackTable(props: ITableProps) {
    const { columns, data, pagination } = props;
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div>
            {data && data?.length > 0 && (
                <div className='p-2 block max-w-full overflow-x-scroll overflow-y-hidden'>
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
                            {table.getRowModel().rows.map((row) => {
                                return (
                                    <tr key={row.id}>
                                        {row.getVisibleCells().map((cell) => {
                                            return (
                                                <td key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef
                                                            .cell,
                                                        cell.getContext()
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className='row'>
                        <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'>
                            <div id='kt_customers_table_length'>
                                <div className='d-flex  align-items-center'>
                                    <label className='mx-2'>
                                        Result Per page:
                                    </label>
                                    <select
                                        value={pagination.per_page}
                                        name='kt_customers_table_length'
                                        aria-controls='kt_customers_table'
                                        className=' form-select form-select-sm form-select-solid'>
                                        {RESULT_PER_PAGE_LIST.map(
                                            (item: number, index) => (
                                                <option
                                                    key={index}
                                                    value={item}>
                                                    {item}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
                            <div
                                className='dataTables_paginate paging_simple_numbers'
                                id='kt_customers_table_paginate'>
                                <ul className='pagination'>
                                    <li
                                        className='paginate_button page-item previous disabled'
                                        id='kt_customers_table_previous'>
                                        <a
                                            href='#'
                                            aria-controls='kt_customers_table'
                                            data-dt-idx='0'
                                            className='page-link'>
                                            <i className='previous'></i>
                                        </a>
                                    </li>
                                    <li className='paginate_button page-item active'>
                                        <a
                                            href='#'
                                            aria-controls='kt_customers_table'
                                            data-dt-idx='1'
                                            className='page-link'>
                                            1
                                        </a>
                                    </li>
                                    <li className='paginate_button page-item '>
                                        <a
                                            href='#'
                                            aria-controls='kt_customers_table'
                                            data-dt-idx='2'
                                            className='page-link'>
                                            2
                                        </a>
                                    </li>
                                    <li className='paginate_button page-item '>
                                        <a
                                            href='#'
                                            aria-controls='kt_customers_table'
                                            data-dt-idx='3'
                                            className='page-link'>
                                            3
                                        </a>
                                    </li>
                                    <li className='paginate_button page-item '>
                                        <a
                                            href='#'
                                            aria-controls='kt_customers_table'
                                            data-dt-idx='4'
                                            className='page-link'>
                                            4
                                        </a>
                                    </li>
                                    <li
                                        className='paginate_button page-item next'
                                        id='kt_customers_table_next'>
                                        <a
                                            href='#'
                                            aria-controls='kt_customers_table'
                                            data-dt-idx='5'
                                            className='page-link'>
                                            <i className='next'></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TanStackTable;
