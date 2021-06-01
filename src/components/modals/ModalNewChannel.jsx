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
import { setCurrentChannel } from '../../slices/channelsSlice';
import ackWithTimeout from '../../utils';

const ModalAddChannel = () => {
  const TYPE = 'addChannel';
  const inputRef = useRef(null);
  const channels = useSelector((state) => state.channelsInfo.channels);
  const isOpen = useSelector((state) => state.modal.isOpen);
  const modalType = useSelector((state) => state.modal.type);
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

  const onSuccessSend = (
    resetForm,
    setSubmitting,
    setTouched,
    setFieldError,
  ) => ({ status, data }) => {
    if (status === 'ok') {
      dispatch(setCurrentChannel({ id: data.id }));
      resetForm();
      setTouched({ channelName: false });
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

  const submitHandler = (formData, {
    resetForm, setFieldError, setSubmitting, setTouched,
  }) => {
    setSubmitting(true);
    const name = formData.channelName;
    socket.volatile.emit('newChannel', { name }, ackWithTimeout(
      onSuccessSend(resetForm, setSubmitting, setTouched, setFieldError),
      onFailSend(setSubmitting, setFieldError),
      2500,
    ));
  };
  const hideHandler = () => {
    dispatch(closeModal());
  };
  const showHandler = () => {
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
        errors, touched, submitForm, isSubmitting, resetForm,
      }) => (
        <Modal
          show={isOpen && modalType === TYPE}
          onShow={showHandler}
          onHide={hideHandler}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Добавить канал</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Field
                name="channelName"
                innerRef={inputRef}
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

export default ModalAddChannel;
