import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { Flag, People } from "react-bootstrap-icons";
import { ColumnDef } from "@tanstack/react-table";
import Dropdown from "react-bootstrap/Dropdown";
import useFetch from "../../../../hooks/useFetch";
import API_ROUTE from "../../../../service/api";
import { IEnrollmentResponse } from "../../../../types/products.types";
import BASE_URL from "../../../../constants/AppSetting";
import DropdownButton from "react-bootstrap/DropdownButton";
import useMutation from "../../../../hooks/useMutation";
import Modal2 from "../../../shared/components/Modal2";

import PaginationTable from "../../../shared/components/PaginationTable";
import NotFound from "../../../shared/molecules/NotFound";
import CompanyBreadcrumb from "../../../shared/molecules/CompanyBreadcrumb";

const DocumentList = () => {
    const navigate = useNavigate();
    const { id: companyId } = useParams<string>();
    const baseUrl = `${API_ROUTE.CM_ENROLLMENT}`;
    const searchParams = new URLSearchParams(window.location.search);
    const pageFromUrl = searchParams.get("page");
    const pageSizeFromUrl = searchParams.get("page_size");
    const page = pageFromUrl ? parseInt(pageFromUrl) : 1;
    const pageSize = pageSizeFromUrl ? parseInt(pageSizeFromUrl) : 15;

    const [fetchUrl, setFetchUrl] = useState(
        `${baseUrl}?page=${page}&page_size=${pageSize}`
    );
    const [show, setShow] = useState<boolean>(false);
    const [fetchAgain, setFetchAgain] = useState<boolean>(false);
    const [selectedData, setSelectedData] = useState<
        IEnrollmentResponse | undefined
    >();

    const { data, fetchDataById, pagination, isloading } = useFetch<
        IEnrollmentResponse[]
    >(baseUrl, true);

    const { deleteData } = useMutation(API_ROUTE.DELETE_COMPANY_BY_ID, true);

    useEffect(() => {
        fetchDataById(fetchUrl);
        setFetchAgain(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (fetchAgain) {
            console.log("fetch again");
            fetchDataById(fetchUrl);
            setFetchAgain(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchAgain]);

    // function for pagination

    // functions for edit data
    const handleEditData = (item: IEnrollmentResponse) => {
        navigate("edit", {
            state: { data: item },
        });
    };

    const tableColumns: ColumnDef<IEnrollmentResponse>[] = [
        {
            accessorKey: "sn",
            header: () => <div>S.N</div>,
            cell: (info) => info.row.index + 1,
        },
        {
            accessorKey: "Name",
            header: () => (
                <div>
                    <i className='bi bi-building-fill-add fs-7 me-2'></i>
                    <span>Institute's Name</span>
                </div>
            ),
            cell: (info) => {
                const url = `${BASE_URL}${info?.row?.original?.logo}`;
                return (
                    <div className='d-flex align-items-center'>
                        <div className='symbol symbol-40px me-3'>
                            <img src={url} className='' alt='Logo' />
                        </div>
                        <div className='d-flex justify-content-start flex-column'>
                            <div className='text-dark fw-bold text-hover-primary mb-1 fs-7'>
                                {info?.row?.original?.name}
                            </div>
                            <a
                                href={info?.row?.original?.website}
                                className='text-muted fw-semibold d-block fs-7'>
                                {info?.row?.original?.website}
                            </a>
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: "website",
            header: () => (
                <div>
                    <i className='bi bi-globe me-2 fs-7'></i>
                    <span>Website</span>
                </div>
            ),
            cell: (info) => {
                return <div>{info.getValue<string>()}</div>;
            },
        },

        {
            accessorKey: "state",
            header: () => (
                <div>
                    <i className='bi bi-geo-alt me-2 fs-7'></i>
                    <span>State</span>
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

    // functions for delete modal

    const handleDeleteModal = (item: IEnrollmentResponse) => {
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
            <CompanyBreadcrumb
                title='Agents'
                btnText='Back'
                showBreadcrumb={true}
            />
            <section>
                <div className='card'>
                    <div className='card-header'>
                        <h3 className='card-title'>Agent's List</h3>
                        <div className='card-toolbar'>
                            <Link to={`add`} className='btn btn-success btn-sm'>
                                <span className='mx-2'>Add Agent</span>
                            </Link>
                        </div>
                    </div>
                    {data ? (
                        <PaginationTable
                            pagination={pagination}
                            fetchAgain={fetchAgain}
                            setFetchAgain={setFetchAgain}
                            columns={tableColumns as ColumnDef<unknown>[]}
                            data={data}
                            isLoading={isloading}
                            baseUrl={baseUrl}
                            setFetchUrl={setFetchUrl}
                        />
                    ) : (
                        <div className='bg-white flex-center h-75vh'>
                            <NotFound title='Someting Went Wrong. Agent Not Found. ' />
                        </div>
                    )}
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
                    <h3>{selectedData?.name}</h3>
                </div>
            </Modal2>
        </div>
    );
};

export default DocumentList;
