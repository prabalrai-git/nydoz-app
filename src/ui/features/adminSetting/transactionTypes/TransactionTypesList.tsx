import { useMemo, useCallback } from "react";
import API_ROUTE from "../../../../service/api";
import { IAgentResponse } from "../../../../types/products.types";
import { ColumnDef } from "@tanstack/react-table";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SearchPaginationList from "../../../shared/components/SearchPaginationList";
import { Tag } from "antd";

const TransactionTypesList = () => {
  const navigate = useNavigate();
  const searchFilter: string[] = ["name", "description", "transaction_effect"];

  const handleEditData = useCallback(
    (item: IAgentResponse) => {
      navigate("edit", {
        state: { data: item },
      });
    },
    [navigate]
  );

  const tableColumns: ColumnDef<IAgentResponse>[] = useMemo(
    () => [
      {
        accessorKey: "sn",
        header: () => <div>S.N</div>,
        cell: (info) => info.row.index + 1,
      },
      {
        accessorKey: "name",
        header: () => (
          <div>
            <span>Name</span>
          </div>
        ),
        cell: (info) => {
          return <div>{info.getValue<string>()}</div>;
        },
      },
      {
        accessorKey: "description",
        header: () => (
          <div>
            <span>Description</span>
          </div>
        ),
        cell: (info) => {
          return <div>{info.getValue<string>()}</div>;
        },
      },
      {
        accessorKey: "transaction_effect",
        header: () => (
          <div>
            <span>Transaction Effect</span>
          </div>
        ),
        cell: (info) => {
          console.log(info, "this is info");
          return (
            <div>
              {info.getValue<string>().toLowerCase() === "debit" ? (
                <Tag color="red">{info.getValue<string>().toUpperCase()}</Tag>
              ) : (
                <Tag color="green">{info.getValue<string>().toUpperCase()}</Tag>
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
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Transaction Types's List</h3>
          <div className="card-toolbar">
            <Link to={"../add"} className="btn btn-success btn-sm">
              <span className="mx-2">Add Transaction Type</span>
            </Link>
          </div>
        </div>
        <SearchPaginationList
          searchParamsArray={searchFilter}
          baseUrl={API_ROUTE.TRANSACTION_TYPE}
          columns={tableColumns}
        />
      </div>
    </div>
  );
};

export default TransactionTypesList;
