import { useEffect } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CompanySocialLinkSchema } from "../../../validations/company.validator";
import {
    ISocialLinksResponse,
    ISocialLinksPayload,
} from "../../../types/payload.type";
import API_ROUTE from "../../../service/api";

import useMutation from "../../../hooks/useMutation";

interface FormData {
    title: string;
    link: string;
}

interface IModalProps {
    show: boolean;
    handleClose: () => void;
    companyId: string;
    setFetchAgain: (value: boolean) => void;
    selectedData?: ISocialLinksResponse;
    setSelectedData?: (value: ISocialLinksResponse) => void;
}

const AddSocialLink = (props: IModalProps) => {
    const { companyId, show, handleClose, setFetchAgain, selectedData } = props;
    const postURl = `${API_ROUTE.GET_SOCIAL_LINKS_BY_COMPANYID}/${companyId}/social-links`;

    const { postData, updateData, errList, error, isLoading } =
        useMutation<ISocialLinksResponse>(postURl, true);

    const {
        register,
        reset,
        setError,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(CompanySocialLinkSchema),
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
                title: selectedData.title,
                link: selectedData.link,
            });
        } else {
            reset({
                title: "",
                link: "",
            });
        }
    }, [reset, selectedData]);

    useEffect(() => {
        console.log(errList);
        if (errList?.title) {
            setError("title", {
                type: "manual",
                message: errList?.title[0],
            });
        }
        if (errList?.link) {
            setError("link", {
                type: "manual",
                message: errList?.link[0],
            });
        }
    }, [errList, setError]);

    const onFormSubmit = handleSubmit(async (data: FormData) => {
        console.log(data, "data");

        if (selectedData) {
            const response = await updateData(
                selectedData.id,
                data as ISocialLinksResponse
            );
            if (response?.status === 200) {
                toast.success("Social Link updated successfully");
                reset({
                    title: "",
                    link: "",
                });
                setFetchAgain(true);
                handleClose();
            }
        } else {
            const response = await postData(data as ISocialLinksPayload);
            if (response?.status === 201) {
                toast.success("Social Link Added successfully");
                reset({
                    title: "",
                    link: "",
                });
                setFetchAgain(true);
                handleClose();
            }
        }
    });

    const handleCloseModal = () => {
        reset({
            title: "",
            link: "",
        });
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <div className='text-gray-900  fs-2 fw-bold me-1'>
                        {selectedData ? "Update" : "Add"} Social Link
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
                                        Social Link
                                    </label>
                                    <input
                                        className='form-control'
                                        placeholder='Enter socail media links.  Eg:- Facebook.com, Twitter, etc
                                        '
                                        type='text'
                                        {...register("title")}
                                    />
                                    <p className='text-danger mt-1'>
                                        {errors.title?.message}
                                    </p>
                                </div>
                            </div>
                            <div className='col-12 gap-5 gap-md-7 '>
                                <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                    <label className='required form-label'>
                                        Website Link
                                    </label>
                                    <input
                                        className='form-control'
                                        placeholder='Enter website link. Eg:- https://example.com'
                                        {...register("link")}
                                    />

                                    <p className='text-danger mt-1'>
                                        {errors.link?.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    size='sm'
                    variant='secondary'
                    onClick={handleCloseModal}>
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

export default AddSocialLink;
