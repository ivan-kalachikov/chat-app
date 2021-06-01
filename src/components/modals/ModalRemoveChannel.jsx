import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import socket from '../../socket';
import { closeModal } from '../../slices/modalSlice';
import ackWithTimeout from '../../utils';

const ModalRemoveChannel = () => {
  const TYPE = 'removeChannel';
  const isOpen = useSelector((state) => state.modal.isOpen);
  const modalType = useSelector((state) => state.modal.type);
  const id = useSelector((state) => state.modal?.extra);
  const dispatch = useDispatch();
  const [requestStatus, setRequestStatus] = useState('idle');
  const [requestError, setRequestError] = useState(null);

  const onSuccessSend = ({ status }) => {
    if (status === 'ok') {
      setRequestStatus('success');
      dispatch(closeModal());
    } else {
      setRequestStatus('failed');
      setRequestError('Ошибка сети');
    }
  };

  const onFailSend = () => {
    setRequestStatus('failed');
    setRequestError('Ошибка сети');
  };

  const clickHandler = () => {
    setRequestStatus('pending');
    socket.volatile.emit('removeChannel', id, ackWithTimeout(
      onSuccessSend,
      onFailSend,
      2500,
    ));
  };
  const hideHandler = () => {
    setRequestStatus('idle');
    dispatch(closeModal());
  };
  return (
    <Modal
      show={isOpen && modalType === TYPE}
      onHide={hideHandler}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Вы Уверены?
        {requestStatus === 'failed'
        && (
        <>
          <div className="is-invalid" />
          <div className="invalid-tooltip">{requestError}</div>
        </>
        )}
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button onClick={hideHandler} variant="secondary">Отменить</Button>
        <Button onClick={clickHandler} variant="danger" type="submit" disabled={requestStatus === 'pending'}>Удалить</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRemoveChannel;
