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
      .required('Обязательное поле')
      .notOneOf(channelsNames, 'Должно быть уникальным')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов'),
  });

  const initialValues = {
    channelName: '',
  };
  const submitHandler = (formData, { setErrors, setSubmitting, resetForm }) => {
    const name = formData.channelName;
    socket.emit('newChannel', { name }, (({ status, data }) => {
      if (status === 'ok') {
        dispatch(setCurrentChannel({ id: data.id }));
        dispatch(closeModal());
        resetForm();
      } else {
        setErrors({
          channelName: 'Ошибка сети',
        });
      }
    }));
    setSubmitting(false);
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
