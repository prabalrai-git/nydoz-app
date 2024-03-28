import { useMemo, useCallback } from "react";
import API_ROUTE from "../../../../service/api";
import {
  IAgentResponse,
  IClientResponse,
} from "../../../../types/products.types";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CompanyBreadcrumb from "../../../shared/molecules/CompanyBreadcrumb";
import SearchPaginationList from "../../../shared/components/SearchPaginationList";
import { GoEye, GoPersonFill } from "react-icons/go";
import { FaEdit, FaPhoneAlt } from "react-icons/fa";
import { RiFlagFill, RiMoneyDollarCircleLine } from "react-icons/ri";
import { BsPersonFillCheck } from "react-icons/bs";
import { Tag } from "antd";
import { Dropdown, DropdownButton } from "react-bootstrap";

const ClientList = () => {
  const navigate = useNavigate();
  const searchFilter: string[] = ["first_name", "last_name"];

  const handleEditData = useCallback(
    (item: IClientResponse) => {
      navigate("edit", {
        state: { data: item },
      });
    },
    [navigate]
  );

  const handleView = useCallback(
    (id: string) => {
      navigate(`./${id}`, {
        state: { clientId: id },
      });
    },
    [navigate]
  );

  const tableColumns: ColumnDef<IClientResponse>[] = useMemo(
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
            <div className="d-flex align-items-center">
              <div className="d-flex justify-content-start flex-column">
                <a
                  href="#"
                  className="text-dark fw-bold text-hover-primary mb-1 fs-6 tw-capitalize"
                >
                  {info?.row?.original?.first_name}{" "}
                  {info?.row?.original?.last_name}
                </a>
                <span className="text-muted fw-semibold d-block fs-7">
                  {info?.row?.original?.email.toString()}
                </span>
              </div>
            </div>
          );
        },
      },

      // {
      //   accessorKey: "going_to_foreign",
      //   header: () => (
      //     <div className="tw-flex tw-gap-2">
      //       <AirplaneFill size={14} />
      //       <p>Going Aboard</p>
      //     </div>
      //   ),
      //   cell: (info) => {
      //     return (
      //       <div className="text-center tw-flex tw-justify-start">
      //         {info.getValue<string>() ? (
      //           // <span className="badge badge-success">YES</span>
      //           <Tag color="green">Yes</Tag>
      //         ) : (
      //           <Tag color="red">No</Tag>
      //           // <span className="badge badge-danger px-3">NO</span>
      //         )}
      //       </div>
      //     );
      //   },
      // },
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
            <div className="text-center tw-flex tw-justify-start">
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
                <Tag>NA</Tag>
                // <span className="badge badge-warning px-3">NA</span>
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
          <div className="d-flex justify-content-center  tw-h-9">
            <DropdownButton
              variant="secondary"
              size="sm"
              id="dropdown-basic-button"
              title="Action"
            >
              <Dropdown.Item
                onClick={() => handleView(info?.row?.original?.id)}
              >
                <button
                  title="view"
                  className="tw-flex tw-justify-between tw-gap-2 tw-font-bold "
                >
                  <GoEye color={"green"} size={18} />
                  <p>View</p>
                </button>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleEditData(info?.row?.original)}
              >
                <button
                  title="Edit"
                  className="tw-flex tw-gap-2 tw-items-center tw-font-bold"
                >
                  <FaEdit color="blue" size={16} />
                  <p>Edit</p>
                </button>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  navigate(
                    `../transactions/add?client_id=${info?.row?.original?.id}`
                  );
                }}
              >
                <button
                  title="Add Transaction"
                  className="tw-flex tw-gap-2 tw-items-center tw-font-bold"
                >
                  <RiMoneyDollarCircleLine color="brown" size={18} />
                  <p>Add Transaction</p>
                </button>
              </Dropdown.Item>
            </DropdownButton>
          </div>
        ),
        footer: (info) => info.column.id,
      },
    ],
    [handleEditData]
  );

  return (
    <div className=" px-3">
      <CompanyBreadcrumb
        title="Client List"
        btnText="Back"
        showBreadcrumb={true}
      />
      <section>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Client's List</h3>
            <div className="card-toolbar">
              <Link
                to={`add`}
                className="btn tw-bg-btnPrimary hover:tw-bg-btnPrimaryHover btn-sm"
              >
                <span className="mx-2 tw-text-white">Add Client</span>
              </Link>
            </div>
          </div>
          <div className="card-body">
            <SearchPaginationList
              searchParamsArray={searchFilter}
              baseUrl={API_ROUTE.CM_CLIENTS}
              columns={tableColumns}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClientList;
