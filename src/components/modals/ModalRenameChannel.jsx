import React, { useRef, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import SocketInstanceContext from '../../context/SocketInstanceContext.jsx';
import { closeModal } from '../../slices/modalSlice';
import ackWithTimeout from '../../utils';

const ModalRenameChannel = () => {
  const { t } = useTranslation();
  const socket = useContext(SocketInstanceContext);
  const TYPE = 'renameChannel';
  const inputRef = useRef(null);
  const channels = useSelector((state) => state.channelsInfo.channels);
  const isOpen = useSelector((state) => state.modal.isOpen);
  const modalType = useSelector((state) => state.modal.type);
  const renamedChannelId = useSelector((state) => state.modal.extra?.id);
  const channelsNames = channels.map(({ name }) => name);
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    channelName: Yup.string()
      .trim()
      .required('Обязательное поле')
      .notOneOf(channelsNames)
      .minmax(3, 20),
  });

  const initialValues = {
    channelName: '',
  };

  const onSuccessSend = (resetForm, setSubmitting, setFieldError) => ({ status }) => {
    if (status === 'ok') {
      resetForm();
      dispatch(closeModal());
    } else {
      setFieldError('channelName', t('errors.networkError'));
      setSubmitting(false);
    }
  };

  const onFailSend = (setSubmitting, setFieldError) => () => {
    inputRef.current.focus();
    setSubmitting(false);
    setFieldError('channelName', t('errors.networkError'));
  };

  const submitHandler = (formData, { setFieldError, setSubmitting, resetForm }) => {
    setSubmitting(true);
    const name = formData.channelName;
    socket.volatile.emit('renameChannel', { id: renamedChannelId, name }, ackWithTimeout(
      onSuccessSend(resetForm, setSubmitting, setFieldError),
      onFailSend(setSubmitting, setFieldError),
      2500,
    ));
  };

  const hideHandler = () => {
    dispatch(closeModal());
  };

  const showHandler = (setFieldValue) => () => {
    setFieldValue('channelName', channels.find(({ id }) => id === renamedChannelId).name);
    inputRef.current.focus();
  };

  const cancelHandler = (resetForm) => () => {
    resetForm();
    dispatch(closeModal());
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={submitHandler}
    >
      {({
        errors, touched, submitForm, isSubmitting, resetForm, setFieldValue,
      }) => (
        <Modal
          show={isOpen && modalType === TYPE}
          onShow={showHandler(setFieldValue)}
          onHide={hideHandler}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{t('ui.channels.renameTitle')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Field
                name="channelName"
                innerRef={inputRef}
                disabled={isSubmitting}
                autoComplete="off"
                data-testid="rename-channel"
                className={`form-control ${errors.channelName && touched.channelName && 'is-invalid'}`}
              />
              <ErrorMessage className="invalid-tooltip" name="channelName" component="div" />
            </Form>
          </Modal.Body>
          <Modal.Footer className="border-0">
            <Button onClick={cancelHandler(resetForm)} variant="secondary">{t('ui.channels.cancel')}</Button>
            <Button onClick={submitForm} variant="primary" type="submit" disabled={isSubmitting}>{t('ui.channels.rename')}</Button>
          </Modal.Footer>
        </Modal>
      )}
    </Formik>
  );
};

export default ModalRenameChannel;
