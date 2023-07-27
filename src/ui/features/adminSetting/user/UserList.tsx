import { Link } from "react-router-dom";

import { ColumnDef } from "@tanstack/react-table";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import API_ROUTE from "../../../../service/api";
import { IUsersOfCompanyResponse } from "../../../../types/company.type";
import useFetch from "../../../../hooks/useFetch";
import TanStackTable from "../../../shared/molecules/TanStackTable";
import { useEffect } from "react";
import useHandleShowError from "../../../../hooks/useHandleShowError";
import { Spinner } from "react-bootstrap";

const UserList = () => {
    const tableColumns: ColumnDef<IUsersOfCompanyResponse>[] = [
        {
            accessorKey: "sn",
            header: () => <div>S.N</div>,
            cell: (info) => info.row.index + 1,
        },

        {
            accessorKey: "first_name",
            header: () => (
                <div>
                    <span>First Name</span>
                </div>
            ),
            cell: (info) => {
                return <div>{info.getValue<string>()}</div>;
            },
        },

        {
            accessorKey: "last_name",
            header: () => (
                <div>
                    <span>Last Name</span>
                </div>
            ),
            cell: (info) => {
                return <div>{info.getValue<string>()}</div>;
            },
        },
        {
            accessorKey: "email",
            header: () => (
                <div>
                    <span>Last Name</span>
                </div>
            ),
            cell: (info) => {
                return <div>{info.getValue<string>()}</div>;
            },
        },
        {
            accessorKey: "mobile",
            header: () => (
                <div>
                    <span>Last Name</span>
                </div>
            ),
            cell: (info) => {
                return <div>{info.getValue<string>()}</div>;
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

    const { data, fetchData, error, isloading } = useFetch<
        IUsersOfCompanyResponse[]
    >(API_ROUTE.USER, true);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useHandleShowError(error);

    return (
        <section>
            <div className='card'>
                <div className='card-header'>
                    <h3 className='card-title'>User List</h3>
                    <div className='card-toolbar'>
                        <Link
                            to='../add-user'
                            type='button'
                            className='btn btn-sm btn-info'>
                            Add User
                        </Link>
                    </div>
                </div>
                <div className='card-body'>
                    {data && data?.length > 0 && (
                        <TanStackTable columns={tableColumns} data={data} />
                    )}
                    {isloading && <Spinner animation='border' />}
                </div>
            </div>
        </section>
    );
};

export default UserList;
