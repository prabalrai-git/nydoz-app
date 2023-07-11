import { useEffect } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { companyRolesSchema } from "../../../validations/company.validator";
import { IRoleResponse, IRolePayload } from "../../../types/payload.type";
import API_ROUTE from "../../../service/api";

import useMutation from "../../../hooks/useMutation";

interface FormData {
    name: string;
    description: string;
}

interface IModalProps {
    show: boolean;
    handleClose: () => void;
    companyId: string;
    setFetchAgain: (value: boolean) => void;
    selectedData?: IRoleResponse;
    setSelectedData?: (value: IRoleResponse) => void;
}

const AddDocuments = (props: IModalProps) => {
    const { show, handleClose, setFetchAgain, selectedData } = props;
    const { postData, updateData, errList, error, isLoading } =
        useMutation<IRoleResponse>(API_ROUTE.POST_ROLES, true);

    const {
        register,
        reset,
        setError,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(companyRolesSchema),
    });
    // for Error Message
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    // for Edit Data
    useEffect(() => {
        if (selectedData) {
            reset({
                name: selectedData.name,
                description: selectedData.description,
            });
        }
    }, [reset, selectedData]);

    useEffect(() => {
        console.log(errList);
        if (errList?.name) {
            setError("name", {
                type: "manual",
                message: errList?.name[0],
            });
        }
        if (errList?.description) {
            setError("description", {
                type: "manual",
                message: errList?.description[0],
            });
        }
    }, [errList, setError]);

    const onFormSubmit = handleSubmit(async (data: FormData) => {
        console.log(data, "data");

        if (selectedData) {
            const response = await updateData(
                selectedData.id,
                data as IRolePayload
            );
            if (response?.status === 201) {
                toast.success("Role updated successfully");
                reset({
                    name: "",
                    description: "",
                });
                setFetchAgain(true);
                handleClose();
            }
        } else {
            const response = await postData(data as IRolePayload);
            if (response?.status === 201) {
                toast.success("Role Added successfully");
                reset({
                    name: "",
                    description: "",
                });
                setFetchAgain(true);
                handleClose();
            }
        }
    });

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <div className='text-gray-900  fs-2 fw-bold me-1'>
                        {selectedData ? "Update" : "Add"} Role
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <form onSubmit={onFormSubmit}>
                        <div className='row'>
                            <div className='col-12 gap-5 gap-md-7 mb-6'>
                                <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                    <label className='required form-label'>
                                        Role Name:
                                    </label>
                                    <input
                                        className='form-control'
                                        placeholder='Enter role Name'
                                        type='text'
                                        {...register("name")}
                                    />
                                    <p className='text-danger mt-1'>
                                        {errors.name?.message}
                                    </p>
                                </div>
                            </div>
                            <div className='col-12 gap-5 gap-md-7 '>
                                <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                    <label className=' form-label'>
                                        Description:
                                    </label>
                                    <textarea
                                        rows={5}
                                        cols={5}
                                        className='form-control'
                                        placeholder='Enter description'
                                        {...register("description")}
                                    />
                                    <p className='text-danger mt-1'>
                                        {errors.description?.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button size='sm' variant='secondary' onClick={handleClose}>
                    Cancel
                </Button>
                <Button
                    size='sm'
                    variant='primary'
                    className='fw-bold'
                    onClick={onFormSubmit}
                    type='submit'>
                    {isLoading ? (
                        <>
                            <span className='ms-2'>uploading...</span>
                            <Spinner
                                size='sm'
                                animation='border'
                                role='status'></Spinner>
                        </>
                    ) : (
                        <span className='mx-3'>
                            {selectedData ? "Update" : "Add"}
                        </span>
                    )}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddDocuments;
