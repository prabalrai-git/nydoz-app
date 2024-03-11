import { useMemo, useCallback } from "react";
import API_ROUTE from "../../../../service/api";
import {} from "../../../../types/products.types";
import { ColumnDef } from "@tanstack/react-table";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import SearchPaginationList from "../../../shared/components/SearchPaginationList";
import { IFormData } from "./AddUser";

const UserList = () => {
  const navigate = useNavigate();
  const searchFilter: string[] = ["first_name", "email", "mobile"];

  interface IFormResponse extends IFormData {
    id: string;
  }

  const handleEditData = useCallback(
    (item: IFormResponse) => {
      navigate("edit", {
        state: { data: item },
      });
    },
    [navigate]
  );

  const tableColumns: ColumnDef<IFormResponse>[] = useMemo(
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
            <p>Name</p>
          </div>
        ),
        cell: (info) => {
          return (
            <div className="d-flex align-items-center">
              <div className="d-flex justify-content-start flex-column">
                <a
                  href="#"
                  className="text-dark fw-bold text-hover-primary mb-1 fs-6"
                >
                  {info?.row?.original?.first_name}{" "}
                  {info?.row?.original?.last_name}
                </a>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "mobile",
        header: () => (
          <div>
            <span>Mobile</span>
          </div>
        ),
        cell: (info) => {
          return <div>{info.getValue<string>()}</div>;
        },
      },
      {
        accessorKey: "email",
        header: () => (
          <div>
            <span>Email</span>
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
          <div className="text-center">
            <DropdownButton
              variant="secondary"
              size="sm"
              id="dropdown-basic-button"
              title="Action"
            >
              <Dropdown.Item>
                <Link
                  to={`../view/${info?.row?.original?.id}`}
                  className="menu-link"
                >
                  <span className="mx-2">View</span>
                  <i className="bi bi-box-arrow-up-right text-primary "></i>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <div
                  onClick={() => handleEditData(info?.row?.original)}
                  className="menu-link"
                >
                  <span className="mx-2">Edit</span>
                  <i className="bi bi-pencil-square text-info"></i>
                </div>
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
    <div className="my-6 px-3">
      <section>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">User's List</h3>
            <div className="card-toolbar">
              <Link
                to={`../add`}
                className="btn tw-bg-btnPrimary btn-sm hover:tw-bg-btnPrimaryHover"
              >
                <span className="mx-2 tw-text-white">Add User</span>
              </Link>
            </div>
          </div>
          <SearchPaginationList
            searchParamsArray={searchFilter}
            baseUrl={API_ROUTE.USER}
            columns={tableColumns}
          />
        </div>
      </section>
    </div>
  );
};

export default UserList;
