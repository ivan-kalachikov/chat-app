import React, { useContext, useState, useEffect } from 'react';
import {
  ErrorMessage, Formik,
} from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Container, Row, Col, Card, Form, Button,
} from 'react-bootstrap';
import routes from '../routes';
import AuthContext from './AuthContext.jsx';

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const [authData, setAuthData] = useState(null);

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .trim()
      .required('Username is required!')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов'),
    password: Yup.string()
      .trim()
      .min(6, 'Не менее 6 символов')
      .required('Password is required!'),
    passwordConfirmation: Yup.string()
      .trim()
      .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
  });

  const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: '',
  };

  useEffect(() => {
    if (!authData) {
      return;
    }
    const { token, username } = authData;
    localStorage.setItem('authToken', token);
    localStorage.setItem('username', username);
    setAuth({ authToken: token, username });
  }, [authData]);

  const registration = async (data, { setFieldError, setSubmitting }) => {
    const url = routes.signup();
    setSubmitting(true);
    try {
      const response = await axios.post(url, data);
      const { token, username } = response.data;
      setAuthData({ token, username });
      setSubmitting(false);
    } catch (e) {
      if (e.response?.status === 409) {
        setFieldError('username', 'Пользователь с таким именем уже существует');
      } else {
        setFieldError('password', 'Ошибка сети');
      }
      setSubmitting(false);
    }
  };

  return (
    <Container fluid className="flex-grow-1">
      <Row className="justify-content-center align-content-center h-100 py-4">
        <Col xl={4}>
          <Card className="shadow-sm">
            <Card.Body className="p-5">
              <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={registration}
              >
                {({
                  errors, touched, values, handleChange, handleBlur, handleSubmit, isSubmitting,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <h1 className="text-center mb-4">Регистрация</h1>
                    <Form.Floating className="mb-3">
                      <Form.Control
                        className={
                          (errors.username || errors.username === null)
                           && touched.username && 'is-invalid'
                        }
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="username"
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                        placeholder="Ваш ник"
                      />
                      <Form.Label htmlFor="username">Ваш ник</Form.Label>
                      <ErrorMessage className="invalid-tooltip" name="username" component="div" />
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                      <Form.Control
                        className={errors.password && touched.password && 'is-invalid'}
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="off"
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        placeholder="Пароль"
                      />
                      <Form.Label htmlFor="password">Пароль</Form.Label>
                      <ErrorMessage className="invalid-tooltip" name="password" component="div" />
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                      <Form.Control
                        className={errors.passwordConfirmation && touched.passwordConfirmation && 'is-invalid'}
                        type="password"
                        name="passwordConfirmation"
                        id="passwordConfirmation"
                        autoComplete="off"
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.passwordConfirmation}
                        placeholder="Пароль"
                      />
                      <Form.Label htmlFor="passwordConfirmation">Подтвердите пароль</Form.Label>
                      <ErrorMessage className="invalid-tooltip" name="passwordConfirmation" component="div" />
                    </Form.Floating>
                    <Button variant="outline-primary" className="w-100 py-3 mt-2" type="submit" disabled={isSubmitting}>Зарегистрироваться</Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Уже есть аккаунт?</span>
                {' '}
                <Link to="/login">Войти</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

// todo Network error
