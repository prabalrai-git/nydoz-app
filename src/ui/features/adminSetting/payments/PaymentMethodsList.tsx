import { useMemo, useCallback, useState, useEffect } from "react";
import API_ROUTE from "../../../../service/api";
import { IAgentResponse } from "../../../../types/products.types";
import { ColumnDef } from "@tanstack/react-table";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import SearchPaginationList from "../../../shared/components/SearchPaginationList";
import useAuthContext from "../../../../context/auth/useAuthContext";
import useFetch from "../../../../hooks/useFetch";
import TanStackTable from "../../../shared/molecules/TanStackTable";
import DynamicForm, { DynamicFormResponse } from "./AddPaymentMethods";
import { DynamicFormPayload } from "../../../../types/payload.type";
import { Tag } from "antd";

const PaymentList = () => {
  const navigate = useNavigate();

  const { companyInfo } = useAuthContext();

  const [selectedData, setSelectedData] = useState<
    DynamicFormPayload | undefined
  >();
  const [show, setShow] = useState<boolean>(false);
  const [openAddDocument, setOpenAddDocument] = useState(false);
  const [fetchAgain, setFetchAgain] = useState<boolean>(false);

  const getListUrl = API_ROUTE.PAYMENT_METHODS;

  const companyId = companyInfo?.id;

  const { data, fetchData } = useFetch<DynamicFormPayload[]>(getListUrl, true);

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

  const searchFilter: string[] = ["first_name", "email", "mobile"];

  const handleEditData = useCallback(
    (item: DynamicFormResponse) => {
      navigate("edit", {
        state: { data: item },
      });
    },
    [navigate]
  );

  const tableColumns: ColumnDef<DynamicFormResponse>[] = useMemo(
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
          <h3 className="card-title">All Payment Methods</h3>
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
              <span className="mx-2 tw-text-white">Add Payment Method</span>
            </button>
          </div>
        </div>
        {/* <div className="tw-p-6 tw-px-8">
          <SearchPaginationList
            searchParamsArray={searchFilter}
            baseUrl={API_ROUTE.PAYMENT_METHODS}
            columns={tableColumns}
          />
          
        </div> */}
        {data && (
          <div className="tw-p-6 tw-px-8">
            <TanStackTable columns={tableColumns} data={data} />
          </div>
        )}
        <DynamicForm
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

export default PaymentList;
