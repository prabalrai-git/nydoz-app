import { useEffect } from "react";
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
import { Link } from "react-router-dom";

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
            cell: (info) => info.row.index + 1,
        },
        {
            accessorKey: "logo",
            header: () => (
                <div>
                    <i className='bi bi-card-image me-2'></i>
                    <span> Logo</span>
                </div>
            ),
            cell: (info) => {
                const URL = `${BASE_URL}${info.getValue<string>()}`;
                return (
                    <div className='symbol symbol-label'>
                        <img className='img-fluid' src={URL} alt='Logo' />
                    </div>
                );
            },
        },

        {
            accessorKey: "name",
            header: () => (
                <div>
                    <i className='bi bi-building-check me-2'></i>
                    <span>Company's Name</span>
                </div>
            ),
            cell: (info) => {
                const id = info?.row?.original?.id;
                return (
                    <Link to={`/account/company/profile/${id}`}>
                        {info.getValue<string>()}
                    </Link>
                );
            },
        },
        {
            accessorKey: "website",
            header: () => (
                <div>
                    <i className='bi bi-globe2 me-2'></i>
                    <span>Website</span>
                </div>
            ),
            cell: (info) => (
                <div>
                    <span>{info.getValue<string>()}</span>
                    <CopyToClipboard text={info.getValue<string>()} />
                </div>
            ),
        },
        {
            accessorKey: "email",
            header: () => (
                <div>
                    <i className='bi bi-envelope me-2'></i>
                    <span>Email</span>
                </div>
            ),
            cell: (info) => <div>{info.getValue<string>()}</div>,
        },

        {
            accessorKey: "country",
            header: () => (
                <div>
                    {" "}
                    <i className='bi bi-flag me-2'></i>
                    <span>Country</span>
                </div>
            ),
            cell: (info) => <div>{info.getValue<string>()}</div>,
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
                                <i className='cursor-pointer ki-outline ki-magnifier fs-3 position-absolute ms-5'></i>
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
