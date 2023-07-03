import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import Heading from "../../shared/molecules/Heading";
import API_ROUTE from "../../../service/api";
import { ICompanyResponse } from "../../../types/payload.type";
import TanStackTable from "../../shared/components/TanStackTable";
import { ColumnDef } from "@tanstack/react-table";

interface ITestProps {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    company: {
        name: string;
    };
}

const CompanyList = () => {
    const testURL = "https://jsonplaceholder.typicode.com/users";
    const [testData, setTestData] = useState<ITestProps[] | undefined>();
    const { data, fetchData, pagination, loading, error } = useFetch<
        ICompanyResponse[]
    >(API_ROUTE.GET_COMPANIES, true);

    const fetchDataTest = async () => {
        const response = await fetch(testURL);
        const data = await response.json();
        console.log("testdata", data);
        setTestData(data);
    };

    useEffect(() => {
        fetchDataTest();
    }, []);

    const tableColumns: ColumnDef<ITestProps>[] = [
        {
            accessorFn: (row) => row.id,
            id: "Id",
            cell: (info) => <i>{info.getValue<string>()}</i>,
            header: () => <span>ID</span>,
            footer: (info) => info.column.id,
        },

        {
            accessorKey: "name",
            header: () => <div>Name</div>,
            cell: (info) => <div>{info.getValue<string>()}</div>,
            footer: (info) => info.column.id,
        },

        {
            accessorKey: "username",
            header: () => <div>username</div>,
            cell: (info) => <div>{info.getValue<string>()}</div>,
            footer: (info) => info.column.id,
        },
        {
            accessorKey: "email",
            header: () => <div>Email</div>,
            cell: (info) => <div>{info.getValue<string>()}</div>,
            footer: (info) => info.column.id,
        },
        {
            accessorKey: "action",
            header: () => <div className='text-center'>Actions</div>,
            cell: () => (
                <div className='text-center'>
                    <button className='btn text-info'>
                        <i className='bi bi-pencil'></i>
                    </button>
                    <button className='btn text-danger'>
                        <i className='bi bi-trash'></i>
                    </button>
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

                        <div className='card-toolbar'>
                            <div className='d-flex justify-content-end'>
                                <div className='w-150px me-3'>
                                    <select className='form-select form-select-solid select2-hidden-accessible'>
                                        <option data-select2-id='select2-data-9-ucks'></option>
                                        <option value='all'>All</option>
                                        <option value='active'>Active</option>
                                        <option value='locked'>Locked</option>
                                    </select>
                                    <span
                                        className='select2 select2-container select2-container--bootstrap5'
                                        dir='ltr'
                                        data-select2-id='select2-data-8-j8oi'>
                                        <span className='selection'>
                                            <span className='select2-selection select2-selection--single form-select form-select-solid'>
                                                <span
                                                    className='select2-selection__rendered'
                                                    id='select2-42py-container'>
                                                    <span className='select2-selection__placeholder'>
                                                        Status
                                                    </span>
                                                </span>
                                                <span
                                                    className='select2-selection__arrow'
                                                    role='presentation'>
                                                    <b role='presentation'></b>
                                                </span>
                                            </span>
                                        </span>
                                        <span
                                            className='dropdown-wrapper'
                                            aria-hidden='true'></span>
                                    </span>
                                </div>

                                <button
                                    type='button'
                                    className='btn btn-light-primary me-3'
                                    data-bs-toggle='modal'
                                    data-bs-target='#kt_customers_export_modal'>
                                    <i className='ki-outline ki-exit-up fs-2'></i>
                                    Export
                                </button>

                                <button
                                    type='button'
                                    className='btn btn-primary'
                                    data-bs-toggle='modal'
                                    data-bs-target='#kt_modal_add_customer'>
                                    Add Customer
                                </button>
                            </div>

                            <div
                                className='d-flex justify-content-end align-items-center d-none'
                                data-kt-customer-table-toolbar='selected'>
                                <div className='fw-bold me-5'>
                                    <span
                                        className='me-2'
                                        data-kt-customer-table-select='selected_count'></span>
                                    Selected
                                </div>
                                <button
                                    type='button'
                                    className='btn btn-danger'
                                    data-kt-customer-table-select='delete_selected'>
                                    Delete Selected
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <TanStackTable columns={tableColumns} data={testData} />
            </section>
        </div>
    );
};

export default CompanyList;
