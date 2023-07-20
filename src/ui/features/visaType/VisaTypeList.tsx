import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import API_ROUTE from "../../../service/api";
import { IRoleResponse } from "../../../types/payload.type";
import { ColumnDef } from "@tanstack/react-table";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import useMutation from "../../../hooks/useMutation";
import Modal2 from "../../shared/components/Modal2";
import { toast } from "react-toastify";
import AddVisaType from "./AddVisaType";
import TanStackTable from "../../shared/molecules/TanStackTable";
import useAuthContext from "../../../context/auth/useAuthContext";

const VisaTypeList = () => {
    const { companyInfo } = useAuthContext();
    const companyId = companyInfo?.id;

    const [selectedData, setSelectedData] = useState<
        IRoleResponse | undefined
    >();
    const [show, setShow] = useState<boolean>(false);
    const [openAddDocument, setOpenAddDocument] = useState(false);
    const [fetchAgain, setFetchAgain] = useState<boolean>(false);

    const getListUrl = API_ROUTE.GET_VISA_TYPES;

    const { data, fetchData } = useFetch<IRoleResponse[]>(getListUrl, true);

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
            accessorKey: "name",
            header: () => (
                <div>
                    <span>Visa Type</span>
                </div>
            ),
            cell: (info) => {
                return <div>{info.getValue<string>()}</div>;
            },
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
                    <div className='text-capitalize'>
                        <p className='truncate'> {info.getValue<string>()}</p>
                    </div>
                );
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
                        {/* <Dropdown.Item>
                            <div className='menu-link'>
                                <span className='mx-2'>View</span>
                                <i className='bi bi-box-arrow-up-right text-primary '></i>
                            </div>
                        </Dropdown.Item> */}
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

    const handleOpenNewModal = () => {
        setSelectedData(undefined);
        handleAddDocumentOpen();
    };

    return (
        <div>
            <div className='d-flex justify-content-between align-items-center mb-6'>
                <h4>Visa Type</h4>
                <button
                    onClick={handleOpenNewModal}
                    className='btn btn-success btn-sm'>
                    <span className='mx-2'>Add Visa Type</span>
                </button>
            </div>
            <section>
                <div className='card'>
                    {data && (
                        <TanStackTable columns={tableColumns} data={data} />
                    )}
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
