import React, { useState } from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const ResultModal = (props) => {  
  const close = () => props.onHide();
  
  return (
    <div>
      <Modal isOpen={props.isOpen}>
        <ModalHeader toggle={close}></ModalHeader>
        <ModalBody>
          <h2>
            Your score is {props.score}
          </h2>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={close}>Save</Button>{' '}
          <Button color="secondary" onClick={close}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default ResultModal;
