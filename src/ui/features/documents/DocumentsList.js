import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import API_ROUTE from "../../../service/api";
import TanStackTable from "../../shared/molecules/TanStackTable";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import useMutation from "../../../hooks/useMutation";
import Modal2 from "../../shared/components/Modal2";
import { toast } from "react-toastify";
import AddDocuments from "./AddDocuments";
import useAuthContext from "../../../context/auth/useAuthContext";
import NotFound from "../../shared/molecules/NotFound";
import { Image, Space, Tag } from "antd";
import { GrView } from "react-icons/gr";
import { DownloadOutlined, RotateLeftOutlined, RotateRightOutlined, SwapOutlined, ZoomInOutlined, ZoomOutOutlined, } from "@ant-design/icons";
import APP_SETTING from "../../../config/AppSetting";
const DocumentList = () => {
    const { companyInfo } = useAuthContext();
    const companyId = companyInfo?.id;
    const [selectedData, setSelectedData] = useState();
    const [show, setShow] = useState(false);
    const [openAddDocument, setOpenAddDocument] = useState(false);
    const [fetchAgain, setFetchAgain] = useState(false);
    const getDocumentUrl = `${API_ROUTE.GET_DOCUMENTS_BY_COMPANY_ID}/${companyId}/documents`;
    const { data, fetchData, setPage, setPageSize, pagination } = useFetch(getDocumentUrl, true);
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
    const handleEditData = (item) => {
        setSelectedData(item);
        handleAddDocumentOpen();
    };
    const onDownload = (src) => {
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
    const tableColumns = [
        {
            accessorKey: "sn",
            header: () => _jsx("div", { children: "S.N" }),
            cell: (info) => info.row.index + 1,
        },
        {
            accessorKey: "file_link",
            header: () => (_jsxs("div", { children: [_jsx("i", { className: "bi bi-folder me-2" }), _jsx("span", { children: " File" })] })),
            cell: (info) => {
                return (_jsx("div", { className: "symbol symbol-label tw-flex tw-py-2 tw-z-50  ", children: _jsx(Image, { className: "tw-object-cover tw-rounded-lg", width: 40, height: 40, preview: {
                            mask: _jsx(GrView, {}),
                            toolbarRender: (_, { transform: { scale }, actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn, }, }) => (_jsxs(Space, { size: 12, className: "toolbar-wrapper", children: [_jsx(DownloadOutlined, { onClick: () => onDownload(APP_SETTING.API_BASE_URL + info.getValue()) }), _jsx(SwapOutlined, { rotate: 90, onClick: onFlipY }), _jsx(SwapOutlined, { onClick: onFlipX }), _jsx(RotateLeftOutlined, { onClick: onRotateLeft }), _jsx(RotateRightOutlined, { onClick: onRotateRight }), _jsx(ZoomOutOutlined, { disabled: scale === 1, onClick: onZoomOut }), _jsx(ZoomInOutlined, { disabled: scale === 50, onClick: onZoomIn })] })),
                        }, src: APP_SETTING.API_BASE_URL + info.getValue() }) }));
            },
        },
        {
            accessorKey: "title",
            header: () => (_jsx("div", { children: _jsx("span", { children: "File Name" }) })),
            cell: (info) => {
                return _jsx("div", { children: info.getValue() });
            },
        },
        {
            accessorKey: "is_restricted",
            header: () => (_jsx("div", { children: _jsx("span", { children: "Type" }) })),
            cell: (info) => {
                return (_jsx("div", { children: info?.row?.original?.is_restricted ? (_jsx(Tag, { color: "green", children: "Not Restricted" })) : (_jsx(Tag, { color: "red", children: "Restricted" })) }));
            },
        },
        {
            accessorKey: "action",
            header: () => _jsx("div", { className: "text-center", children: "Actions" }),
            cell: (info) => (_jsx("div", { className: "text-center", children: _jsxs(DropdownButton, { variant: "secondary", size: "sm", id: "dropdown-basic-button", title: "Action", children: [_jsx(Dropdown.Item, { children: _jsxs("div", { onClick: () => handleEditData(info?.row?.original), className: "menu-link", children: [_jsx("span", { className: "mx-2", children: "Edit" }), _jsx("i", { className: "bi bi-pencil-square text-info" })] }) }), _jsx(Dropdown.Item, { children: _jsxs("div", { onClick: () => handleDeleteModal(info?.row?.original), className: "menu-link", children: [_jsx("span", { className: "mx-2", children: "Delete" }), _jsx("i", { className: "bi bi-trash text-danger" })] }) })] }) })),
            footer: (info) => info.column.id,
        },
    ];
    const handleDeleteModal = (item) => {
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
                }
                else {
                    toast.error("Something went wrong");
                }
            }
            catch (error) {
                toast.error("Something went wrong");
            }
            finally {
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
    console.log(pagination, "pagination");
    return (_jsxs("div", { children: [_jsx("section", { children: _jsxs("div", { className: "card ", children: [_jsxs("div", { className: "d-flex card-header justify-content-between align-items-center mb-6", children: [_jsx("h3", { className: "card-title", children: "All Documents" }), _jsx("button", { onClick: () => {
                                        setSelectedData(undefined);
                                        handleAddDocumentOpen();
                                    }, className: "btn tw-bg-btnPrimary hover:tw-bg-btnPrimaryHover btn-sm", children: _jsx("span", { className: "mx-2 tw-text-white", children: "Add Documents " }) })] }), data && data?.length === 0 ? (_jsx("div", { children: _jsx(NotFound, { title: "Documents Not Available " }) })) : (_jsx("div", { className: "tw-px-10", children: _jsx(TanStackTable, { columns: tableColumns, data: data ?? [], setPage: setPage, setPageSize: setPageSize, setFetchAgain: setFetchAgain, pagination: pagination }) }))] }) }), _jsx(Modal2, { title: "Are you sure you want to delete this documents?", showChildren: true, cancelText: "Cancel", confirmText: "Delete", show: show, handleConfirm: handleDeleteItem, handleClose: handleClose, children: _jsx("div", { children: _jsx("h3", { children: selectedData?.title }) }) }), _jsx(AddDocuments, { setFetchAgain: setFetchAgain, companyId: companyId || "", handleClose: handleAddDocumentClose, show: openAddDocument, selectedData: selectedData, setSelectedData: setSelectedData })] }));
};
export default DocumentList;
