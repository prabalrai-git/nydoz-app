import { useMemo, useCallback } from "react";
import API_ROUTE from "../../../../service/api";
import {
  IAgentResponse,
  IStatusReponse,
} from "../../../../types/products.types";
import { ColumnDef } from "@tanstack/react-table";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import SearchPaginationList from "../../../shared/components/SearchPaginationList";
import { Tag } from "antd";

const StatusList = () => {
  const navigate = useNavigate();
  const searchFilter: string[] = ["first_name", "email", "mobile"];

  const handleEditData = useCallback(
    (item: IStatusReponse) => {
      navigate("edit", {
        state: { data: item },
      });
    },
    [navigate]
  );

  const tableColumns: ColumnDef<IStatusReponse>[] = useMemo(
    () => [
      {
        accessorKey: "sn",
        header: () => <div>S.N</div>,
        cell: (info) => info.row.index + 1,
      },
      {
        accessorKey: "title",
        header: () => (
          <div>
            <span>Title</span>
          </div>
        ),
        cell: (info) => {
          return <div>{info.getValue<string>()}</div>;
        },
      },
      {
        accessorKey: "code",
        header: () => (
          <div>
            <span>Code</span>
          </div>
        ),
        cell: (info) => {
          return <div>{info.getValue<string>()}</div>;
        },
      },
      {
        accessorKey: "background_color_class",
        header: () => (
          <div>
            <span>Background Color Class</span>
          </div>
        ),
        cell: (info) => {
          return <div>{info.getValue<string>()}</div>;
        },
      },
      {
        accessorKey: "text_color_class",
        header: () => (
          <div>
            <span>Text Color Class</span>
          </div>
        ),
        cell: (info) => {
          return <div>{info.getValue<string>()}</div>;
        },
      },
      {
        accessorKey: "action_api_url",
        header: () => (
          <div>
            <span>Action Api URL</span>
          </div>
        ),
        cell: (info) => {
          return <div>{info.getValue<string>()}</div>;
        },
      },
      {
        accessorKey: "group_code",
        header: () => (
          <div>
            <span>Group Code</span>
          </div>
        ),
        cell: (info) => {
          return <div>{info.getValue<string>()}</div>;
        },
      },
      {
        accessorKey: "is_group_default",
        header: () => (
          <div>
            <span>Is Group Default</span>
          </div>
        ),
        cell: (info) => {
          return (
            <div>
              {info.getValue<boolean>() === false ? (
                <Tag color="red">False</Tag>
              ) : (
                <Tag color="green">True</Tag>
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
      <section>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Status's List</h3>
            <div className="card-toolbar">
              <Link to={`../add`} className="btn btn-success btn-sm">
                <span className="mx-2">Add Status</span>
              </Link>
            </div>
          </div>
          <SearchPaginationList
            searchParamsArray={searchFilter}
            baseUrl={API_ROUTE.STATUSES}
            columns={tableColumns}
          />
        </div>
      </section>
    </div>
  );
};

export default StatusList;
