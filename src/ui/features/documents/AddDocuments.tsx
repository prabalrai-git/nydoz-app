import { CloudArrowUpFill } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import UploadFile from "../../shared/components/Upload";

interface IModalProps {
    show: boolean;
    handleClose: () => void;
    companyId: string;
    handleConfirm: () => void;
}

const AddDocuments = (props: IModalProps) => {
    const { show, handleClose, companyId, handleConfirm } = props;

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <div className='text-gray-900  fs-2 fw-bold me-1'>
                        Upload Documents
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div></div>
            </Modal.Body>
            <Modal.Footer>
                <Button size='sm' variant='secondary' onClick={handleClose}>
                    Cancel
                </Button>
                <Button
                    size='sm'
                    variant='danger'
                    className='fw-bold'
                    onClick={handleConfirm}>
                    <span className='mx-2'>Upload</span>
                    <CloudArrowUpFill />
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddDocuments;
