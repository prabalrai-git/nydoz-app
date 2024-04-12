import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import API_ROUTE from "../../../../service/api";
import TanStackTable from "../../../shared/molecules/TanStackTable";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import useMutation from "../../../../hooks/useMutation";
import Modal2 from "../../../shared/components/Modal2";
import { toast } from "react-toastify";
import AddDocuments from "../../../features/documents/AddDocuments";
import Images from "../../../../constants/Images";
import useAuthContext from "../../../../context/auth/useAuthContext";
import NotFound from "../../../shared/molecules/NotFound";
const DocumentList = () => {
    const { companyInfo } = useAuthContext();
    const companyId = companyInfo?.id;
    const [selectedData, setSelectedData] = useState();
    const [show, setShow] = useState(false);
    const [openAddDocument, setOpenAddDocument] = useState(false);
    const [fetchAgain, setFetchAgain] = useState(false);
    const getDocumentUrl = `${API_ROUTE.GET_DOCUMENTS_BY_COMPANY_ID}/${companyId}/documents`;
    const { data, fetchData } = useFetch(getDocumentUrl, true);
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
    const tableColumns = [
        {
            accessorKey: "sn",
            header: () => _jsx("div", { children: "S.N" }),
            cell: (info) => info.row.index + 1,
        },
        {
            accessorKey: "File",
            header: () => (_jsxs("div", { children: [_jsx("i", { className: "bi bi-folder me-2" }), _jsx("span", { children: " File" })] })),
            cell: () => {
                return (_jsx("div", { className: "symbol symbol-label ", children: _jsx("img", { className: "img-fluid", src: Images.Folder, alt: "Logo" }) }));
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
                return (_jsx("div", { children: info?.row?.original?.is_restricted ? (_jsx("span", { className: "badge text-bg-primary", children: "Not Restricted" })) : (_jsx("span", { className: "badge text-bg-danger", children: "Restricted" })) }));
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
    return (_jsxs("div", { children: [_jsxs("div", { className: "d-flex justify-content-between align-items-center mb-6", children: [_jsx("h4", { children: "Documents List" }), _jsx("button", { onClick: () => {
                            setSelectedData(undefined);
                            handleAddDocumentOpen();
                        }, className: "btn btn-success btn-sm", children: _jsx("span", { className: "mx-2", children: "Add Documents" }) })] }), _jsx("section", { children: _jsx("div", { className: "card ", children: data && data?.length === 0 ? (_jsx("div", { children: _jsx(NotFound, { title: "Documents Not Available " }) })) : (_jsx(TanStackTable, { columns: tableColumns, data: data ?? [] })) }) }), _jsx(Modal2, { title: "Are you sure you want to delete this documents?", showChildren: true, cancelText: "Cancel", confirmText: "Delete", show: show, handleConfirm: handleDeleteItem, handleClose: handleClose, children: _jsx("div", { children: _jsx("h3", { children: selectedData?.title }) }) }), _jsx(AddDocuments, { setFetchAgain: setFetchAgain, companyId: companyId || "", handleClose: handleAddDocumentClose, show: openAddDocument, selectedData: selectedData, setSelectedData: setSelectedData })] }));
};
export default DocumentList;
