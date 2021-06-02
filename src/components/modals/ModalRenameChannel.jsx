import React, { useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import socket from '../../socket';
import { closeModal } from '../../slices/modalSlice';
import ackWithTimeout from '../../utils';

const ModalRenameChannel = () => {
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
      .notOneOf(channelsNames, 'Должно быть уникальным')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов'),
  });
  const initialValues = {
    channelName: '',
  };

  const onSuccessSend = (resetForm, setSubmitting, setFieldError) => ({ status }) => {
    if (status === 'ok') {
      resetForm();
      dispatch(closeModal());
    } else {
      setFieldError('channelName', 'Ошибка сети');
      setSubmitting(false);
    }
  };

  const onFailSend = (setSubmitting, setFieldError) => () => {
    inputRef.current.focus();
    setSubmitting(false);
    setFieldError('channelName', 'Ошибка сети');
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
            <Modal.Title>Переименовать канал</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Field
                name="channelName"
                innerRef={inputRef}
                disabled={isSubmitting}
                autoComplete="off"
                className={`form-control ${errors.channelName && touched.channelName && 'is-invalid'}`}
              />
              <ErrorMessage className="invalid-tooltip" name="channelName" component="div" />
            </Form>
          </Modal.Body>
          <Modal.Footer className="border-0">
            <Button onClick={cancelHandler(resetForm)} variant="secondary">Отменить</Button>
            <Button onClick={submitForm} variant="primary" type="submit" disabled={isSubmitting}>Отправить</Button>
          </Modal.Footer>
        </Modal>
      )}
    </Formik>
  );
};

export default ModalRenameChannel;
