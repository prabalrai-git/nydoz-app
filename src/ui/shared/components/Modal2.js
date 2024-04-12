import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const Modal2 = (props) => {
    const { title, show, handleClose, cancelText, confirmText, showChildren, children, handleConfirm, } = props;
    return (_jsxs(Modal, { show: show, onHide: handleClose, children: [_jsx(Modal.Header, { closeButton: true, children: _jsx(Modal.Title, { children: title }) }), showChildren && _jsx(Modal.Body, { children: children }), _jsxs(Modal.Footer, { children: [_jsx(Button, { size: 'sm', variant: 'secondary', onClick: handleClose, children: cancelText }), _jsx(Button, { size: 'sm', variant: 'danger', className: 'fw-bold', onClick: handleConfirm, children: confirmText })] })] }));
};
export default Modal2;
