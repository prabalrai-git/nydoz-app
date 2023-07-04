import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import Heading from "../../shared/molecules/Heading";
import API_ROUTE from "../../../service/api";
import { ICompanyResponse } from "../../../types/payload.type";
import TanStackTable from "../../shared/components/TanStackTable";
import { ColumnDef } from "@tanstack/react-table";
import BASE_URL from "../../../constants/AppSetting";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import CopyToClipboard from "../../shared/molecules/CopyToClipboard";

const CompanyList = () => {
    const { data, fetchData, pagination, isloading, error } = useFetch<
        ICompanyResponse[]
    >(API_ROUTE.GET_COMPANIES, true);

    useEffect(() => {
        fetchData();
    }, []);

    const tableColumns: ColumnDef<ICompanyResponse>[] = [
        {
            accessorKey: "sn",
            header: () => <div>S.N</div>,
            cell: (info) => <div>{info.getValue<string>()}</div>,
            footer: (info) => info.column.id,
        },
        {
            accessorKey: "logo",
            header: () => <div>Logo</div>,
            cell: (info) => {
                const URL = `${BASE_URL}${info.getValue<string>()}`;
                return (
                    <div className='symbol symbol-label'>
                        <img className='img-fluid' src={URL} alt='Logo' />
                    </div>
                );
            },
            footer: (info) => info.column.id,
        },

        {
            accessorKey: "name",
            header: () => <div>Company's Name</div>,
            cell: (info) => <div>{info.getValue<string>()}</div>,
            footer: (info) => info.column.id,
        },
        {
            accessorKey: "website",
            header: () => <div>Website</div>,
            cell: (info) => (
                <div>
                    <span>{info.getValue<string>()}</span>
                    <CopyToClipboard text={info.getValue<string>()} />
                </div>
            ),
            footer: (info) => info.column.id,
        },
        {
            accessorKey: "email",
            header: () => <div>Email</div>,
            cell: (info) => <div>{info.getValue<string>()}</div>,
            footer: (info) => info.column.id,
        },

        {
            accessorKey: "country",
            header: () => <div>Country</div>,
            cell: (info) => <div>{info.getValue<string>()}</div>,
            footer: (info) => info.column.id,
        },

        {
            accessorKey: "action",
            header: () => <div className='text-center'>Actions</div>,
            cell: () => (
                <div className='text-center'>
                    <DropdownButton
                        variant='secondary'
                        size='sm'
                        id='dropdown-basic-button'
                        title='Action'>
                        <Dropdown.Item>
                            <span className='mx-2'>View</span>
                            <i className='bi bi-box-arrow-up-right text-primary '></i>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <span className='mx-2'>Edit</span>
                            <i className='bi bi-pencil-square text-info'></i>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <span className='mx-2'>Delete</span>
                            <i className='bi bi-trash text-danger'></i>
                        </Dropdown.Item>
                    </DropdownButton>
                </div>
            ),
            footer: (info) => info.column.id,
        },
    ];

    return (
        <div>
            <Heading
                title='Company List'
                btnText='Back'
                showBreadcrumb={true}
            />
            <section>
                <div className='card'>
                    <div className='card-header border-0 pt-6'>
                        <div className='card-title'>
                            <div className='d-flex align-items-center position-relative my-1'>
                                <i className='ki-outline ki-magnifier fs-3 position-absolute ms-5'></i>
                                <input
                                    type='text'
                                    className='form-control form-control-solid w-250px ps-13'
                                    placeholder='Search ..'
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <hr className='text-gray-400' />
                <TanStackTable columns={tableColumns} data={data} />
            </section>
        </div>
    );
};

export default CompanyList;
