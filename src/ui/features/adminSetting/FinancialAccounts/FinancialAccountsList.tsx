import { useMemo, useCallback } from "react";
import API_ROUTE from "../../../../service/api";
import { IAgentResponse } from "../../../../types/products.types";
import { ColumnDef } from "@tanstack/react-table";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SearchPaginationList from "../../../shared/components/SearchPaginationList";

const FinancialAccountsList = () => {
  const navigate = useNavigate();
  const searchFilter: string[] = [
    "institute_name",
    "account_name",
    "account_number",
    "swift_code",
  ];

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
        accessorKey: "institute_name",
        header: () => (
          <div>
            <span>Institute Name</span>
          </div>
        ),
        cell: (info) => {
          return <div>{info.getValue<string>()}</div>;
        },
      },
      {
        accessorKey: "institute_site",
        header: () => (
          <div>
            <span>Institute Site</span>
          </div>
        ),
        cell: (info) => {
          return <div>{info.getValue<string>()}</div>;
        },
      },
      {
        accessorKey: "account_name",
        header: () => (
          <div>
            <span>Account Name</span>
          </div>
        ),
        cell: (info) => {
          return <div>{info.getValue<string>()}</div>;
        },
      },
      {
        accessorKey: "account_number",
        header: () => (
          <div>
            <span>Account Number</span>
          </div>
        ),
        cell: (info) => {
          return <div>{info.getValue<string>()}</div>;
        },
      },
      {
        accessorKey: "swift_code",
        header: () => (
          <div>
            <span>Swift Code</span>
          </div>
        ),
        cell: (info) => {
          return <div>{info.getValue<string>()}</div>;
        },
      },
      {
        accessorKey: "branch_name",
        header: () => (
          <div>
            <span>Branch Name</span>
          </div>
        ),
        cell: (info) => {
          return <div>{info.getValue<string>()}</div>;
        },
      },
      {
        accessorKey: "branch_address",
        header: () => (
          <div>
            <span>Branch Address</span>
          </div>
        ),
        cell: (info) => {
          return <div>{info.getValue<string>()}</div>;
        },
      },
      {
        accessorKey: "payment_method_ids",
        header: () => (
          <div>
            <span>Payment Methods</span>
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
          <h3 className="card-title">All Financial Accounts</h3>
          <div className="card-toolbar">
            <Link
              to={"../add"}
              className="btn tw-bg-btnPrimary hover:tw-bg-btnPrimaryHover btn-sm"
            >
              <span className="mx-2 tw-text-white">Add Financial Account </span>
            </Link>
          </div>
        </div>
        <div className="tw-p-6 tw-px-8">
          <SearchPaginationList
            searchParamsArray={searchFilter}
            baseUrl={API_ROUTE.FINANCIAL_ACCOUNT}
            columns={tableColumns}
          />
        </div>
      </div>
    </div>
  );
};

export default FinancialAccountsList;
