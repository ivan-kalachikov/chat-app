import React from 'react';
import { Toast, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { actions } from '../../slices';

const ModalConnectionProblem = () => {
  const { t } = useTranslation();
  const reason = useSelector((state) => state.modal?.extra);
  const dispatch = useDispatch();

  const hideHandler = () => {
    dispatch(actions.closeModal());
  };

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      right: 0,
    }}
    >
      <Toast
        autohide
        delay={5000}
        show
        onClose={hideHandler}
      >
        <Toast.Header closeButton>
          <strong>{t('ui.connectionProblem.title')}</strong>
        </Toast.Header>
        <Toast.Body>
          <Alert variant="danger">
            <p>{t('ui.connectionProblem.text', { reason })}</p>
            <p className="m-0">{t('ui.connectionProblem.suggestion')}</p>
          </Alert>
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default ModalConnectionProblem;
