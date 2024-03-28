import { useMemo, useCallback, useState, useEffect } from "react";
import API_ROUTE from "../../../../service/api";
import { IStatusReponse } from "../../../../types/products.types";
import { ColumnDef } from "@tanstack/react-table";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Tag } from "antd";
import { IStatusResponse } from "../../../../types/payload.type";
import useAuthContext from "../../../../context/auth/useAuthContext";
import useFetch from "../../../../hooks/useFetch";
import TanStackTable from "../../../shared/molecules/TanStackTable";
import AddStatus from "./AddStatus";

const StatusList = () => {
  const navigate = useNavigate();

  const { companyInfo } = useAuthContext();

  const companyId = companyInfo?.id;

  const [selectedData, setSelectedData] = useState<
    IStatusResponse | undefined
  >();
  const [show, setShow] = useState<boolean>(false);
  const [openAddDocument, setOpenAddDocument] = useState(false);
  const [fetchAgain, setFetchAgain] = useState<boolean>(false);

  const getListUrl = API_ROUTE.STATUSES;

  const { data, fetchData } = useFetch<IStatusResponse[]>(
    getListUrl + "?page=2",
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

  const searchFilter: string[] = ["first_name", "email", "mobile"];

  const handleEditData = (item: IStatusReponse) => {
    setSelectedData(item);
    handleAddDocumentOpen();
  };

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
      // {
      //   accessorKey: "action_api_url",
      //   header: () => (
      //     <div>
      //       <span>Action Api URL</span>
      //     </div>
      //   ),
      //   cell: (info) => {
      //     return <div>{info.getValue<string>()}</div>;
      //   },
      // },
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

  const handleOpenNewModal = () => {
    setSelectedData(undefined);
    handleAddDocumentOpen();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAddDocumentClose = () => setOpenAddDocument(false);
  const handleAddDocumentOpen = () => setOpenAddDocument(true);

  return (
    <section>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">All Statuses</h3>
          <div className="card-toolbar">
            <button
              onClick={handleOpenNewModal}
              className="btn tw-bg-btnPrimary hover:tw-bg-btnPrimaryHover btn-sm"
            >
              <span className="mx-2 tw-text-white">Add Status</span>
            </button>
          </div>
        </div>
        {data && (
          <div className="tw-p-6 tw-px-8">
            <TanStackTable columns={tableColumns} data={data} />
          </div>
        )}
        <AddStatus
          setFetchAgain={setFetchAgain}
          companyId={companyId || ""}
          handleClose={handleAddDocumentClose}
          show={openAddDocument}
          selectedData={selectedData}
          setSelectedData={setSelectedData}
        />
      </div>
    </section>
  );
};

export default StatusList;
