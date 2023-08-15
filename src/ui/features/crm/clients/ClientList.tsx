import { useMemo, useCallback } from "react";
import API_ROUTE from "../../../../service/api";
import {
    IVisitorResponse,
    IAgentResponse,
} from "../../../../types/products.types";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AirplaneFill, Flag, People } from "react-bootstrap-icons";
import CompanyBreadcrumb from "../../../shared/molecules/CompanyBreadcrumb";
import SearchPaginationList from "../../../shared/components/SearchPaginationList";

const ClientList = () => {
    const navigate = useNavigate();
    const searchFilter: string[] = [
        "first_name",
        "last_name",
        "email",
        "mobile",
    ];

    const handleEditData = useCallback(
        (item: IVisitorResponse) => {
            navigate("edit", {
                state: { data: item },
            });
        },
        [navigate]
    );

    const tableColumns: ColumnDef<IVisitorResponse>[] = useMemo(
        () => [
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
                    return (
                        <div className='d-flex align-items-center'>
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
                accessorKey: "going_to_foreign",
                header: () => (
                    <div>
                        <AirplaneFill size={16} className='mx-2' />
                        <span>Going Aboard</span>
                    </div>
                ),
                cell: (info) => {
                    return (
                        <div className='text-center'>
                            {info.getValue<string>() ? (
                                <span className='badge badge-success'>YES</span>
                            ) : (
                                <span className='badge badge-danger px-3'>
                                    NO
                                </span>
                            )}
                        </div>
                    );
                },
            },
            {
                accessorKey: "phone_nos",
                header: () => (
                    <div>
                        <i className='bi bi-telephone me-2 fs-7'></i>
                        <span>Mobile Number</span>
                    </div>
                ),
                cell: (info) => {
                    return (
                        <div>
                            {info.getValue<string>()?.length > 0 &&
                                info.getValue<string>()[0]}
                        </div>
                    );
                },
            },

            {
                accessorKey: "visiting_country",
                header: () => (
                    <div>
                        <Flag size={16} className='mx-2' />
                        <span>Visiting Country</span>
                    </div>
                ),
                cell: (info) => {
                    return (
                        <div className='text-center'>
                            {info.getValue<string>() ? (
                                info.getValue<string>()
                            ) : (
                                <span className='badge badge-warning px-3'>
                                    NA
                                </span>
                            )}
                        </div>
                    );
                },
            },
            {
                accessorKey: "agent",
                header: () => (
                    <div>
                        <Flag size={16} className='mx-2' />
                        <span>Agent</span>
                    </div>
                ),
                cell: (info) => {
                    return (
                        <div>
                            {info.getValue<Partial<IAgentResponse>>() ? (
                                <div>
                                    <span>
                                        {" "}
                                        {
                                            info.getValue<
                                                Partial<IAgentResponse>
                                            >()?.first_name
                                        }
                                    </span>
                                    <span>
                                        {" "}
                                        {
                                            info.getValue<
                                                Partial<IAgentResponse>
                                            >()?.last_name
                                        }
                                    </span>
                                </div>
                            ) : (
                                <span className='badge badge-warning px-3'>
                                    NA
                                </span>
                            )}
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
                        {/* <button
                            title='view'
                            onClick={() => handleView(info?.row?.original?.id)}
                            className='btn btn-sm btn-icon btn-primary mx-3'>
                            <i className='bi bi-box-arrow-up-right '></i>
                        </button> */}
                        <button
                            title='Edit'
                            onClick={() => handleEditData(info?.row?.original)}
                            className='btn btn-sm btn-icon btn-info mx-3'>
                            <i className='bi bi-pencil-square '></i>
                        </button>
                    </div>
                ),
                footer: (info) => info.column.id,
            },
        ],
        [handleEditData]
    );

    return (
        <div className='my-6 px-3'>
            <CompanyBreadcrumb
                title='Client List'
                btnText='Back'
                showBreadcrumb={true}
            />
            <section>
                <div className='card'>
                    <div className='card-header'>
                        <h3 className='card-title'>Client's List</h3>
                        <div className='card-toolbar'>
                            <Link to={`add`} className='btn btn-success btn-sm'>
                                <span className='mx-2'>Add Client</span>
                            </Link>
                        </div>
                    </div>
                    <div className='card-body'>
                        <SearchPaginationList
                            searchParamsArray={searchFilter}
                            baseUrl={API_ROUTE.CM_CLIENTS}
                            columns={tableColumns}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ClientList;
