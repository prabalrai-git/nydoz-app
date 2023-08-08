import { Link } from "react-router-dom";

import { ColumnDef } from "@tanstack/react-table";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import API_ROUTE from "../../../../service/api";
import { IUsersOfCompanyResponse } from "../../../../types/company.type";
import useFetch from "../../../../hooks/useFetch";
import { useEffect, useState } from "react";
import useHandleShowError from "../../../../hooks/useHandleShowError";
import SearchPaginationTable from "../../../shared/components/SearchPaginationTable";

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
    const baseUrl = API_ROUTE.USER;
    const [fetchUrl, setFetchUrl] = useState<string>(baseUrl);
    const [fetchAgain, setFetchAgain] = useState<boolean>(true);
    const { data, error, isloading, fetchDataById, pagination } = useFetch<
        IUsersOfCompanyResponse[]
    >(API_ROUTE.USER, true);

    useEffect(() => {
        if (fetchAgain) {
            fetchDataById(fetchUrl);
            setFetchAgain(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchAgain, fetchDataById]);

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
                    <SearchPaginationTable
                        pagination={pagination}
                        setFetchAgain={setFetchAgain}
                        columns={tableColumns as ColumnDef<unknown>[]}
                        data={data ?? []}
                        isLoading={isloading}
                        baseUrl={baseUrl}
                        searchParamsArray={[
                            "first_name",
                            "last_name",
                            "email",
                            "mobile",
                        ]}
                        setFetchUrl={setFetchUrl}
                    />
                </div>
            </div>
        </section>
    );
};

export default UserList;
