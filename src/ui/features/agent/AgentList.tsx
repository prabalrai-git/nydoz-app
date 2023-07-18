import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import API_ROUTE from "../../../service/api";
import { IAgentResponse } from "../../../types/payload.type";
import BASE_URL from "../../../constants/AppSetting";
import { ColumnDef } from "@tanstack/react-table";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate, useParams } from "react-router-dom";
import useMutation from "../../../hooks/useMutation";
import Modal2 from "../../shared/components/Modal2";
import { toast } from "react-toastify";
import DataListTable from "../../shared/components/DataListTable";
import { Link } from "react-router-dom";
import { Flag, People } from "react-bootstrap-icons";

const DocumentList = () => {
    const { id: companyId } = useParams<string>();
    const navigate = useNavigate();
    const [selectedData, setSelectedData] = useState<
        IAgentResponse | undefined
    >();
    const [show, setShow] = useState<boolean>(false);
    const [fetchAgain, setFetchAgain] = useState<boolean>(false);

    const getDocumentUrl = `${API_ROUTE.GET_CLIENT_MANAGEMENT_AGENTS}`;

    const { data, fetchData, pagination } = useFetch<IAgentResponse[]>(
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

    const handleEditData = (item: IAgentResponse) => {
        navigate("edit", {
            state: { data: item },
        });
    };

    const tableColumns: ColumnDef<IAgentResponse>[] = [
        {
            accessorKey: "sn",
            header: () => <div>S.N</div>,
            cell: (info) => info.row.index + 1,
        },
        {
            accessorKey: "Name",
            header: () => (
                <div>
                    <People size={16} className='mx-2' />
                    <span>Name</span>
                </div>
            ),
            cell: (info) => {
                const url = `${BASE_URL}${info?.row?.original?.profile_picture}`;
                return (
                    <div className='d-flex align-items-center'>
                        <div className='symbol symbol-40px me-3'>
                            <img src={url} className='' alt='profile picture' />
                        </div>
                        <div className='d-flex justify-content-start flex-column'>
                            <a
                                href='#'
                                className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                                {info?.row?.original?.first_name}{" "}
                                {info?.row?.original?.last_name}
                            </a>
                            <span className='text-muted fw-semibold d-block fs-7'>
                                {info?.row?.original?.email}
                            </span>
                        </div>
                    </div>
                );
            },
        },

        {
            accessorKey: "mobile",
            header: () => (
                <div>
                    <i className='bi bi-telephone me-2 fs-7'></i>
                    <span>Mobile Number</span>
                </div>
            ),
            cell: (info) => {
                return <div>{info.getValue<string>()}</div>;
            },
        },

        {
            accessorKey: "country",
            header: () => (
                <div>
                    <Flag size={16} className='mx-2' />
                    <span>Country</span>
                </div>
            ),
            cell: (info) => {
                return <div>{info.getValue<string>()}</div>;
            },
        },

        {
            accessorKey: "action",
            header: () => (
                <div className='text-center'>
                    <span>Actions</span>
                </div>
            ),
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

    const handleDeleteModal = (item: IAgentResponse) => {
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

    return (
        <div className='my-6 px-3'>
            <div className='d-flex justify-content-between align-items-center mb-6'>
                <h4>Agents List</h4>
                <Link to={`add`} className='btn btn-success btn-sm'>
                    <span className='mx-2'>Add Agent</span>
                </Link>
            </div>
            <section>
                <div className='card'>
                    <DataListTable
                        pagination={pagination}
                        columns={tableColumns as ColumnDef<unknown>[]}
                        data={data ?? []}
                        fetchData={fetchData}
                    />
                </div>
            </section>
            <Modal2
                title='Are you sure you want to delete this agent ?'
                showChildren={true}
                cancelText='Cancel'
                confirmText='Delete'
                show={show}
                handleConfirm={handleDeleteItem}
                handleClose={handleClose}>
                <div>
                    <h3>{selectedData?.email}</h3>
                </div>
            </Modal2>
        </div>
    );
};

export default DocumentList;
