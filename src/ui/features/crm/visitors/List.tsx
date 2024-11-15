import { useMemo, useCallback, useEffect } from "react";
import API_ROUTE from "../../../../service/api";
import {
  IVisitorResponse,
  IAgentResponse,
} from "../../../../types/products.types";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AirplaneFill } from "react-bootstrap-icons";
import CompanyBreadcrumb from "../../../shared/molecules/CompanyBreadcrumb";
import SearchPaginationList from "../../../shared/components/SearchPaginationList";
import { RiDeleteBin5Line, RiFlagFill } from "react-icons/ri";
import { GoPersonFill } from "react-icons/go";
import { FaPhoneAlt, FaRegEdit } from "react-icons/fa";
import { BsPersonFillCheck } from "react-icons/bs";
import { Tag } from "antd";
import { DropdownButton, Dropdown } from "react-bootstrap";

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

  // useEffect(() => {
  //   fetch(
  //     "http://newcompany.localhost/api/v1/client-management/visitors?page=1&page_size=10&last_name=2",
  //     {
  //       headers: {
  //         Authorization: "Bearer 44|IBXyCrnvhbMhk3gMH9vxsoMGtmXj8Tk9YZXFS3aF",
  //       },
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((data) => console.log(data, "this is the data form the response"));
  // }, []);

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
                  {/* <span className="badge badge-success ">YES</span> */}
                  <Tag color="green">YES</Tag>
                </>
              ) : (
                <Tag color="red">NO</Tag>

                // <span className="badge badge-danger px-3">NO</span>
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
                <Tag>NA</Tag>
                // <span className="badge badge-warning px-3">NA</span>
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
            <DropdownButton
              variant="secondary"
              size="sm"
              id="dropdown-basic-button"
              title="Action"
            >
              <Dropdown.Item
                onClick={() => handleEditData(info?.row?.original)}
              >
                <button
                  title="Edit"
                  className="tw-flex tw-justify-between tw-gap-2 tw-font-bold "
                >
                  <FaRegEdit color="blue" size={15} />
                  <p>Edit</p>
                </button>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => window.alert("will delete later")}>
                <button className="tw-flex tw-justify-between tw-gap-2 tw-font-bold ">
                  <RiDeleteBin5Line color="red" size={15} />
                  <p>Delete</p>
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
            <SearchPaginationList
              searchParamsArray={searchFilter}
              baseUrl={API_ROUTE.CM_VISITORS}
              columns={tableColumns}
            />
            {/* <input type="text" /> */}
            {/* <CommonTable /> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisitorList;
