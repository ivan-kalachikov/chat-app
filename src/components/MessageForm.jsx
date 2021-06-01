import React, { useRef, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { InputGroup, Button } from 'react-bootstrap';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import * as Yup from 'yup';
import AuthContext from './AuthContext.jsx';
import socket from '../socket';
import ackWithTimeout from '../utils';
import SendIcon from '../images/send.svg';

const MessageForm = () => {
  const { auth } = useContext(AuthContext);
  const { username } = auth;
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const inputRef = useRef(null);
  const validationSchema = Yup.object().shape({
    message: Yup.string()
      .trim()
      .required('Нельзя отправить пустое сообщение'),
  });
  const initialValues = {
    message: '',
  };

  const onSuccessSend = (resetForm, setSubmitting, setTouched, setFieldError) => ({ status }) => {
    if (status === 'ok') {
      resetForm();
      setTouched({ message: false });
    } else {
      setFieldError('message', 'Ошибка сети');
    }
    setSubmitting(false);
    inputRef.current.focus();
  };

  const onFailSend = (setSubmitting, setFieldError) => () => {
    inputRef.current.focus();
    setSubmitting(false);
    setFieldError('message', 'Ошибка сети');
    inputRef.current.focus();
  };

  const submitHandler = ({ message }, {
    resetForm, setSubmitting, setTouched, setFieldError,
  }) => {
    const newMsg = { body: message, channelId: currentChannelId, username };
    socket.volatile.emit(
      'newMessage',
      newMsg,
      ackWithTimeout(
        onSuccessSend(resetForm, setSubmitting, setTouched, setFieldError),
        onFailSend(setSubmitting, setFieldError),
        3000,
      ),
    );
  };

  const blurHandler = (setTouched) => () => {
    setTouched({ message: false });
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={submitHandler}
    >
      {({
        errors, touched, submitForm, isSubmitting, setTouched,
      }) => (
        <div className="border-top py-3 px-5">
          <Form onSubmit={submitHandler}>
            <InputGroup>
              <Field
                name="message"
                className={`border-0 form-control ${errors.message && touched.message && 'is-invalid'}`}
                disabled={isSubmitting}
                innerRef={inputRef}
                placeholder="Введите сообщение..."
                onBlur={blurHandler(setTouched)}
                required
              />
              <ErrorMessage className="invalid-tooltip top-0 translate-middle-y" name="message" component="div" />
              <Button onClick={submitForm} variant="" type="submit" disabled={isSubmitting}>
                <SendIcon />
              </Button>
            </InputGroup>
          </Form>
        </div>
      )}
    </Formik>

  );
};

export default MessageForm;
