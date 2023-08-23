import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalComponent = (props) => {
  const {
    showModal,
    setShowModal,
    title,
    content,
    confirmButtonText,
    cancelButtonText,
    confirmAction,
    isConfirmDisabled
  } = props;
  const handleClose = () => setShowModal(false);
  return (
    <Modal show={showModal} onHide={handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {cancelButtonText}
        </Button>
        <Button
          variant="primary"
          onClick={confirmAction}
          disabled={isConfirmDisabled!==undefined && isConfirmDisabled}
        >
          {confirmButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
