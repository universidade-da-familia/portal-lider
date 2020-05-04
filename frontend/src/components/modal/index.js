import React, { memo } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function CustomModal({
  header = null,
  body = null,
  footer = null,
  size = 'md',
  isOpen,
  toggle = null,
}) {
  return (
    <Modal size={size} isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{header}</ModalHeader>
      <ModalBody>{body}</ModalBody>
      {footer && <ModalFooter>{footer}</ModalFooter>}
    </Modal>
  );
}

export default memo(CustomModal);
