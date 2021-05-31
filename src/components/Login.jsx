import React, { useContext } from 'react';
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

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required!'),
  password: Yup.string()
    .required('Password is required!'),
});

const initialValues = {
  username: '',
  password: '',
};

const Login = () => {
  const { setAuth } = useContext(AuthContext);

  const authenticate = async (data, { setErrors, setSubmitting, resetForm }) => {
    const url = routes.login();
    setSubmitting(true);
    try {
      const response = await axios.post(url, data);
      const { token, username } = response.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('username', username);
      setAuth({ authToken: token, username });
      resetForm();
      setSubmitting(false);
    } catch (e) {
      if (e.response?.status === 401) {
        setErrors({
          username: null,
          password: 'Неверные имя пользователя или пароль',
        });
      } else {
        setErrors({
          username: null,
          password: 'Ошибка сети',
        });
      }
      setSubmitting(false);
    }
  };

  return (
    <Container fluid className="flex-grow-1">
      <Row className="justify-content-center align-content-center h-100">
        <Col xl={4}>
          <Card className="shadow-sm">
            <Card.Body className="p-5">
              <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={authenticate}
              >
                {({
                  errors, touched, values, handleChange, handleBlur, handleSubmit, isSubmitting,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <h1 className="text-center mb-4">Войти</h1>
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
                    <Button variant="outline-primary" className="w-100 mb-3" type="submit" disabled={isSubmitting}>Войти</Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                {' '}
                <Link to="/signup">Регистрация</Link>
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
