import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import API_ROUTE from "../../../service/api";
import { ISocialLinksResponse } from "../../../types/payload.type";
import { ColumnDef } from "@tanstack/react-table";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import useMutation from "../../../hooks/useMutation";
import Modal2 from "../../shared/components/Modal2";
import { toast } from "react-toastify";
import SocialLinkAdd from "./SocialLinkAdd";
import TanStackTable from "../../shared/molecules/TanStackTable";
import useAuthContext from "../../../context/auth/useAuthContext";
import CopyToClipboard from "../../shared/molecules/CopyToClipboard";

const DocumentList = () => {
    const { companyInfo } = useAuthContext();
    const companyId = companyInfo?.id;

    const [selectedData, setSelectedData] = useState<
        ISocialLinksResponse | undefined
    >();
    const [show, setShow] = useState<boolean>(false);
    const [openAddDocument, setOpenAddDocument] = useState(false);
    const [fetchAgain, setFetchAgain] = useState<boolean>(false);
    const getListUrl = API_ROUTE.GET_SOCIAL_LINKS_BY_COMPANYID;

    const { data, fetchData } = useFetch<ISocialLinksResponse[]>(
        `${getListUrl}/${companyId}/social-links`,
        true
    );

    const { deleteData } = useMutation(API_ROUTE.DELETE_COMPANY_BY_ID, true);

    useEffect(() => {
        fetchData();
        setFetchAgain(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (fetchAgain) {
            fetchData();
            setFetchAgain(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchAgain]);

    const handleEditData = (item: ISocialLinksResponse) => {
        setSelectedData(item);
        handleAddDocumentOpen();
    };

    const tableColumns: ColumnDef<ISocialLinksResponse>[] = [
        {
            accessorKey: "sn",
            header: () => <div>S.N</div>,
            cell: (info) => info.row.index + 1,
        },

        {
            accessorKey: "title",
            header: () => (
                <div>
                    <span>Social Link</span>
                </div>
            ),
            cell: (info) => {
                return <div>{info.getValue<string>()}</div>;
            },
        },
        {
            accessorKey: "link",
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

    const handleDeleteModal = (item: ISocialLinksResponse) => {
        setSelectedData(item);
        handleShow();
        console.log(item);
    };

    const handleDeleteItem = async () => {
        const id = selectedData?.id;
        const payload = `${companyId}/documents/${id}}`;
        if (id) {
            try {
                const response = await deleteData(payload);
                console.log(response);
                if (response) {
                    setFetchAgain(true);
                    toast.success("Documents deleted successfully");
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
    const handleAddDocumentClose = () => setOpenAddDocument(false);
    const handleAddDocumentOpen = () => setOpenAddDocument(true);

    const handleOpenNewModal = () => {
        setSelectedData(undefined);
        handleAddDocumentOpen();
    };

    return (
        <div>
            <div className='d-flex justify-content-between align-items-center mb-6'>
                <h4>Social Links / Social Media List</h4>
                <button
                    onClick={handleOpenNewModal}
                    className='btn btn-success btn-sm'>
                    <span className='mx-2'>Add Social Links</span>
                </button>
            </div>
            <section>
                <div className='card'>
                    {data && (
                        <TanStackTable columns={tableColumns} data={data} />
                    )}
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
                    <h4>{selectedData?.title}</h4>
                    <h3>{selectedData?.link}</h3>
                </div>
            </Modal2>
            <SocialLinkAdd
                setFetchAgain={setFetchAgain}
                companyId={companyId || ""}
                handleClose={handleAddDocumentClose}
                show={openAddDocument}
                selectedData={selectedData}
                setSelectedData={setSelectedData}
            />
        </div>
    );
};

export default DocumentList;
