import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import Heading from "../../shared/molecules/Heading";
import API_ROUTE from "../../../service/api";
import BASE_URL from "../../../constants/AppSetting";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import CopyToClipboard from "../../shared/molecules/CopyToClipboard";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../shared/molecules/Breadcrumb";
import useMutation from "../../../hooks/useMutation";
import Modal2 from "../../shared/components/Modal2";
import { toast } from "react-toastify";
import DataListTable from "../../shared/components/DataListTable";
const CompanyList = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [paginationState, setPaginationState] = useState({
        currentPage: 1,
        perPage: 5,
    });
    const initialURL = `${API_ROUTE.GET_COMPANIES}?page=${paginationState.currentPage}&per_page=${paginationState.perPage}&name=${searchTerm}`;
    const [fetchUrl, setFetchUrl] = useState(initialURL);
    const { data, fetchData, pagination } = useFetch(fetchUrl, true);
    const [selectedData, setSelectedData] = useState();
    const [show, setShow] = useState(false);
    const [fetchAgain, setFetchAgain] = useState(false);
    const { deleteData } = useMutation(API_ROUTE.DELETE_COMPANY_BY_ID, true);
    const handleEditData = (item) => {
        navigate(`/home/company/add`, {
            state: { data: item },
        });
    };
    useEffect(() => {
        fetchData();
        setFetchAgain(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchUrl]);
    useEffect(() => {
        if (fetchAgain) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchAgain]);
    const initialRender = useRef(true);
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        }
        else {
            const tempURL = `${API_ROUTE.GET_COMPANIES}?page=${paginationState.currentPage}&per_page=${paginationState.perPage}&name=${searchTerm}`;
            window.scrollTo(0, 0);
            setFetchUrl(tempURL);
        }
    }, [paginationState.currentPage, paginationState.perPage, searchTerm]);
    const tableColumns = [
        {
            accessorKey: "sn",
            header: () => _jsx("div", { children: "S.N" }),
            cell: (info) => info.row.index + 1,
        },
        {
            accessorKey: "logo",
            header: () => (_jsxs("div", { children: [_jsx("i", { className: "bi bi-card-image me-2" }), _jsx("span", { children: " Logo" })] })),
            cell: (info) => {
                const URL = `${BASE_URL}${info.getValue()}`;
                return (_jsx("div", { className: "symbol symbol-label", children: _jsx("img", { className: "img-fluid", src: URL, alt: "Logo" }) }));
            },
        },
        {
            accessorKey: "name",
            header: () => (_jsxs("div", { children: [_jsx("i", { className: "bi bi-building-check me-2" }), _jsx("span", { children: "Company's Name" })] })),
            cell: (info) => {
                const id = info?.row?.original?.id;
                return (_jsx(Link, { to: `/account/company/profile/${id}`, children: info.getValue() }));
            },
        },
        {
            accessorKey: "website",
            header: () => (_jsxs("div", { children: [_jsx("i", { className: "bi bi-globe2 me-2" }), _jsx("span", { children: "Website" })] })),
            cell: (info) => (_jsxs("div", { children: [_jsx("span", { children: info.getValue() }), _jsx(CopyToClipboard, { text: info.getValue() })] })),
        },
        {
            accessorKey: "email",
            header: () => (_jsxs("div", { children: [_jsx("i", { className: "bi bi-envelope me-2" }), _jsx("span", { children: "Email" })] })),
            cell: (info) => _jsx("div", { children: info.getValue() }),
        },
        {
            accessorKey: "country",
            header: () => (_jsxs("div", { children: [" ", _jsx("i", { className: "bi bi-flag me-2" }), _jsx("span", { children: "Country" })] })),
            cell: (info) => _jsx("div", { children: info.getValue() }),
        },
        {
            accessorKey: "action",
            header: () => _jsx("div", { className: "text-center", children: "Actions" }),
            cell: (info) => (_jsx("div", { className: "text-center", children: _jsxs(DropdownButton, { variant: "secondary", size: "sm", id: "dropdown-basic-button", title: _jsx("i", { className: "ki-solid ki-dots-vertical fs-2x me-1" }), children: [_jsx(Dropdown.Item, { children: _jsxs("div", { className: "menu-link", children: [_jsx("span", { className: "mx-2", children: "View" }), _jsx("i", { className: "bi bi-box-arrow-up-right text-primary " })] }) }), _jsx(Dropdown.Item, { children: _jsxs("div", { onClick: () => handleEditData(info?.row?.original), className: "menu-link", children: [_jsx("span", { className: "mx-2", children: "Edit" }), _jsx("i", { className: "bi bi-pencil-square text-info" })] }) }), _jsx(Dropdown.Item, { children: _jsxs("div", { onClick: () => handleDeleteModal(info?.row?.original), className: "menu-link", children: [_jsx("span", { className: "mx-2", children: "Delete" }), _jsx("i", { className: "bi bi-trash text-danger" })] }) })] }) })),
            footer: (info) => info.column.id,
        },
    ];
    const handleDeleteModal = (item) => {
        setSelectedData(item);
        handleShow();
    };
    const handleDeleteItem = async () => {
        const id = selectedData?.id;
        if (id) {
            try {
                const response = await deleteData(id);
                if (response) {
                    setFetchAgain(true);
                    toast.success("Company deleted successfully");
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
    const handleNext = () => {
        if (paginationState.currentPage === pagination?.last_page)
            return;
        setPaginationState((prevState) => ({
            ...prevState,
            currentPage: prevState.currentPage + 1,
        }));
    };
    const handlePrevious = () => {
        if (paginationState.currentPage === 1)
            return;
        setPaginationState((prevState) => ({
            ...prevState,
            currentPage: prevState.currentPage - 1,
        }));
    };
    const handlePerPageChange = (e) => {
        setPaginationState((prevState) => ({
            ...prevState,
            perPage: e.target.value,
        }));
    };
    return (_jsxs("div", { children: [_jsx(Heading, { title: "Company List", btnText: "Back", showBreadcrumb: true, children: _jsx(Breadcrumb, { parent: "company", parentLink: "/account/company/list", child: "List" }) }), _jsx("section", { children: _jsx("div", { className: "card", children: _jsx("section", { children: _jsx(DataListTable, { searchTerm: searchTerm, setSearchTerm: setSearchTerm, showSearchBar: true, pagination: pagination, columns: tableColumns, data: data ?? [], showPagination: true, setFetchAgain: setFetchAgain, handlePrevious: handlePrevious, handleNext: handleNext, handlePerPageChange: handlePerPageChange }) }) }) }), _jsx(Modal2, { title: "Are you sure you want to delete this company?", showChildren: true, cancelText: "Cancel", confirmText: "Delete", show: show, handleConfirm: handleDeleteItem, handleClose: handleClose, children: _jsx("div", { children: _jsx("h3", { children: selectedData?.name }) }) })] }));
};
export default CompanyList;
