import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { Flag } from "react-bootstrap-icons";
import { ColumnDef } from "@tanstack/react-table";
import API_ROUTE from "../../../../service/api";
import { IEnrollmentOpeningsResponse } from "../../../../types/products.types";
import { IVisaTypeResponse } from "../../../../types/payload.type";
import Modal2 from "../../../shared/components/Modal2";
import moment from "moment";
import SearchPaginationList from "../../../shared/components/SearchPaginationList";
import useMutation from "../../../../hooks/useMutation";

const List = () => {
    const navigate = useNavigate();
    const { id: companyId } = useParams<string>();
    const searchFilter = ["position"];
    const [selectedData, setSelectedData] = useState<
        IEnrollmentOpeningsResponse | undefined
    >();
    const [show, setShow] = useState(false);
    const { deleteData } = useMutation(API_ROUTE.CM_ENROLLMENT_OPENINGS, true);
    const handleEditData = useCallback(
        (item: IEnrollmentOpeningsResponse) => {
            navigate("../edit", {
                state: { data: item },
            });
        },
        [navigate]
    );

    const handleDeleteModal = useCallback(
        (item: IEnrollmentOpeningsResponse) => {
            setSelectedData(item);
            handleShow();
        },
        []
    );

    const handleDeleteItem = async () => {
        const id = selectedData?.id;
        const payload = `${companyId}/documents/${id}}`;
        if (id) {
            try {
                const response = await deleteData(payload);
                console.log(response);
                if (response) {
                    toast.success("Deleted successfully");
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

    const tableColumns: ColumnDef<IEnrollmentOpeningsResponse>[] = useMemo(
        () => [
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
                            {moment(info.getValue<string>()).format(
                                "MMMM Do YYYY"
                            )}
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
                            {moment(info.getValue<string>()).format(
                                "MMMM Do YYYY"
                            )}
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
                accessorKey: "visa_type",
                header: () => (
                    <div>
                        <Flag size={16} className='mx-2' />
                        <span>Visa Type</span>
                    </div>
                ),
                cell: (info) => {
                    return (
                        <div>
                            {info.getValue<Partial<IVisaTypeResponse>>()?.name}
                        </div>
                    );
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
                            onClick={() =>
                                handleDeleteModal(info?.row?.original)
                            }
                            className='menu-link cursor-pointer bg-danger p-2 px-3 '>
                            <i className='bi bi-trash text-white'></i>
                        </div>
                    </div>
                ),
                footer: (info) => info.column.id,
            },
        ],
        [handleDeleteModal, handleEditData]
    );

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
                <div className='card-body'>
                    <SearchPaginationList
                        searchParamsArray={searchFilter}
                        baseUrl={API_ROUTE.CM_ENROLLMENT_OPENINGS}
                        columns={tableColumns}
                    />
                </div>
            </div>
            <Modal2
                title='Are you sure ?'
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
