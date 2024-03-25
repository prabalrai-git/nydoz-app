import { useMemo, useCallback, useState, useEffect } from "react";
import API_ROUTE from "../../../../service/api";
import { IAgentResponse } from "../../../../types/products.types";
import { ColumnDef } from "@tanstack/react-table";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SearchPaginationList from "../../../shared/components/SearchPaginationList";
import { Tag } from "antd";
import useAuthContext from "../../../../context/auth/useAuthContext";
import { ITransactionTypeFields } from "../../../../types/payload.type";
import useFetch from "../../../../hooks/useFetch";
import TanStackTable from "../../../shared/molecules/TanStackTable";
import AddTransactionTypes from "./AddTransactionTypes";

export interface ITransactionTypeResponse extends ITransactionTypeFields {
  id: string;
}

const TransactionTypesList = () => {
  const navigate = useNavigate();
  const searchFilter: string[] = ["name", "description", "transaction_effect"];
  const { companyInfo } = useAuthContext();

  const companyId = companyInfo?.id;

  const [selectedData, setSelectedData] = useState<
    ITransactionTypeResponse | undefined
  >();
  const [show, setShow] = useState<boolean>(false);
  const [openAddDocument, setOpenAddDocument] = useState(false);
  const [fetchAgain, setFetchAgain] = useState<boolean>(false);

  const getListUrl = API_ROUTE.TRANSACTION_TYPE;

  const { data, fetchData } = useFetch<ITransactionTypeResponse[]>(
    getListUrl,
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

  const handleEditData = useCallback(
    (item: ITransactionTypeResponse) => {
      navigate("edit", {
        state: { data: item },
      });
    },
    [navigate]
  );

  const tableColumns: ColumnDef<ITransactionTypeResponse>[] = useMemo(
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAddDocumentClose = () => setOpenAddDocument(false);
  const handleAddDocumentOpen = () => setOpenAddDocument(true);

  const handleOpenNewModal = () => {
    setSelectedData(undefined);
    handleAddDocumentOpen();
  };

  return (
    <div className="my-6 px-3">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">All Transaction Types</h3>
          <div className="card-toolbar">
            <button
              onClick={handleOpenNewModal}
              className="btn tw-bg-btnPrimary hover:tw-bg-btnPrimaryHover btn-sm"
            >
              <span className="mx-2 tw-text-white">Add Transaction Type</span>
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
            baseUrl={API_ROUTE.TRANSACTION_TYPE}
            columns={tableColumns}
          />
        </div> */}
        <AddTransactionTypes
          setFetchAgain={setFetchAgain}
          companyId={companyId || ""}
          handleClose={handleAddDocumentClose}
          show={openAddDocument}
          selectedData={selectedData}
          setSelectedData={setSelectedData}
        />
      </div>
    </div>
  );
};

export default TransactionTypesList;
