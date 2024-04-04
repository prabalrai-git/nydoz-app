import { useEffect, useMemo, useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ISearchPaginationListProps } from "../../../types/axios.type";
import { Spinner } from "react-bootstrap";
import { capitalizeText } from "../../../functions/TextMuatations";
import useFetch from "../../../hooks/useFetch";
import { IoSearch } from "react-icons/io5";
import { Pagination } from "antd";
import { PaginationProps } from "antd/lib";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

interface SearchState {
  [key: string]: string;
}
// props required

function SearchPaginationList<T>(props: ISearchPaginationListProps<T>) {
  const { columns, baseUrl, searchParamsArray } = props;
  const [fetchUrl, setFetchUrl] = useState(baseUrl);
  const [tableData, setTableData] = useState<T[] | []>([]);
  const { isloading, data, pagination, fetchData, setPage, setPageSize } =
    useFetch<T[]>(fetchUrl, true);

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

  const table = useReactTable<T>({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const [searchState, setSearchState] = useState<SearchState>({});

  // const getQueryParams = () => {
  //   const query = new URLSearchParams(window.location.search);
  //   const queryObject: SearchState = {};
  //   query.forEach((value, key) => {
  //     queryObject[key as string] = value;
  //   });
  //   return queryObject;
  // };

  const setQueryParams = (queryParams: SearchState) => {
    const searchParams = new URLSearchParams(window.location.search);
    Object.keys(queryParams).forEach((key: string) => {
      searchParams.set(key, queryParams[key] as string);
    });
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?${searchParams.toString()}`
    );
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
    if (
      JSON.stringify({
        page: pagination.current_page.toString(),
        page_size: pagination.per_page.toString(),
      }) === JSON.stringify(searchState)
    )
      return;
    setSearchState({
      page: pagination.current_page.toString(),
      page_size: pagination.per_page.toString(),
    });
    window.history.replaceState(
      null,
      "",
      `${
        window.location.pathname
      }?page=${pagination.current_page.toString()}&page_size=${pagination.per_page.toString()} `
    );
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
    <div className="search-table-container">
      {data && data?.length > 0 && (
        <div className="min-h-50vh  ">
          <div
            className={
              searchParamsArray.length > 1
                ? "col-12 col-md-12"
                : "col-12 col-md-6 "
            }
          >
            <div className="input-group mb-3 tw-cursor-pointer  ">
              <span
                onClick={handleReset}
                className="input-group-text hover:tw-bg-gray-200   "
                id="basic-addon1"
              >
                {/* <ArrowDownUp size={20} /> */}
                Reset
              </span>
              {searchParamsArray.map((item: string, index: number) => (
                <input
                  key={index}
                  onChange={(e) =>
                    setSearchState({
                      ...searchState,
                      [item]: e.target.value,
                    })
                  }
                  value={searchState[item] ?? ""}
                  type="text"
                  className="form-control form-control-sm  "
                  placeholder={capitalizeText(item.replace(/_/g, " "))}
                />
              ))}
              <span
                onClick={handleSearch}
                className="btn tw-bg-appBlue btn-sm input-group-text tw-flex tw-items-center hover:tw-bg-appBlueHover tw-justify-center"
              >
                {/* <i className="bi bi-search tw-text-white"></i> */}
                <IoSearch color="white" size={20} />
              </span>
            </div>
          </div>
          <div className="tw-flex tw-justify-between tw-my-12 xsm:tw-flex-col tw-gap-8 sm:tw-flex-row ">
            <div className="flex-1">
              <h6 className=" tw-text-appBlue py-2 md:tw-p-6 xsm:tw-p-2 tw-text-center tw-px-12 tw-rounded-md tw-border-gray-300 tw-border-[2px] tw-text-sm">
                <span className="tw-text-black"> Showing :</span>
                <span className="mx-3 tw-font-semibold">
                  {pagination?.from ?? "N/A"} to {pagination?.to ?? "N/A"}
                </span>
                <span className="tw-font-semibold">
                  <span className="tw-text-black tw-font-normal">
                    of total :{" "}
                  </span>
                  {pagination?.to && pagination?.from
                    ? pagination?.to - pagination?.from + 1
                    : 0}{" "}
                  entries.
                </span>
              </h6>
            </div>
            <Pagination
              size="small"
              // defaultPageSize={10}
              // defaultCurrent={1}
              pageSize={pagination?.per_page}
              current={pagination?.current_page}
              pageSizeOptions={[1, 5, 10, 20, 50, 100, 200]}
              showSizeChanger={true}
              total={pagination?.total}
              onChange={(page, pageSize) => {
                setPageSize(pageSize);
                setPage(page);
                setFetchAgain(true);
              }}
              itemRender={itemRender}
            />
            {/* <div className="tw-flex tw-gap-5 tw-self-end">
              <ul className="pagination  ">
                <li
                  className={
                    pagination.current_page === 1
                      ? "page-item previous disabled"
                      : "page-item previous"
                  }
                >
                  <button
                    onClick={() => handlePrevious(pagination.current_page)}
                    className="page-link"
                  >
                    <i className="previous"></i>
                    <span className="mx-2">prev</span>
                  </button>
                </li>
                {Array.from(Array(noOfPages).keys()).map(
                  (_item: unknown, index: number) => (
                    <li key={index + 1} className="page-item ">
                      <button
                        onClick={() => handleChangePage(index + 1)}
                        className={
                          pagination.current_page === index + 1
                            ? "page-link active "
                            : "page-link "
                        }
                      >
                        {index + 1}
                      </button>
                    </li>
                  )
                )}
                <li
                  className={
                    pagination.per_page * pagination.current_page >=
                    pagination.total
                      ? "page-item next disabled"
                      : "page-item next"
                  }
                >
                  <button
                    onClick={() => handleNext(pagination.current_page)}
                    className="page-link"
                  >
                    <span className="mx-2">next</span>
                    <i className="next"></i>
                  </button>
                </li>
              </ul>
              <div className="flex-2  ">
                <select
                  value={pagination.per_page}
                  className="form-select form-select-sm"
                  onChange={(e) => handlePageSizeChange(e)}
                >
                  <option value="5">15</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                </select>
              </div>
            </div> */}
          </div>
          <div className="table-responsive tw-min-h-[40vh]">
            <table className="table  table-bordered table-hover align-middle table-row-dashed fs-6  dataTable table-striped ">
              <thead className="thead-light">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr
                    className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0 "
                    key={headerGroup.id}
                  >
                    {headerGroup.headers.map((header) => {
                      return (
                        <th
                          className="xsm:tw-min-w-[250px] md:tw-min-w-[180px] lg:tw-min-w-[180px] xl:tw-min-w-[90px] gy-5"
                          key={header.id}
                          colSpan={header.colSpan}
                        >
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
              <tbody className="fw-semibold text-gray-600 min-h-50vh search-table-body">
                {isloading ? (
                  <span className="d-flex h-75vh flex-center w-100">
                    <Spinner />
                  </span>
                ) : (
                  <>
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
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {data?.length === 0 && isloading === false && (
        <div className="text-center my-6 px-3">
          <h1 className="text-warning">Data Not Found. </h1>
          <button
            onClick={handleRefresh}
            className="btn btn-secondary my-3 btn-sm"
          >
            Refresh
          </button>
        </div>
      )}
      {isloading && (
        <div className="text-center my-6 px-3">
          <Spinner variant="warning" />
        </div>
      )}
    </div>
  );
}

export default SearchPaginationList;
