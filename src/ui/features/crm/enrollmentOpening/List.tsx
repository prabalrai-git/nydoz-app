import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { Flag } from "react-bootstrap-icons";
import { ColumnDef } from "@tanstack/react-table";
import useFetch from "../../../../hooks/useFetch";
import API_ROUTE from "../../../../service/api";
import { IEnrollmentOpeningsResponse } from "../../../../types/products.types";
import BASE_URL from "../../../../constants/AppSetting";
import useMutation from "../../../../hooks/useMutation";
import Modal2 from "../../../shared/components/Modal2";
import moment from "moment";
import PaginationTable from "../../../shared/components/PaginationTable";
import NotFound from "../../../shared/molecules/NotFound";

const List = () => {
    const navigate = useNavigate();
    const { id: companyId } = useParams<string>();
    const baseUrl = `${API_ROUTE.CM_ENROLLMENT_OPENINGS}`;
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
        IEnrollmentOpeningsResponse | undefined
    >();

    const { data, fetchDataById, pagination, isloading } = useFetch<
        IEnrollmentOpeningsResponse[]
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
    const handleEditData = (item: IEnrollmentOpeningsResponse) => {
        navigate("../edit", {
            state: { data: item },
        });
    };

    const tableColumns: ColumnDef<IEnrollmentOpeningsResponse>[] = [
        {
            accessorKey: "sn",
            header: () => <div>S.N</div>,
            cell: (info) => info.row.index + 1,
        },

        {
            accessorKey: "enroll_start_date",
            header: () => (
                <div>
                    <i className='bi bi-globe me-2 fs-7'></i>
                    <span>Start Date</span>
                </div>
            ),
            cell: (info) => {
                return (
                    <div>
                        {moment(info.getValue<string>()).format("MMMM Do YYYY")}
                    </div>
                );
            },
        },
        {
            accessorKey: "enroll_end_date",
            header: () => (
                <div>
                    <i className='bi bi-globe me-2 fs-7'></i>
                    <span>End Date</span>
                </div>
            ),
            cell: (info) => {
                return (
                    <div>
                        {moment(info.getValue<string>()).format("MMMM Do YYYY")}
                    </div>
                );
            },
        },
        {
            accessorKey: "total_opening",
            header: () => (
                <div>
                    <i className='bi bi-globe me-2 fs-7'></i>
                    <span>Total Opening</span>
                </div>
            ),
            cell: (info) => {
                return <div>{info.getValue<string>()}</div>;
            },
        },

        {
            accessorKey: "position",
            header: () => (
                <div>
                    <i className='bi bi-geo-alt me-2 fs-7'></i>
                    <span>Position</span>
                </div>
            ),
            cell: (info) => {
                return <div>{info.getValue<string>()}</div>;
            },
        },

        {
            accessorKey: "visa_type_id",
            header: () => (
                <div>
                    <Flag size={16} className='mx-2' />
                    <span>Visa Type</span>
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
                <div className='d-flex justify-content-center'>
                    <div
                        title='view'
                        className='menu-link cursor-pointer bg-primary p-2 px-3'>
                        <i className='bi bi-box-arrow-up-right text-white'></i>
                    </div>
                    <div
                        title='Edit'
                        onClick={() => handleEditData(info?.row?.original)}
                        className='menu-link cursor-pointer bg-info p-2 px-3 mx-3'>
                        <i className='bi bi-pencil-square text-white'></i>
                    </div>
                    <div
                        title='Delete'
                        onClick={() => handleDeleteModal(info?.row?.original)}
                        className='menu-link cursor-pointer bg-danger p-2 px-3 '>
                        <i className='bi bi-trash text-white'></i>
                    </div>
                </div>
            ),
            footer: (info) => info.column.id,
        },
    ];

    // functions for delete modal

    const handleDeleteModal = (item: IEnrollmentOpeningsResponse) => {
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
        <section>
            <div className='card'>
                <div className='card-header'>
                    <h3 className='card-title'>Institution's Openings List</h3>
                    <div className='card-toolbar'>
                        <Link to='../add' className='btn btn-success btn-sm'>
                            <span className='mx-2'>Add Openings</span>
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
                        <NotFound title='Someting Went Wrong. Data Not Found. ' />
                    </div>
                )}
            </div>
            <Modal2
                title='Are you sure  ?'
                showChildren={true}
                cancelText='Cancel'
                confirmText='Delete'
                show={show}
                handleConfirm={handleDeleteItem}
                handleClose={handleClose}>
                <div>
                    <h3>{selectedData?.position}</h3>
                </div>
            </Modal2>
        </section>
    );
};

export default List;
