import { useEffect, useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import API_ROUTE from "../../../../service/api";
import { InformationChannelResponse } from "../../../../types/products.types";
import { ColumnDef } from "@tanstack/react-table";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import useMutation from "../../../../hooks/useMutation";
import Modal2 from "../../../shared/components/Modal2";
import { toast } from "react-toastify";
import AddVisaType from "./AddInformationChannel";
import useAuthContext from "../../../../context/auth/useAuthContext";
import PaginationTable from "../../../shared/components/PaginationTable";

const VisaTypeList = () => {
  const { companyInfo } = useAuthContext();
  const companyId = companyInfo?.id;

  const [selectedData, setSelectedData] = useState<
    InformationChannelResponse | undefined
  >();
  const [show, setShow] = useState<boolean>(false);
  const [openAddDocument, setOpenAddDocument] = useState(false);
  const [fetchAgain, setFetchAgain] = useState<boolean>(false);

  const basUrl = API_ROUTE.CM_INFORMATION_CHANNEL;
  const searchParams = new URLSearchParams(window.location.search);
  const pageFromUrl = searchParams.get("page");
  const pageSizeFromUrl = searchParams.get("page_size");
  const page = pageFromUrl ? parseInt(pageFromUrl) : 1;
  const pageSize = pageSizeFromUrl ? parseInt(pageSizeFromUrl) : 15;
  const [fetchUrl, setFetchUrl] = useState(
    `${basUrl}?page=${page}&page_size=${pageSize}`
  );
  const { data, isloading, fetchDataById, pagination } = useFetch<
    InformationChannelResponse[]
  >(basUrl, true);

  const { deleteData } = useMutation(API_ROUTE.DELETE_COMPANY_BY_ID, true);

  useEffect(() => {
    fetchDataById(fetchUrl);
    setFetchAgain(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (fetchAgain) {
      fetchDataById(fetchUrl);
      setFetchAgain(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchAgain]);

  const handleEditData = (item: InformationChannelResponse) => {
    setSelectedData(item);
    handleAddDocumentOpen();
  };

  const tableColumns: ColumnDef<InformationChannelResponse>[] = [
    {
      accessorKey: "sn",
      header: () => <div>S.N</div>,
      cell: (info) => info.row.index + 1,
    },

    {
      accessorKey: "description",
      header: () => (
        <div>
          <span>Description</span>
        </div>
      ),
      cell: (info) => {
        return (
          <div className="text-capitalize">
            <p className="truncate"> {info.getValue<string>()}</p>
          </div>
        );
      },
    },

    {
      accessorKey: "action",
      header: () => <div className="text-center">Actions</div>,
      cell: (info) => (
        <div className="text-center">
          <DropdownButton
            variant="secondary"
            size="sm"
            id="dropdown-basic-button"
            title="Action"
          >
            {/* <Dropdown.Item>
                            <div className='menu-link'>
                                <span className='mx-2'>View</span>
                                <i className='bi bi-box-arrow-up-right text-primary '></i>
                            </div>
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
            <Dropdown.Item>
              <div
                onClick={() => handleDeleteModal(info?.row?.original)}
                className="menu-link"
              >
                <span className="mx-2">Delete</span>
                <i className="bi bi-trash text-danger"></i>
              </div>
            </Dropdown.Item>
          </DropdownButton>
        </div>
      ),
      footer: (info) => info.column.id,
    },
  ];

  const handleDeleteModal = (item: InformationChannelResponse) => {
    setSelectedData(item);
    handleShow();
  };

  const handleDeleteItem = async () => {
    const id = selectedData?.id;
    const payload = `${companyId}/documents/${id}}`;
    if (id) {
      try {
        const response = await deleteData(payload);
        if (response) {
          setFetchAgain(true);
          toast.success("Documents deleted successfully");
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        handleClose();
      }
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAddDocumentClose = () => setOpenAddDocument(false);
  const handleAddDocumentOpen = () => setOpenAddDocument(true);

  const handleOpenNewModal = () => {
    setSelectedData(undefined);
    handleAddDocumentOpen();
  };

  return (
    <div className="mt-6">
      <section>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Information Channel List</h3>
            <div className="card-toolbar">
              <button
                onClick={handleOpenNewModal}
                className="btn tw-bg-btnPrimary hover:tw-bg-btnPrimaryHover btn-sm"
              >
                <span className="mx-2 tw-text-white">
                  Add Information Channel
                </span>
              </button>
            </div>
          </div>
          {data && (
            <PaginationTable
              pagination={pagination}
              baseUrl={basUrl}
              columns={tableColumns}
              data={data}
              isLoading={isloading}
              setFetchAgain={setFetchAgain}
              setFetchUrl={setFetchUrl}
            />
          )}
        </div>
      </section>
      <Modal2
        title="Are you sure you want to delete this vist type?"
        showChildren={true}
        cancelText="Cancel"
        confirmText="Delete"
        show={show}
        handleConfirm={handleDeleteItem}
        handleClose={handleClose}
      >
        <div>
          <div>{selectedData?.description}</div>
        </div>
      </Modal2>
      <AddVisaType
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

export default VisaTypeList;
