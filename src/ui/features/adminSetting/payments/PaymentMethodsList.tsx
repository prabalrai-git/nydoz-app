import { useMemo, useCallback } from "react";
import API_ROUTE from "../../../../service/api";
import { IAgentResponse } from "../../../../types/products.types";
import { ColumnDef } from "@tanstack/react-table";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SearchPaginationList from "../../../shared/components/SearchPaginationList";

// {
//   "name": "string",
//   "is_account_required": true,
//   "custom_fields": [
//     {
//       "name": "string",
//       "type": "text",
//       "options": [
//         "string"
//       ],
//       "is_required": true,
//       "multiple_value": false
//     }
//   ]
// }

const PaymentList = () => {
  const navigate = useNavigate();
  const searchFilter: string[] = ["first_name", "email", "mobile"];

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
        accessorKey: "is_account_required",
        header: () => (
          <div>
            <span>Account Required</span>
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
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">All Payment Methods</h3>
          <div className="card-toolbar">
            <Link
              to={"../add"}
              className="btn tw-bg-btnPrimary hover:tw-bg-btnPrimaryHover btn-sm"
            >
              <span className="mx-2 tw-text-white">Add Payment Method</span>
            </Link>
          </div>
        </div>
        <div className="tw-p-6 tw-px-8">
          <SearchPaginationList
            searchParamsArray={searchFilter}
            baseUrl={API_ROUTE.PAYMENT_METHODS}
            columns={tableColumns}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentList;
