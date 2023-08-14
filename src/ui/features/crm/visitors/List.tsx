import { useMemo, useCallback } from "react";
import API_ROUTE from "../../../../service/api";
import { IAgentResponse } from "../../../../types/products.types";
import BASE_URL from "../../../../constants/AppSetting";
import { ColumnDef } from "@tanstack/react-table";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AirplaneFill, Flag, People } from "react-bootstrap-icons";
import CompanyBreadcrumb from "../../../shared/molecules/CompanyBreadcrumb";
import SearchPaginationList from "../../../shared/components/SearchPaginationList";

const VisitorList = () => {
    const navigate = useNavigate();
    const searchFilter: string[] = [
        "first_name",
        "last_name",
        "email",
        "mobile",
    ];

    const handleEditData = useCallback(
        (item: IAgentResponse) => {
            navigate("edit", {
                state: { data: item },
            });
        },
        [navigate]
    );

    const tableColumns: ColumnDef<IAgentResponse>[] = useMemo(
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
                        <div>
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
                        <div>
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
                        </DropdownButton>
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
                title='Visitor List'
                btnText='Back'
                showBreadcrumb={true}
            />
            <section>
                <div className='card'>
                    <div className='card-header'>
                        <h3 className='card-title'>Visitor's List</h3>
                        <div className='card-toolbar'>
                            <Link to={`add`} className='btn btn-success btn-sm'>
                                <span className='mx-2'>Add Visitor</span>
                            </Link>
                        </div>
                    </div>
                    <div className='card-body'>
                        <SearchPaginationList
                            searchParamsArray={searchFilter}
                            baseUrl={API_ROUTE.CM_VISITORS}
                            columns={tableColumns}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default VisitorList;
