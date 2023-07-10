import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import API_ROUTE from "../../../service/api";
import { IRoleResponse, IRolePayload } from "../../../types/payload.type";
import { ColumnDef } from "@tanstack/react-table";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useParams } from "react-router-dom";
import useMutation from "../../../hooks/useMutation";
import Modal2 from "../../shared/components/Modal2";
import { ToastContainer, toast } from "react-toastify";
import AddRoles from "./AddRole";
import Images from "../../../constants/Images";
import DataListTable from "../../shared/components/DataListTable";

const DocumentList = () => {
    const { id: companyId } = useParams<string>();

    const [selectedData, setSelectedData] = useState<
        IRoleResponse | undefined
    >();
    const [show, setShow] = useState<boolean>(false);
    const [openAddDocument, setOpenAddDocument] = useState(false);
    const [fetchAgain, setFetchAgain] = useState<boolean>(false);

    const getListUrl = API_ROUTE.GET_ROLES;

    const { data, fetchData, pagination } = useFetch<IRoleResponse[]>(
        getListUrl,
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

    const handleEditData = (item: IRoleResponse) => {
        setSelectedData(item);
        handleAddDocumentOpen();
    };

    const tableColumns: ColumnDef<IRoleResponse>[] = [
        {
            accessorKey: "sn",
            header: () => <div>S.N</div>,
            cell: (info) => info.row.index + 1,
        },
        {
            accessorKey: "File",
            header: () => (
                <div>
                    <i className='bi bi-folder me-2'></i>
                    <span> File</span>
                </div>
            ),
            cell: () => {
                return (
                    <div className='symbol symbol-label '>
                        <img
                            className='img-fluid'
                            src={Images.Folder}
                            alt='Logo'
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
            accessorKey: "company_id",
            header: () => (
                <div>
                    <span>Type</span>
                </div>
            ),
            cell: (info) => {
                return <div>{info?.row?.original?.company_id}</div>;
            },
        },

        {
            accessorKey: "action",
            header: () => <div className='text-center'>Actions</div>,
            cell: (info) => (
                <div className='text-center'>
                    <DropdownButton
                        variant='secondary'
                        size='sm'
                        id='dropdown-basic-button'
                        title='Action'>
                        <Dropdown.Item>
                            <div className='menu-link'>
                                <span className='mx-2'>View</span>
                                <i className='bi bi-box-arrow-up-right text-primary '></i>
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <div
                                onClick={() =>
                                    handleEditData(info?.row?.original)
                                }
                                className='menu-link'>
                                <span className='mx-2'>Edit</span>
                                <i className='bi bi-pencil-square text-info'></i>
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <div
                                onClick={() =>
                                    handleDeleteModal(info?.row?.original)
                                }
                                className='menu-link'>
                                <span className='mx-2'>Delete</span>
                                <i className='bi bi-trash text-danger'></i>
                            </div>
                        </Dropdown.Item>
                    </DropdownButton>
                </div>
            ),
            footer: (info) => info.column.id,
        },
    ];

    const handleDeleteModal = (item: IRoleResponse) => {
        setSelectedData(item);
        handleShow();
        console.log(item);
    };

    const handleDeleteItem = async () => {
        const id = selectedData?.id;
        const payload = `${companyId}/documents/${id}}`;
        if (id) {
            try {
                const response = await deleteData(payload);
                console.log(response);
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

    return (
        <div>
            <div className='d-flex justify-content-between align-items-center mb-6'>
                <h4>Roles List</h4>
                <button
                    onClick={handleAddDocumentOpen}
                    className='btn btn-info btn-sm'>
                    <span className='mx-2'>Add Roles</span>
                </button>
            </div>
            <section>
                <div className='card'>
                    <DataListTable
                        data={data ?? []}
                        columns={tableColumns}
                        showSearchBar={false}
                        pagination={pagination}
                        fetchData={fetchData}
                        showPagination={false}
                    />
                </div>
            </section>
            <Modal2
                title='Are you sure you want to delete this company?'
                showChildren={true}
                cancelText='Cancel'
                confirmText='Delete'
                show={show}
                handleConfirm={handleDeleteItem}
                handleClose={handleClose}>
                <div>
                    <h3>{selectedData?.name}</h3>
                </div>
            </Modal2>
            <AddRoles
                setFetchAgain={setFetchAgain}
                companyId={companyId || ""}
                handleClose={handleAddDocumentClose}
                show={openAddDocument}
                selectedData={selectedData}
                setSelectedData={setSelectedData}
            />
            <ToastContainer />
        </div>
    );
};

export default DocumentList;
