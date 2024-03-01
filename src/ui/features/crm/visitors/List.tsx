import { useMemo, useCallback } from "react";
import API_ROUTE from "../../../../service/api";
import {
  IVisitorResponse,
  IAgentResponse,
} from "../../../../types/products.types";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AirplaneFill, Flag, People } from "react-bootstrap-icons";
import CompanyBreadcrumb from "../../../shared/molecules/CompanyBreadcrumb";
import SearchPaginationList from "../../../shared/components/SearchPaginationList";
import { RiDeleteBin5Line, RiFlagFill } from "react-icons/ri";
import { GoPersonFill } from "react-icons/go";
import { FaPhoneAlt } from "react-icons/fa";
import { BsPersonFillCheck } from "react-icons/bs";
import CustomBadge from "../../../shared/components/CustomBadge";
import CommonTable from "../../../shared/components/CommonTable";

const VisitorList = () => {
  const navigate = useNavigate();
  const searchFilter: string[] = ["first_name", "last_name", "email", "mobile"];

  const handleEditData = useCallback(
    (item: IVisitorResponse) => {
      navigate("edit", {
        state: { data: item },
      });
    },
    [navigate]
  );

  const tableColumns: ColumnDef<IVisitorResponse>[] = useMemo(
    () => [
      {
        accessorKey: "sn",
        header: () => <div>S.N</div>,
        cell: (info) => info.row.index + 1,
      },
      {
        accessorKey: "Name",
        header: () => (
          <div className="tw-flex tw-gap-2">
            <GoPersonFill size={16} />
            <p>Name</p>
          </div>
        ),
        cell: (info) => {
          return (
            <div className="d-flex align-items-center ">
              <div className="d-flex justify-content-start flex-column ">
                <a
                  href="#"
                  className="text-dark fw-bold text-hover-primary mb-1 fs-6"
                >
                  {info?.row?.original?.first_name}
                  {info?.row?.original?.last_name}
                </a>
                <span className="text-muted fw-semibold d-block fs-7">
                  {info?.row?.original?.email}
                </span>
              </div>
            </div>
          );
        },
      },

      {
        accessorKey: "going_to_foreign",
        header: () => (
          <div className="tw-flex tw-gap-2">
            <AirplaneFill size={14} />
            <p>Going Aboard</p>
          </div>
        ),
        cell: (info) => {
          return (
            <div className="text-center tw-flex tw-justify-start">
              {info.getValue<string>() ? (
                <>
                  <span className="badge badge-success ">YES</span>
                </>
              ) : (
                <span className="badge badge-danger px-3">NO</span>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "phone_nos",
        header: () => (
          <div className="tw-flex tw-gap-2">
            {/* <i className="bi bi-telephone me-2 fs-7"></i> */}
            <FaPhoneAlt size={14} />
            <span>Mobile Number</span>
          </div>
        ),
        cell: (info) => {
          return (
            <div>
              {info.getValue<string>()?.length > 0 &&
                info.getValue<string>()[0]}
            </div>
          );
        },
      },

      {
        accessorKey: "visiting_country",
        header: () => (
          <div className="tw-flex tw-gap-2">
            {/* <Flag size={16} className="mx-2" /> */}
            <RiFlagFill size={16} />
            <span>Visiting Country</span>
          </div>
        ),
        cell: (info) => {
          return (
            <div className="text-center tw-flex tw-flex-start">
              {info.getValue<string>() ? (
                info.getValue<string>()
              ) : (
                <span className="badge badge-warning px-3">NA</span>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "agent",
        header: () => (
          <div className="tw-flex tw-gap-2">
            {/* <Flag size={16} className="mx-2" /> */}
            <BsPersonFillCheck size={18} />
            <span>Agent</span>
          </div>
        ),
        cell: (info) => {
          return (
            <div>
              {info.getValue<Partial<IAgentResponse>>() ? (
                <div>
                  <span>
                    {" "}
                    {info.getValue<Partial<IAgentResponse>>()?.first_name}
                  </span>
                  <span>
                    {" "}
                    {info.getValue<Partial<IAgentResponse>>()?.last_name}
                  </span>
                </div>
              ) : (
                <span className="badge badge-warning px-3">NA</span>
              )}
            </div>
          );
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
          <div className="tw-flex tw-justify-center">
            <div className="d-flex justify-content-center">
              {/* <button
                            title='view'
                            onClick={() => handleView(info?.row?.original?.id)}
                            className='btn btn-sm btn-icon btn-primary mx-3'>
                            <i className='bi bi-box-arrow-up-right '></i>
                        </button> */}
              <button
                title="Edit"
                onClick={() => handleEditData(info?.row?.original)}
                className="btn btn-sm btn-icon btn-info mx-3"
              >
                <i className="bi bi-pencil-square "></i>
              </button>
            </div>
            <div className="d-flex justify-content-center">
              {/* <button
                            title='view'
                            onClick={() => handleView(info?.row?.original?.id)}
                            className='btn btn-sm btn-icon btn-primary mx-3'>
                            <i className='bi bi-box-arrow-up-right '></i>
                        </button> */}
              <button
                onClick={() => window.alert("will delete later")}
                className="btn btn-sm btn-icon  tw-bg-red-500 hover:tw-bg-red-700"
              >
                <RiDeleteBin5Line color="white" size={15} />
              </button>
            </div>
          </div>
        ),
        footer: (info) => info.column.id,
      },
    ],
    [handleEditData]
  );
  return (
    <div className="my-6 px-3">
      <CompanyBreadcrumb
        title="Visitor List"
        btnText="Back"
        showBreadcrumb={true}
      />
      <section>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Visitor's List</h3>
            <div className="card-toolbar">
              <Link
                to={`add`}
                className="btn tw-bg-btnPrimary hover:tw-bg-btnPrimaryHover tw-text-white hover:tw-text-white tw-font-bold btn-sm"
              >
                <span className="mx-2">Add Visitor</span>
              </Link>
            </div>
          </div>
          <div className="card-body">
            {/* <SearchPaginationList
              searchParamsArray={searchFilter}
              baseUrl={API_ROUTE.CM_VISITORS}
              columns={tableColumns}
            /> */}
            {/* <input type="text" /> */}
            <CommonTable />
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisitorList;
