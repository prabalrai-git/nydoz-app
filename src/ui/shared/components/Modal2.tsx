import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface IModalProps {
    title: string;
    show: boolean;
    handleClose: () => void;
    showChildren?: boolean;
    children?: React.ReactNode;
    cancelText: string;
    confirmText: string;
    handleConfirm: () => void;
}

const Modal2 = (props: IModalProps) => {
    const {
        title,
        show,
        handleClose,
        cancelText,
        confirmText,
        showChildren,
        children,
        handleConfirm,
    } = props;

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{showChildren && children}</Modal.Body>
            <Modal.Footer>
                <Button size='sm' variant='secondary' onClick={handleClose}>
                    {cancelText}
                </Button>
                <Button
                    size='sm'
                    variant='danger'
                    className='fw-bold'
                    onClick={handleConfirm}>
                    {confirmText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Modal2;
