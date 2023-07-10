import { useEffect, useRef, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import Heading from "../../shared/molecules/Heading";
import API_ROUTE from "../../../service/api";
import { ICompanyResponse } from "../../../types/payload.type";
import { ColumnDef } from "@tanstack/react-table";
import BASE_URL from "../../../constants/AppSetting";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import CopyToClipboard from "../../shared/molecules/CopyToClipboard";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../shared/molecules/Breadcrumb";
import useMutation from "../../../hooks/useMutation";
import Modal2 from "../../shared/components/Modal2";
import { ToastContainer, toast } from "react-toastify";
import DataListTable from "../../shared/components/DataListTable";
import { useSearchParams } from "react-router-dom";

// "pagination": {
//             "total": 3,
//             "per_page": 15,
//             "last_page": 1,
//             "current_page": 1,
//             "from": 1,
//             "to": 3
//         }

interface IPaginationState {
    currentPage: number;
    perPage: number;
    searchTerm: string;
}

const CompanyList = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState<string>("");

    const [paginationState, setPaginationState] = useState({
        currentPage: 1,
        perPage: 5,
    });
    const initialURL = `${API_ROUTE.GET_COMPANIES}?page=${paginationState.currentPage}&per_page=${paginationState.perPage}&name=${searchTerm}`;
    const [fetchUrl, setFetchUrl] = useState<string>(initialURL);
    const { data, fetchData, pagination } = useFetch<ICompanyResponse[]>(
        fetchUrl,
        true
    );
    const [selectedData, setSelectedData] = useState<
        ICompanyResponse | undefined
    >();
    const [show, setShow] = useState<boolean>(false);
    const [fetchAgain, setFetchAgain] = useState<boolean>(false);

    const { deleteData } = useMutation(API_ROUTE.DELETE_COMPANY_BY_ID, true);

    const handleEditData = (item: ICompanyResponse) => {
        console.log(item);
        navigate(`/account/company/add`, {
            state: { data: item },
        });
    };

    useEffect(() => {
        fetchData();
        setFetchAgain(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchUrl]);

    useEffect(() => {
        if (fetchAgain) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchAgain]);

    const initialRender = useRef(true);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            console.log("initial render");
        } else {
            const tempURL = `${API_ROUTE.GET_COMPANIES}?page=${paginationState.currentPage}&per_page=${paginationState.perPage}&name=${searchTerm}`;
            window.scrollTo(0, 0);
            setFetchUrl(tempURL);
            console.log("next render");
        }
    }, [paginationState.currentPage, paginationState.perPage, searchTerm]);

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
            cell: (info) => (
                <div className='text-center'>
                    <DropdownButton
                        variant='secondary'
                        size='sm'
                        id='dropdown-basic-button'
                        title={
                            <i className='ki-solid ki-dots-vertical fs-2x me-1'></i>
                        }>
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

    const handleDeleteModal = (item: ICompanyResponse) => {
        setSelectedData(item);
        handleShow();
        console.log(item);
    };

    const handleDeleteItem = async () => {
        const id = selectedData?.id;
        if (id) {
            try {
                const response = await deleteData(id);
                console.log(response);
                if (response) {
                    setFetchAgain(true);
                    toast.success("Company deleted successfully");
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

    const handleNext = () => {
        if (paginationState.currentPage === pagination?.last_page) return;
        setPaginationState((prevState) => ({
            ...prevState,
            currentPage: prevState.currentPage + 1,
        }));
    };

    const handlePrevious = () => {
        if (paginationState.currentPage === 1) return;
        setPaginationState((prevState) => ({
            ...prevState,
            currentPage: prevState.currentPage - 1,
        }));
    };

    return (
        <div>
            <Heading title='Company List' btnText='Back' showBreadcrumb={true}>
                <Breadcrumb
                    parent='company'
                    parentLink='/account/company/list'
                    child='List'
                />
            </Heading>
            <section>
                <div className='card'>
                    {/* <div className='card-header border-0 pt-6'>
                        <div className='card-title'>
                            <div className='flex-1'>
                                <InputGroup className='mb-3'>
                                    <Form.Control
                                        placeholder="search by company's name"
                                        aria-label="Recipient's username"
                                        aria-describedby='basic-addon2'
                                    />
                                    <Button
                                        variant='secondary'
                                        id='button-addon2'>
                                        Search
                                    </Button>
                                </InputGroup>
                            </div>
                        </div>

                        <div className='card-toolbar'>
                            <div
                                className='d-flex justify-content-end'
                                data-kt-customer-table-toolbar='base'>
                                <h6 className='bg-light text-info  p-3'>
                                    Total :{pagination?.total}
                                </h6>
                            </div>
                        </div>
                    </div> */}
                    <section>
                        <DataListTable
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            showSearchBar={true}
                            pagination={pagination}
                            columns={tableColumns}
                            data={data ?? []}
                            showPagination={true}
                            setFetchAgain={setFetchAgain}
                            handlePrevious={handlePrevious}
                            handleNext={handleNext}
                        />
                    </section>
                </div>
            </section>
            <Modal2
                title='Are you sure you want to delete this company?'
                showChildren={true}
                cancelText='Cancel'
                confirmText='Delete'
                show={show}
                handleConfirm={handleDeleteItem}
                handleClose={handleClose}>
                <div>
                    <h3>{selectedData?.name}</h3>
                </div>
            </Modal2>
            <ToastContainer />
        </div>
    );
};

export default CompanyList;
