import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import API_ROUTE from "../../../../service/api";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import useMutation from "../../../../hooks/useMutation";
import Modal2 from "../../../shared/components/Modal2";
import { toast } from "react-toastify";
import AddVisaType from "./AddInformationChannel";
import useAuthContext from "../../../../context/auth/useAuthContext";
import TanStackTable from "../../../shared/molecules/TanStackTable";
const InformationChannelList = () => {
    const { companyInfo } = useAuthContext();
    const companyId = companyInfo?.id;
    const [selectedData, setSelectedData] = useState();
    const [show, setShow] = useState(false);
    const [openAddDocument, setOpenAddDocument] = useState(false);
    const [fetchAgain, setFetchAgain] = useState(false);
    const basUrl = API_ROUTE.CM_INFORMATION_CHANNEL;
    const searchParams = new URLSearchParams(window.location.search);
    const pageFromUrl = searchParams.get("page");
    const pageSizeFromUrl = searchParams.get("page_size");
    const page = pageFromUrl ? parseInt(pageFromUrl) : 1;
    const pageSize = pageSizeFromUrl ? parseInt(pageSizeFromUrl) : 15;
    const [fetchUrl, setFetchUrl] = useState(`${basUrl}?page=${page}&page_size=${pageSize}`);
    const { data, isloading, fetchDataById, pagination } = useFetch(basUrl, true);
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
            accessorKey: "description",
            header: () => (_jsx("div", { children: _jsx("span", { children: "Description" }) })),
            cell: (info) => {
                return (_jsx("div", { className: "text-capitalize", children: _jsxs("p", { className: "truncate", children: [" ", info.getValue()] }) }));
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
    const handleAddDocumentOpen = () => setOpenAddDocument(true);
    const handleOpenNewModal = () => {
        setSelectedData(undefined);
        handleAddDocumentOpen();
    };
    return (_jsxs("div", { children: [_jsx("section", { children: _jsxs("div", { className: "card", children: [_jsxs("div", { className: "card-header", children: [_jsx("h3", { className: "card-title", children: "Information Channels" }), _jsx("div", { className: "card-toolbar", children: _jsx("button", { onClick: handleOpenNewModal, className: "btn tw-bg-btnPrimary hover:tw-bg-btnPrimaryHover btn-sm", children: _jsx("span", { className: "mx-2 tw-text-white", children: "Add Information Channel" }) }) })] }), data && (
                        // <div className="tw-p-6 tw-px-8">
                        //   <PaginationTable
                        //     pagination={pagination}
                        //     baseUrl={basUrl}
                        //     columns={tableColumns}
                        //     data={data}
                        //     isLoading={isloading}
                        //     setFetchAgain={setFetchAgain}
                        //     setFetchUrl={setFetchUrl}
                        //   />
                        // </div>
                        _jsx("div", { className: "tw-p-6 tw-px-10", children: _jsx(TanStackTable, { columns: tableColumns, data: data }) }))] }) }), _jsx(Modal2, { title: "Are you sure you want to delete this vist type?", showChildren: true, cancelText: "Cancel", confirmText: "Delete", show: show, handleConfirm: handleDeleteItem, handleClose: handleClose, children: _jsx("div", { children: _jsx("div", { children: selectedData?.description }) }) }), _jsx(AddVisaType, { setFetchAgain: setFetchAgain, companyId: companyId || "", handleClose: handleAddDocumentClose, show: openAddDocument, selectedData: selectedData, setSelectedData: setSelectedData })] }));
};
export default InformationChannelList;
