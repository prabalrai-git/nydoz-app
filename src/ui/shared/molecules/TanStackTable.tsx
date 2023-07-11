import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ITableProps } from "../../../types/axios.type";

function TanStackTable<T>(props: ITableProps<T>) {
    const { columns, data } = props;
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className='border '>
            {data && data?.length > 0 && (
                <div className='p-2 min-h-50vh block max-w-full overflow-x-scroll overflow-y-hidden'>
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
                </div>
            )}
        </div>
    );
}

export default TanStackTable;
