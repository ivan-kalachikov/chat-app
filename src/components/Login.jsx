import React, { useEffect, useState } from 'react';
import {
  ErrorMessage, Formik,
} from 'formik';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Container, Row, Col, Card, Form, Button,
} from 'react-bootstrap';
import routes from '../routes';
import { useAuthToken, useAuthUsername } from '../context';

const Login = () => {
  const { setAuthToken } = useAuthToken();
  const { setAuthUsername } = useAuthUsername();
  const [authData, setAuthData] = useState(null);
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .trim()
      .required(),
    password: Yup.string()
      .trim()
      .required(),
  });

  const initialValues = {
    username: '',
    password: '',
  };

  useEffect(() => {
    if (!authData) {
      return;
    }
    const { token, username } = authData;
    localStorage.setItem('authToken', token);
    localStorage.setItem('username', username);
    setAuthToken(token);
    setAuthUsername(username);
  }, [authData, setAuthToken, setAuthUsername]);

  const authenticate = async (data, { setFieldError, setSubmitting }) => {
    const url = routes.login();
    setSubmitting(true);
    try {
      const response = await axios.post(url, data);
      const responseData = response.data;
      setAuthData(responseData);
      setSubmitting(false);
    } catch (e) {
      if (e.response?.status === 401) {
        setFieldError('password', t('errors.wrongUsernameOrPassword'));
      } else {
        setFieldError('password', t('errors.networkError'));
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
                onSubmit={authenticate}
              >
                {({
                  errors, touched, values, handleChange, handleBlur, handleSubmit, isSubmitting,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <h1 className="text-center mb-4">{t('ui.login.title')}</h1>
                    <fieldset disabled={isSubmitting}>
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
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.username}
                          placeholder={t('ui.login.username')}
                        />
                        <Form.Label htmlFor="username">{t('ui.login.username')}</Form.Label>
                        <ErrorMessage className="invalid-tooltip" name="username" component="div" />
                      </Form.Floating>
                      <Form.Floating className="mb-3">
                        <Form.Control
                          className={errors.password && touched.password && 'is-invalid'}
                          type="password"
                          name="password"
                          id="password"
                          autoComplete="off"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          placeholder={t('ui.login.password')}
                        />
                        <Form.Label htmlFor="password">{t('ui.login.password')}</Form.Label>
                        <ErrorMessage className="invalid-tooltip" name="password" component="div" />
                      </Form.Floating>
                      <Button variant="outline-primary" className="w-100 py-3 mt-2" type="submit">{t('ui.login.signInButton')}</Button>
                    </fieldset>
                  </Form>
                )}
              </Formik>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('ui.login.noAccount')}</span>
                {' '}
                <Link to="/signup">{t('ui.login.register')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
