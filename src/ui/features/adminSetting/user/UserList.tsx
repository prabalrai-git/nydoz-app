import { useMemo, useCallback, useState, useEffect } from "react";
import API_ROUTE from "../../../../service/api";
import {} from "../../../../types/products.types";
import { ColumnDef } from "@tanstack/react-table";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from "react-router-dom";

import AddUsers, { IFormData } from "./AddUser";
import useAuthContext from "../../../../context/auth/useAuthContext";
import useFetch from "../../../../hooks/useFetch";
import TanStackTable from "../../../shared/molecules/TanStackTable";
import { Tag } from "antd";

const UserList = () => {
  const navigate = useNavigate();
  const { companyInfo } = useAuthContext();

  const companyId = companyInfo?.id;

  const [selectedData, setSelectedData] = useState<IFormResponse | undefined>();
  const [show, setShow] = useState<boolean>(false);
  const [openAddDocument, setOpenAddDocument] = useState(false);
  const [fetchAgain, setFetchAgain] = useState<boolean>(false);

  const getListUrl = API_ROUTE.USER;

  const { data, fetchData } = useFetch<IFormResponse[]>(
    getListUrl + "?page=1",
    true
  );

  useEffect(() => {
    fetchData();
    setFetchAgain(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (fetchAgain) {
      fetchData();
      setFetchAgain(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchAgain]);

  interface IFormResponse extends IFormData {
    id: string;
  }

  const handleEditData = (item: IFormResponse) => {
    setSelectedData(item);
    handleAddDocumentOpen();
  };

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
                  className="text-dark fw-bold text-hover-primary mb-1 fs-6 tw-capitalize"
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
        accessorKey: "status",
        header: () => (
          <div>
            <span>Status</span>
          </div>
        ),
        cell: (info) => {
          if (info.getValue<Record<string, string>>()?.title) {
            return info
              .getValue<Record<string, string>>()
              .title?.toLowerCase() === "inactive" ? (
              <Tag color="red">Inactive</Tag>
            ) : (
              <Tag color="green">Active</Tag>
            );
          } else {
            return <Tag>N/A</Tag>;
          }
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
              {/* <Dropdown.Item>
                <Link
                  to={`../view/${info?.row?.original?.id}`}
                  className="menu-link"
                >
                  <span className="mx-2">View</span>
                  <i className="bi bi-box-arrow-up-right text-primary "></i>
                </Link>
              </Dropdown.Item> */}
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAddDocumentClose = () => setOpenAddDocument(false);
  const handleAddDocumentOpen = () => setOpenAddDocument(true);

  const handleOpenNewModal = () => {
    setSelectedData(undefined);
    handleAddDocumentOpen();
  };

  return (
    <div>
      <section>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">All Users</h3>
            <div className="card-toolbar">
              <button
                onClick={handleOpenNewModal}
                className="btn tw-bg-btnPrimary hover:tw-bg-btnPrimaryHover btn-sm"
              >
                <span className="mx-2 tw-text-white">Add User</span>
              </button>
            </div>
          </div>
          {data && (
            <div className="tw-p-6 tw-px-8">
              <TanStackTable columns={tableColumns} data={data} />
            </div>
          )}
          {/* <div className="tw-p-6 tw-px-8">
            <SearchPaginationList
              searchParamsArray={searchFilter}
              baseUrl={API_ROUTE.USER}
              columns={tableColumns}
            />
          </div> */}
        </div>
      </section>
      <AddUsers
        setFetchAgain={setFetchAgain}
        companyId={companyId || ""}
        handleClose={handleAddDocumentClose}
        show={openAddDocument}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
      />
    </div>
  );
};

export default UserList;
