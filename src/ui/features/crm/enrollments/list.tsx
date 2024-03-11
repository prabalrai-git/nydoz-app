import { useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Flag } from "react-bootstrap-icons";
import { ColumnDef } from "@tanstack/react-table";
import API_ROUTE from "../../../../service/api";
import { IEnrollmentResponse } from "../../../../types/products.types";
import BASE_URL from "../../../../constants/AppSetting";

import CompanyBreadcrumb from "../../../shared/molecules/CompanyBreadcrumb";
import SearchPaginationList from "../../../shared/components/SearchPaginationList";
import { RiFlagFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { GoEye } from "react-icons/go";

const List = () => {
  const navigate = useNavigate();
  const searchFilter: string[] = ["first_name", "email", "mobile"];

  const handleEditData = useCallback(
    (item: IEnrollmentResponse) => {
      navigate("../edit", {
        state: { data: item },
      });
    },
    [navigate]
  );

  const handleView = useCallback(
    (id: string) => {
      navigate(`../view/${id}`);
    },
    [navigate]
  );

  const handleOpening = useCallback(
    (id: string) => {
      navigate(`../view/${id}/openings/add`);
    },
    [navigate]
  );

  const tableColumns: ColumnDef<IEnrollmentResponse>[] = useMemo(
    () => [
      {
        accessorKey: "sn",
        header: () => <div>S.N</div>,
        cell: (info) => info.row.index + 1,
      },
      {
        accessorKey: "Name",
        header: () => (
          <div className="tw-flex">
            <i className="bi bi-building-fill-add fs-7 me-2 tw-self-center"></i>
            <span>Institute's Name</span>
          </div>
        ),
        cell: (info) => {
          const url = `${BASE_URL}${info?.row?.original?.logo}`;
          return (
            <div className="d-flex align-items-center">
              <div className="symbol symbol-40px me-3">
                <img src={url} className="" alt="Logo" />
              </div>
              <div className="d-flex justify-content-start flex-column">
                <div className="text-dark fw-bold text-hover-primary mb-1 fs-7">
                  {info?.row?.original?.name}
                </div>
                <a
                  href={info?.row?.original?.website}
                  className="text-muted fw-semibold d-block fs-7"
                >
                  {info?.row?.original?.website}
                </a>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "website",
        header: () => (
          <div className="tw-flex">
            <i className="bi bi-globe me-2 fs-7 tw-self-center"></i>
            <span>Website</span>
          </div>
        ),
        cell: (info) => {
          return <div>{info.getValue<string>()}</div>;
        },
      },

      {
        accessorKey: "state",
        header: () => (
          <div className="tw-flex">
            <i className="bi bi-geo-alt me-2 fs-7 tw-self-center"></i>
            <span>State</span>
          </div>
        ),
        cell: (info) => {
          return <div>{info.getValue<string>()}</div>;
        },
      },

      {
        accessorKey: "country",
        header: () => (
          <div className="tw-flex tw-gap-2">
            {/* <Flag size={14} className="mx-2 tw-self-center" /> */}
            <RiFlagFill size={16} />

            <span>Country</span>
          </div>
        ),
        cell: (info) => {
          return <div>{info.getValue<string>()}</div>;
        },
      },

      {
        accessorKey: "action",
        header: () => (
          <div className="text-center">
            <span>Actions</span>
          </div>
        ),
        cell: (info) => (
          <div className="d-flex justify-content-center tw-flex tw-gap-2">
            <button
              title="view"
              onClick={() => handleOpening(info?.row?.original?.id)}
              className="btn btn-sm  btn-bg-secondary"
            >
              Add Openings
            </button>
            <button
              title="view"
              onClick={() => handleView(info?.row?.original?.id)}
              className="btn btn-sm btn-icon btn-primary hover:tw-bg-btnPrimaryHover "
            >
              {/* <i className="bi bi-box-arrow-up-right "></i> */}
              <GoEye color={"white"} size={18} />
            </button>
            <button
              title="Edit"
              onClick={() => handleEditData(info?.row?.original)}
              className="btn btn-sm btn-icon tw-bg-appBlue hover:tw-bg-appBlueHover "
            >
              {/* <i className="bi bi-pencil-square "></i> */}
              <FaEdit size={18} color="white" />
            </button>
          </div>
        ),
        footer: (info) => info.column.id,
      },
    ],
    [handleEditData, handleOpening, handleView]
  );

  return (
    <div>
      <CompanyBreadcrumb
        title="Institute List"
        btnText="Back"
        showBreadcrumb={true}
      />
      <section>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Institute's List</h3>
            <div className="card-toolbar">
              <Link
                to={"../add"}
                className="btn tw-bg-btnPrimary hover:tw-bg-btnPrimaryHover btn-sm"
              >
                <span className="mx-2 tw-text-white">Add Institute</span>
              </Link>
            </div>
          </div>
          <div className="card-body">
            <SearchPaginationList
              searchParamsArray={searchFilter}
              baseUrl={API_ROUTE.CM_ENROLLMENT}
              columns={tableColumns}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default List;
