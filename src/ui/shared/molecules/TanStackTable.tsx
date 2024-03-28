import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ITableProps } from "../../../types/axios.type";
import { Pagination } from "antd";
import type { PaginationProps } from "antd";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
// import { Search } from "react-bootstrap-icons";

function TanStackTable<T>(props: ITableProps<T>) {
  const { columns, data } = props;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const itemRender: PaginationProps["itemRender"] = (
    _,
    type,
    originalElement
  ) => {
    if (type === "prev") {
      return (
        <a className="tw-flex tw-items-center tw-mr-4 tw-font-medium tw-text-gray-400">
          <GrFormPrevious size={22} />
          <p> prev</p>
        </a>
      );
    }
    if (type === "next") {
      return (
        <a className="tw-flex tw-items-center tw-mx-2 tw-font-medium tw-text-gray-400">
          <p> prev</p>
          <GrFormNext size={22} />
        </a>
      );
    }
    return originalElement;
  };

  return (
    <div className="">
      <div className="tw-flex xsm:tw-flex-col md:tw-flex-row xsm:tw-justify-between tw-pb-10 tw-pt-4 tw-gap-8">
        <div>
          <h6 className=" tw-text-appBlue py-2 md:tw-p-6 xsm:tw-p-2 tw-text-center tw-px-12 tw-rounded-md tw-border-gray-300 tw-border-[2px] tw-text-sm">
            <span className="tw-text-black"> Showing :</span>
            <span className="mx-3 tw-font-semibold">
              {1 ?? "N/A"} to {15 ?? "N/A"}
            </span>
            <span className="tw-font-semibold">
              <span className="tw-text-black tw-font-normal">of total : </span>
              15 entries.
            </span>
          </h6>
        </div>
        <div className="  ">
          <Pagination
            size="small"
            defaultPageSize={10}
            defaultCurrent={1}
            total={70}
            itemRender={itemRender}
          />
        </div>
      </div>
      {data && data?.length > 0 && (
        <div className="tw-min-h-[35vh] block max-w-full overflow-x-scroll overflow-y-hidden  ">
          <div className="row align-items-center">
            {/* <div className="col-12 col-md-6">
              <h6 className=" tw-text-appBlue py-2">
                <span className="tw-font-semibold tw-text-lg  ">
                  Total Documents : {data?.length}
                </span>
              </h6>
            </div> */}
            {/* <div className='col-12 col-md-6'>
                            <div className='input-group my-3'>
                                <input
                                    type='text'
                                    value={globalFilter || ""}
                                    onChange={(e) =>
                                        setGlobalFilter(e.target.value)
                                    }
                                    className='form-control form-control-sm'
                                    placeholder='Search..'
                                />
                                <span className='input-group-text'>
                                    <Search />
                                </span>
                            </div>
                        </div> */}
          </div>
          <table className="table table-md align-middle table-row-dashed   dataTable   ">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0"
                  key={headerGroup.id}
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <th key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {header.column.getCanResize() && (
                          <div
                            onMouseDown={header.getResizeHandler()}
                            onTouchStart={header.getResizeHandler()}
                          ></div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>

            <tbody className="fw-semibold text-gray-600 min-h-50vh">
              {table.getRowModel().rows.map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
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
