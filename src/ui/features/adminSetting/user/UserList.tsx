import TanStackTable from "../../shared/molecules/TanStackTable";
import { ColumnDef } from "@tanstack/react-table";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import CompanyBreadcrumb from "../../../shared/molecules/CompanyBreadcrumb";

const UserList = () => {
    const tableColumns: ColumnDef<IDocumentResponse>[] = [
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
            accessorKey: "is_restricted",
            header: () => (
                <div>
                    <span>Type</span>
                </div>
            ),
            cell: (info) => {
                return (
                    <div>
                        {info?.row?.original?.is_restricted ? (
                            <span className='badge text-bg-primary'>
                                Not Restricted
                            </span>
                        ) : (
                            <span className='badge text-bg-danger'>
                                Restricted
                            </span>
                        )}
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
    return (
        <section>
            <div className='card'>
                <div className='card-header'>
                    <h3 className='card-title'>User List</h3>
                    <div className='card-toolbar'>
                        <button type='button' className='btn btn-sm btn-info'>
                            Add User
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserList;
