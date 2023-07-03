import { useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import Heading from "../../shared/molecules/Heading";
import API_ROUTE from "../../../service/api";
import { ICompanyResponse } from "../../../types/payload.type";

const CompanyList = () => {
    const { data, fetchData, loading, error } = useFetch<ICompanyResponse[]>(
        API_ROUTE.GET_COMPANIES,
        true
    );

    useEffect(() => {
        fetchData();
    }, []);

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
                                    data-kt-customer-table-filter='search'
                                    className='form-control form-control-solid w-250px ps-13'
                                    placeholder='Search Customers'
                                />
                            </div>
                        </div>

                        <div className='card-toolbar'>
                            <div
                                className='d-flex justify-content-end'
                                data-kt-customer-table-toolbar='base'>
                                <div className='w-150px me-3'>
                                    <select
                                        className='form-select form-select-solid select2-hidden-accessible'
                                        data-control='select2'
                                        data-hide-search='true'
                                        data-placeholder='Status'
                                        data-kt-ecommerce-order-filter='status'
                                        data-select2-id='select2-data-7-e6iv'
                                        aria-hidden='true'
                                        data-kt-initialized='1'>
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
                                            <span
                                                className='select2-selection select2-selection--single form-select form-select-solid'
                                                role='combobox'
                                                aria-haspopup='true'
                                                aria-expanded='false'
                                                aria-disabled='false'
                                                aria-labelledby='select2-42py-container'
                                                aria-controls='select2-42py-container'>
                                                <span
                                                    className='select2-selection__rendered'
                                                    id='select2-42py-container'
                                                    role='textbox'
                                                    aria-readonly='true'
                                                    title='Status'>
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
                    <div className='card-body pt-0'>
                        <div
                            id='kt_customers_table_wrapper'
                            className='dataTables_wrapper dt-bootstrap4 no-footer'>
                            <div className='table-responsive'>
                                <table
                                    className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
                                    id='kt_customers_table'>
                                    <thead>
                                        <tr className='text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0'>
                                            <th className='w-10px pe-2 sorting_disabled'>
                                                <div className='form-check form-check-sm form-check-custom form-check-solid me-3'>
                                                    <input
                                                        className='form-check-input'
                                                        type='checkbox'
                                                        data-kt-check='true'
                                                        data-kt-check-target='#kt_customers_table .form-check-input'
                                                        value='1'
                                                    />
                                                </div>
                                            </th>
                                            <th
                                                className='min-w-125px sorting'
                                                aria-controls='kt_customers_table'
                                                aria-label='Customer Name: activate to sort column ascending'>
                                                Customer Name
                                            </th>
                                            <th
                                                className='min-w-125px sorting'
                                                aria-controls='kt_customers_table'
                                                aria-label='Email: activate to sort column ascending'>
                                                Email
                                            </th>
                                            <th
                                                className='min-w-125px sorting'
                                                aria-controls='kt_customers_table'
                                                aria-label='Status: activate to sort column ascending'>
                                                Status
                                            </th>
                                            <th
                                                className='min-w-125px sorting'
                                                aria-controls='kt_customers_table'
                                                aria-label='IP Address: activate to sort column ascending'>
                                                IP Address
                                            </th>
                                            <th
                                                className='min-w-125px sorting'
                                                aria-controls='kt_customers_table'
                                                aria-label='Created Date: activate to sort column ascending'>
                                                Created Date
                                            </th>
                                            <th
                                                className='text-end min-w-70px sorting_disabled'
                                                aria-label='Actions'>
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className='fw-semibold text-gray-600'>
                                        <tr className='odd'>
                                            <td>
                                                <div className='form-check form-check-sm form-check-custom form-check-solid'>
                                                    <input
                                                        className='form-check-input'
                                                        type='checkbox'
                                                        value='1'
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <a
                                                    href='../../demo31/dist/apps/ecommerce/customers/details.html'
                                                    className='text-gray-800 text-hover-primary mb-1'>
                                                    Emma Smith
                                                </a>
                                            </td>
                                            <td>
                                                <a
                                                    href='#'
                                                    className='text-gray-600 text-hover-primary mb-1'>
                                                    smith@kpmg.com
                                                </a>
                                            </td>
                                            <td>
                                                <div className='badge badge-light-success'>
                                                    Active
                                                </div>
                                            </td>
                                            <td>159.64.44.212</td>
                                            <td data-order='2023-06-20T10:30:00+05:45'>
                                                20 Jun 2023, 10:30 am
                                            </td>
                                            <td className='text-end'>
                                                <button className='btn text-info'>
                                                    <i className='bi bi-pencil'></i>
                                                </button>
                                                <button className='btn text-danger'>
                                                    <i className='bi bi-trash'></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='row'>
                                <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'>
                                    <div
                                        className='dataTables_length'
                                        id='kt_customers_table_length'>
                                        <label>
                                            <select
                                                name='kt_customers_table_length'
                                                aria-controls='kt_customers_table'
                                                className='form-select form-select-sm form-select-solid'>
                                                <option value='10'>10</option>
                                                <option value='25'>25</option>
                                                <option value='50'>50</option>
                                                <option value='100'>100</option>
                                            </select>
                                        </label>
                                    </div>
                                </div>
                                <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
                                    <div
                                        className='dataTables_paginate paging_simple_numbers'
                                        id='kt_customers_table_paginate'>
                                        <ul className='pagination'>
                                            <li
                                                className='paginate_button page-item previous disabled'
                                                id='kt_customers_table_previous'>
                                                <a
                                                    href='#'
                                                    aria-controls='kt_customers_table'
                                                    data-dt-idx='0'
                                                    className='page-link'>
                                                    <i className='previous'></i>
                                                </a>
                                            </li>
                                            <li className='paginate_button page-item active'>
                                                <a
                                                    href='#'
                                                    aria-controls='kt_customers_table'
                                                    data-dt-idx='1'
                                                    className='page-link'>
                                                    1
                                                </a>
                                            </li>
                                            <li className='paginate_button page-item '>
                                                <a
                                                    href='#'
                                                    aria-controls='kt_customers_table'
                                                    data-dt-idx='2'
                                                    className='page-link'>
                                                    2
                                                </a>
                                            </li>
                                            <li className='paginate_button page-item '>
                                                <a
                                                    href='#'
                                                    aria-controls='kt_customers_table'
                                                    data-dt-idx='3'
                                                    className='page-link'>
                                                    3
                                                </a>
                                            </li>
                                            <li className='paginate_button page-item '>
                                                <a
                                                    href='#'
                                                    aria-controls='kt_customers_table'
                                                    data-dt-idx='4'
                                                    className='page-link'>
                                                    4
                                                </a>
                                            </li>
                                            <li
                                                className='paginate_button page-item next'
                                                id='kt_customers_table_next'>
                                                <a
                                                    href='#'
                                                    aria-controls='kt_customers_table'
                                                    data-dt-idx='5'
                                                    className='page-link'>
                                                    <i className='next'></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CompanyList;
