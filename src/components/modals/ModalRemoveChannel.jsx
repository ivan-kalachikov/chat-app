import React, { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import SocketInstanceContext from '../../context/SocketInstanceContext.jsx';
import { actions } from '../../slices';
import ackWithTimeout from '../../utils';

const ModalRemoveChannel = () => {
  const { t } = useTranslation();
  const socket = useContext(SocketInstanceContext);
  const id = useSelector((state) => state.modal?.extra);
  const dispatch = useDispatch();
  const [requestStatus, setRequestStatus] = useState('idle');
  const [requestError, setRequestError] = useState(null);

  const onSuccessSend = ({ status }) => {
    if (status === 'ok') {
      setRequestStatus('success');
      dispatch(actions.closeModal());
    } else {
      setRequestStatus('failed');
      setRequestError(t('errors.networkError'));
    }
  };

  const onFailSend = () => {
    setRequestStatus('failed');
    setRequestError(t('errors.networkError'));
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
    dispatch(actions.closeModal());
  };

  return (
    <Modal
      show
      onHide={hideHandler}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('ui.channels.removeTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('ui.channels.confirmation')}
        {requestStatus === 'failed'
        && (
        <>
          <div className="is-invalid" />
          <div className="invalid-tooltip">{requestError}</div>
        </>
        )}
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button onClick={hideHandler} variant="secondary">{t('ui.channels.cancel')}</Button>
        <Button onClick={clickHandler} variant="danger" type="submit" disabled={requestStatus === 'pending'}>{t('ui.channels.remove')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRemoveChannel;
