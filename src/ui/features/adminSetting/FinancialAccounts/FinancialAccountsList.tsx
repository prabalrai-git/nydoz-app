import { useMemo, useCallback, useState, useEffect } from "react";
import API_ROUTE from "../../../../service/api";
import { ColumnDef } from "@tanstack/react-table";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";
import { IFinancialAccountFields } from "../../../../types/payload.type";
import useAuthContext from "../../../../context/auth/useAuthContext";
import TanStackTable from "../../../shared/molecules/TanStackTable";
import AddFinancialAccount from "./AddFinancialAccount";

export interface IFinancialAccountReponse extends IFinancialAccountFields {
  id: string;
}

const FinancialAccountsList = () => {
  const navigate = useNavigate();

  const { companyInfo } = useAuthContext();

  const [selectedData, setSelectedData] = useState<
    IFinancialAccountReponse | undefined
  >();
  const [show, setShow] = useState<boolean>(false);
  const [openAddDocument, setOpenAddDocument] = useState(false);
  const [fetchAgain, setFetchAgain] = useState<boolean>(false);

  const companyId = companyInfo?.id;
  const searchFilter: string[] = [
    "institute_name",
    "account_name",
    "account_number",
    "swift_code",
  ];

  const getListUrl = API_ROUTE.FINANCIAL_ACCOUNT;

  const { data, fetchData } = useFetch<IFinancialAccountReponse[]>(
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

  const handleEditData = (item: IFinancialAccountReponse) => {
    setSelectedData(item);
    handleAddDocumentOpen();
  };

  const tableColumns: ColumnDef<IFinancialAccountReponse>[] = useMemo(
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
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">All Financial Accounts</h3>
        <div className="card-toolbar">
          {/* <Link
              to={"../add"}
              className="btn tw-bg-btnPrimary hover:tw-bg-btnPrimaryHover btn-sm"
            >
                </Link> */}
          <button
            onClick={handleOpenNewModal}
            className="btn tw-bg-btnPrimary hover:tw-bg-btnPrimaryHover btn-sm"
          >
            <span className="mx-2 tw-text-white">Add Financial Account </span>
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
            baseUrl={API_ROUTE.FINANCIAL_ACCOUNT}
            columns={tableColumns}
          />
        </div> */}
      <AddFinancialAccount
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

export default FinancialAccountsList;
