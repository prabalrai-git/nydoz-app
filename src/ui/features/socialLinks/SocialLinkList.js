import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import API_ROUTE from "../../../service/api";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import useMutation from "../../../hooks/useMutation";
import Modal2 from "../../shared/components/Modal2";
import { toast } from "react-toastify";
import SocialLinkAdd from "./SocialLinkAdd";
import TanStackTable from "../../shared/molecules/TanStackTable";
import useAuthContext from "../../../context/auth/useAuthContext";
import CopyToClipboard from "../../shared/molecules/CopyToClipboard";
const DocumentList = () => {
    const { companyInfo } = useAuthContext();
    const companyId = companyInfo?.id;
    const [selectedData, setSelectedData] = useState();
    const [show, setShow] = useState(false);
    const [openAddDocument, setOpenAddDocument] = useState(false);
    const [fetchAgain, setFetchAgain] = useState(false);
    const getListUrl = API_ROUTE.GET_SOCIAL_LINKS_BY_COMPANYID;
    const { data, fetchData, setPage, setPageSize, pagination } = useFetch(`${getListUrl}/${companyId}/social-links`, true);
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
            accessorKey: "title",
            header: () => (_jsx("div", { children: _jsx("span", { children: "Social Link" }) })),
            cell: (info) => {
                return _jsx("div", { children: info.getValue() });
            },
        },
        {
            accessorKey: "link",
            header: () => (_jsxs("div", { children: [_jsx("i", { className: "bi bi-globe2 me-2" }), _jsx("span", { children: "Website" })] })),
            cell: (info) => (_jsxs("div", { className: "tw-flex tw-items-center ", children: [_jsx("span", { children: info.getValue() }), _jsx(CopyToClipboard, { text: info.getValue() })] })),
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
    const handleAddDocumentOpen = () => setOpenAddDocument(true);
    const handleOpenNewModal = () => {
        setSelectedData(undefined);
        handleAddDocumentOpen();
    };
    return (_jsxs(_Fragment, { children: [_jsx("section", { children: _jsxs("div", { className: "card", children: [_jsxs("div", { className: "d-flex card-header justify-content-between align-items-center ", children: [_jsx("h3", { className: "card-title", children: "All Social Links" }), _jsx("button", { onClick: handleOpenNewModal, className: "btn  btn-sm tw-bg-btnPrimary hover:tw-bg-btnPrimaryHover", children: _jsx("span", { className: "mx-2 tw-text-white", children: "Add Social Links" }) })] }), data && (_jsx("div", { className: "tw-p-6 tw-px-8", children: _jsx(TanStackTable, { columns: tableColumns, data: data, setPage: setPage, setPageSize: setPageSize, setFetchAgain: setFetchAgain, pagination: pagination }) }))] }) }), _jsx(Modal2, { title: "Are you sure you want to delete this company?", showChildren: true, cancelText: "Cancel", confirmText: "Delete", show: show, handleConfirm: handleDeleteItem, handleClose: handleClose, children: _jsxs("div", { children: [_jsx("h4", { children: selectedData?.title }), _jsx("h3", { children: selectedData?.link })] }) }), _jsx(SocialLinkAdd, { setFetchAgain: setFetchAgain, companyId: companyId || "", handleClose: handleAddDocumentClose, show: openAddDocument, selectedData: selectedData, setSelectedData: setSelectedData })] }));
};
export default DocumentList;
