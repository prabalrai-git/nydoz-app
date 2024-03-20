import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import API_ROUTE from "../../../service/api";
import { IDocumentResponse } from "../../../types/payload.type";
import TanStackTable from "../../shared/molecules/TanStackTable";
import { ColumnDef } from "@tanstack/react-table";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import useMutation from "../../../hooks/useMutation";
import Modal2 from "../../shared/components/Modal2";
import { toast } from "react-toastify";
import AddDocuments from "./AddDocuments";
import Images from "../../../constants/Images";
import useAuthContext from "../../../context/auth/useAuthContext";
import NotFound from "../../shared/molecules/NotFound";
import { Image, Space, Tag } from "antd";
import { GrView } from "react-icons/gr";
import {
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import APP_SETTING from "../../../config/AppSetting";

const DocumentList = () => {
  const { companyInfo } = useAuthContext();
  const companyId = companyInfo?.id;

  const [selectedData, setSelectedData] = useState<
    IDocumentResponse | undefined
  >();
  const [show, setShow] = useState<boolean>(false);
  const [openAddDocument, setOpenAddDocument] = useState(false);
  const [fetchAgain, setFetchAgain] = useState<boolean>(false);

  const getDocumentUrl = `${API_ROUTE.GET_DOCUMENTS_BY_COMPANY_ID}/${companyId}/documents`;

  const { data, fetchData } = useFetch<IDocumentResponse[]>(
    getDocumentUrl,
    true
  );

  const { deleteData } = useMutation(API_ROUTE.DELETE_COMPANY_BY_ID, true);

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

  const handleEditData = (item: IDocumentResponse) => {
    setSelectedData(item);
    handleAddDocumentOpen();
  };

  const onDownload = (src: string) => {
    fetch(src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.download = "image.png";
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
      });
  };

  const tableColumns: ColumnDef<IDocumentResponse>[] = [
    {
      accessorKey: "sn",
      header: () => <div>S.N</div>,
      cell: (info) => info.row.index + 1,
    },
    {
      accessorKey: "file_link",
      header: () => (
        <div>
          <i className="bi bi-folder me-2"></i>
          <span> File</span>
        </div>
      ),
      cell: (info) => {
        return (
          <div className="symbol symbol-label tw-flex tw-py-2  ">
            {/* <img className="img-fluid" src={Images.Folder} alt="Logo" /> */}
            <Image
              className="tw-object-cover tw-rounded-lg"
              width={40}
              height={40}
              preview={{
                mask: <GrView />,
                toolbarRender: (
                  _,
                  {
                    transform: { scale },
                    actions: {
                      onFlipY,
                      onFlipX,
                      onRotateLeft,
                      onRotateRight,
                      onZoomOut,
                      onZoomIn,
                    },
                  }
                ) => (
                  <Space size={12} className="toolbar-wrapper">
                    <DownloadOutlined
                      onClick={() =>
                        onDownload(
                          APP_SETTING.API_BASE_URL + info.getValue<string>()
                        )
                      }
                    />
                    <SwapOutlined rotate={90} onClick={onFlipY} />
                    <SwapOutlined onClick={onFlipX} />
                    <RotateLeftOutlined onClick={onRotateLeft} />
                    <RotateRightOutlined onClick={onRotateRight} />
                    <ZoomOutOutlined
                      disabled={scale === 1}
                      onClick={onZoomOut}
                    />
                    <ZoomInOutlined
                      disabled={scale === 50}
                      onClick={onZoomIn}
                    />
                  </Space>
                ),
              }}
              src={APP_SETTING.API_BASE_URL + info.getValue<string>()}
            />
          </div>
        );
      },
    },

    {
      accessorKey: "title",
      header: () => (
        <div>
          <span>File Name</span>
        </div>
      ),
      cell: (info) => {
        return <div>{info.getValue<string>()}</div>;
      },
    },

    {
      accessorKey: "is_restricted",
      header: () => (
        <div>
          <span>Type</span>
        </div>
      ),
      cell: (info) => {
        return (
          <div>
            {info?.row?.original?.is_restricted ? (
              <Tag color="green">Not Restricted</Tag>
            ) : (
              <Tag color="red">Restricted</Tag>
            )}
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

  const handleDeleteModal = (item: IDocumentResponse) => {
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
  const handleAddDocumentOpen = () => {
    setOpenAddDocument(true);
  };

  return (
    <div>
      <section>
        <div className="card ">
          <div className="d-flex card-header justify-content-between align-items-center mb-6">
            <h3 className="card-title">All Documents</h3>
            <button
              onClick={() => {
                setSelectedData(undefined);
                handleAddDocumentOpen();
              }}
              className="btn tw-bg-btnPrimary hover:tw-bg-btnPrimaryHover btn-sm"
            >
              <span className="mx-2 tw-text-white">Add Documents</span>
            </button>
          </div>
          {data && data?.length === 0 ? (
            <div>
              <NotFound title="Documents Not Available " />
            </div>
          ) : (
            <div className="tw-px-10">
              <TanStackTable columns={tableColumns} data={data ?? []} />
            </div>
          )}
        </div>
      </section>

      <Modal2
        title="Are you sure you want to delete this documents?"
        showChildren={true}
        cancelText="Cancel"
        confirmText="Delete"
        show={show}
        handleConfirm={handleDeleteItem}
        handleClose={handleClose}
      >
        <div>
          <h3>{selectedData?.title}</h3>
        </div>
      </Modal2>
      <AddDocuments
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

export default DocumentList;
