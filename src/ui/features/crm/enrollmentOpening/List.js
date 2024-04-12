import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { Flag } from "react-bootstrap-icons";
import API_ROUTE from "../../../../service/api";
import Modal2 from "../../../shared/components/Modal2";
import moment from "moment";
import SearchPaginationList from "../../../shared/components/SearchPaginationList";
import useMutation from "../../../../hooks/useMutation";
import { GoEye } from "react-icons/go";
import { FaRegEdit } from "react-icons/fa";
import { Dropdown, DropdownButton } from "react-bootstrap";
const List = () => {
    const navigate = useNavigate();
    const { id: companyId } = useParams();
    const searchFilter = ["position"];
    const [selectedData, setSelectedData] = useState();
    const [show, setShow] = useState(false);
    const { deleteData } = useMutation(API_ROUTE.CM_ENROLLMENT_OPENINGS, true);
    const handleEditData = useCallback((item) => {
        navigate("../edit-enrollments-openings", {
            state: { data: item },
        });
    }, [navigate]);
    const handleDeleteModal = useCallback((item) => {
        setSelectedData(item);
        handleShow();
    }, []);
    const handleDeleteItem = async () => {
        const id = selectedData?.id;
        const payload = `${companyId}/documents/${id}}`;
        if (id) {
            try {
                const response = await deleteData(payload);
                if (response) {
                    toast.success("Deleted successfully");
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
    const tableColumns = useMemo(() => [
        {
            accessorKey: "sn",
            header: () => _jsx("div", { children: "S.N" }),
            cell: (info) => info.row.index + 1,
        },
        {
            accessorKey: "enroll_start_date",
            header: () => (_jsxs("div", { children: [_jsx("i", { className: "bi bi-globe me-2 fs-7" }), _jsx("span", { children: "Start Date" })] })),
            cell: (info) => {
                return (_jsx("div", { children: moment(info.getValue()).format("MMMM Do YYYY") }));
            },
        },
        {
            accessorKey: "enroll_end_date",
            header: () => (_jsxs("div", { children: [_jsx("i", { className: "bi bi-globe me-2 fs-7" }), _jsx("span", { children: "End Date" })] })),
            cell: (info) => {
                return (_jsx("div", { children: moment(info.getValue()).format("MMMM Do YYYY") }));
            },
        },
        {
            accessorKey: "total_opening",
            header: () => (_jsxs("div", { children: [_jsx("i", { className: "bi bi-globe me-2 fs-7" }), _jsx("span", { children: "Total Opening" })] })),
            cell: (info) => {
                return _jsx("div", { children: info.getValue() });
            },
        },
        {
            accessorKey: "position",
            header: () => (_jsxs("div", { children: [_jsx("i", { className: "bi bi-geo-alt me-2 fs-7" }), _jsx("span", { children: "Position" })] })),
            cell: (info) => {
                return _jsx("div", { children: info.getValue() });
            },
        },
        {
            accessorKey: "visa_type",
            header: () => (_jsxs("div", { className: "tw-flex", children: [_jsx(Flag, { size: 16, className: "mx-2" }), _jsx("span", { children: "Visa Type" })] })),
            cell: (info) => {
                return _jsx("div", { children: info.getValue()?.name });
            },
        },
        {
            accessorKey: "action",
            header: () => (_jsx("div", { className: "text-center", children: _jsx("span", { children: "Actions" }) })),
            cell: (info) => (_jsx("div", { className: "d-flex justify-content-center", children: _jsxs(DropdownButton, { variant: "secondary", size: "sm", id: "dropdown-basic-button", title: "Action", children: [_jsx(Dropdown.Item, { onClick: () => { }, children: _jsxs("div", { title: "view", className: "tw-flex tw-gap-2 tw-items-center tw-font-bold", children: [_jsx(GoEye, { color: "green", size: 15 }), _jsx("p", { children: "View" })] }) }), _jsx(Dropdown.Item, { onClick: () => handleEditData(info?.row?.original), children: _jsxs("div", { title: "Edit", className: "tw-flex tw-gap-2 tw-items-center tw-font-bold", children: [_jsx(FaRegEdit, { color: "blue", size: 15 }), _jsx("p", { children: "Edit" }), " "] }) })] }) })),
            footer: (info) => info.column.id,
        },
    ], [handleDeleteModal, handleEditData]);
    return (_jsxs("section", { children: [_jsxs("div", { className: "card", children: [_jsxs("div", { className: "card-header", children: [_jsx("h3", { className: "card-title", children: "Institution's Openings List" }), _jsx("div", { className: "card-toolbar", children: _jsx(Link, { to: "../add-enrollments-openings", className: "btn tw-bg-btnPrimary hover:tw-bg-btnPrimaryHover btn-sm ", children: _jsx("span", { className: "mx-2 tw-text-white", children: "Add Openings" }) }) })] }), _jsx("div", { className: "card-body", children: _jsx(SearchPaginationList, { searchParamsArray: searchFilter, baseUrl: API_ROUTE.CM_ENROLLMENT_OPENINGS, columns: tableColumns }) })] }), _jsx(Modal2, { title: "Are you sure ?", showChildren: true, cancelText: "Cancel", confirmText: "Delete", show: show, handleConfirm: handleDeleteItem, handleClose: handleClose, children: _jsx("div", { children: _jsx("h3", { children: selectedData?.position }) }) })] }));
};
export default List;
