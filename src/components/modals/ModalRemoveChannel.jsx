import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import socket from '../../socket';
import { closeModal } from '../../slices/modalSlice';

const ModalRemoveChannel = () => {
  const TYPE = 'removeChannel';
  const isOpen = useSelector((state) => state.modal.isOpen);
  const modalType = useSelector((state) => state.modal.type);
  const id = useSelector((state) => state.modal?.extra);
  const dispatch = useDispatch();

  const clickHandler = () => {
    socket.emit('removeChannel', id, (({ status }) => {
      if (status === 'ok') {
        dispatch(closeModal());
      } else {
        throw new Error('Ошибка');
      }
    }));
  };
  const hideHandler = () => {
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
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button onClick={hideHandler} variant="secondary">Отменить</Button>
        <Button onClick={clickHandler} variant="danger" type="submit">Удалить</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRemoveChannel;
