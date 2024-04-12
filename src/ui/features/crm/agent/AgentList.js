import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import API_ROUTE from "../../../../service/api";
import BASE_URL from "../../../../constants/AppSetting";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate, useParams } from "react-router-dom";
import useMutation from "../../../../hooks/useMutation";
import Modal2 from "../../../shared/components/Modal2";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Flag, People } from "react-bootstrap-icons";
import NotFound from "../../../shared/molecules/NotFound";
import CompanyBreadcrumb from "../../../shared/molecules/CompanyBreadcrumb";
import SearchPaginationTable from "../../../shared/components/SearchPaginationTable";
const DocumentList = () => {
    const navigate = useNavigate();
    const { id: companyId } = useParams();
    const baseUrl = `${API_ROUTE.GET_CLIENT_MANAGEMENT_AGENTS}`;
    const searchParams = new URLSearchParams(window.location.search);
    const pageFromUrl = searchParams.get("page");
    const pageSizeFromUrl = searchParams.get("page_size");
    const page = pageFromUrl ? parseInt(pageFromUrl) : 1;
    const pageSize = pageSizeFromUrl ? parseInt(pageSizeFromUrl) : 15;
    const [fetchUrl, setFetchUrl] = useState(`${baseUrl}?page=${page}&page_size=${pageSize}`);
    const [show, setShow] = useState(false);
    const [fetchAgain, setFetchAgain] = useState(false);
    const [selectedData, setSelectedData] = useState();
    const { data, fetchDataById, pagination, isloading } = useFetch(baseUrl, true);
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
    // function for pagination
    // functions for edit data
    const handleEditData = (item) => {
        navigate("edit", {
            state: { data: item },
        });
    };
    const tableColumns = [
        {
            accessorKey: "sn",
            header: () => _jsx("div", { children: "S.N" }),
            cell: (info) => info.row.index + 1,
        },
        {
            accessorKey: "Name",
            header: () => (_jsxs("div", { children: [_jsx(People, { size: 16, className: "mx-2" }), _jsx("span", { children: "Name" })] })),
            cell: (info) => {
                const url = `${BASE_URL}${info?.row?.original?.profile_picture}`;
                return (_jsxs("div", { className: "d-flex align-items-center", children: [_jsx("div", { className: "symbol symbol-40px me-3", children: _jsx("img", { src: url, className: "", alt: "profile picture" }) }), _jsxs("div", { className: "d-flex justify-content-start flex-column", children: [_jsxs("a", { href: "#", className: "text-dark fw-bold text-hover-primary mb-1 fs-6", children: [info?.row?.original?.first_name, " ", info?.row?.original?.last_name] }), _jsx("span", { className: "text-muted fw-semibold d-block fs-7", children: info?.row?.original?.email })] })] }));
            },
        },
        {
            accessorKey: "mobile",
            header: () => (_jsxs("div", { children: [_jsx("i", { className: "bi bi-telephone me-2 fs-7" }), _jsx("span", { children: "Mobile Number" })] })),
            cell: (info) => {
                return _jsx("div", { children: info.getValue() });
            },
        },
        {
            accessorKey: "country",
            header: () => (_jsxs("div", { children: [_jsx(Flag, { size: 16, className: "mx-2" }), _jsx("span", { children: "Country" })] })),
            cell: (info) => {
                return _jsx("div", { children: info.getValue() });
            },
        },
        {
            accessorKey: "action",
            header: () => (_jsx("div", { className: "text-center", children: _jsx("span", { children: "Actions" }) })),
            cell: (info) => (_jsx("div", { className: "text-center", children: _jsxs(DropdownButton, { variant: "secondary", size: "sm", id: "dropdown-basic-button", title: "Action", children: [_jsx(Dropdown.Item, { children: _jsxs("div", { className: "menu-link", children: [_jsx("span", { className: "mx-2", children: "View" }), _jsx("i", { className: "bi bi-box-arrow-up-right text-primary " })] }) }), _jsx(Dropdown.Item, { children: _jsxs("div", { onClick: () => handleEditData(info?.row?.original), className: "menu-link", children: [_jsx("span", { className: "mx-2", children: "Edit" }), _jsx("i", { className: "bi bi-pencil-square text-info" })] }) }), _jsx(Dropdown.Item, { children: _jsxs("div", { onClick: () => handleDeleteModal(info?.row?.original), className: "menu-link", children: [_jsx("span", { className: "mx-2", children: "Delete" }), _jsx("i", { className: "bi bi-trash text-danger" })] }) })] }) })),
            footer: (info) => info.column.id,
        },
    ];
    // functions for delete modal
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
    return (_jsxs("div", { className: "px-3", children: [_jsx(CompanyBreadcrumb, { title: "Agents", btnText: "Back", showBreadcrumb: true }), _jsx("section", { children: _jsxs("div", { className: "card", children: [_jsxs("div", { className: "card-header", children: [_jsx("h3", { className: "card-title", children: "Agent's List" }), _jsx("div", { className: "card-toolbar", children: _jsx(Link, { to: `add`, className: "btn tw-bg-btnPrimary hover:tw-bg-btnPrimaryHover btn-sm", children: _jsx("span", { className: "mx-2 tw-text-white", children: "Add Agent" }) }) })] }), data && (
                        // <PaginationTable
                        //   pagination={pagination}
                        //   setFetchAgain={setFetchAgain}
                        //   columns={tableColumns as ColumnDef<unknown>[]}
                        //   data={data}
                        //   isLoading={isloading}
                        //   baseUrl={baseUrl}
                        //   setFetchUrl={setFetchUrl}
                        // />
                        _jsx(SearchPaginationTable, { pagination: pagination, setFetchAgain: setFetchAgain, columns: tableColumns, data: data, isLoading: isloading, baseUrl: baseUrl, searchParamsArray: ["first_name", "email", "mobile"], setFetchUrl: setFetchUrl })), !data?.length && !isloading && (_jsx("div", { className: "bg-white flex-center h-75vh", children: _jsx(NotFound, { title: "Someting Went Wrong. Agent Not Found. " }) }))] }) }), _jsx(Modal2, { title: "Are you sure you want to delete this agent ?", showChildren: true, cancelText: "Cancel", confirmText: "Delete", show: show, handleConfirm: handleDeleteItem, handleClose: handleClose, children: _jsx("div", { children: _jsx("h3", { children: selectedData?.email }) }) })] }));
};
export default DocumentList;
