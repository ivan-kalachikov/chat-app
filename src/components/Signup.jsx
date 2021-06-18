import React, { useEffect, useState } from 'react';
import {
  ErrorMessage, Formik,
} from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Container, Row, Col, Card, Form, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import routes from '../routes';
import { useAuth, useUsername } from '../context';

const Signup = () => {
  const { setIsAuth, setAuth } = useAuth();
  const { setUsername } = useUsername();
  const [authData, setAuthData] = useState(null);
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .trim()
      .required()
      .minmax(3, 20),
    password: Yup.string()
      .trim()
      .min(6)
      .required(),
    passwordConfirmation: Yup.string()
      .trim()
      .equalPasswords(Yup.ref('password')),
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
    setAuth({ token, username });
    setIsAuth(true);
    setUsername(username);
  }, [authData, setAuth, setIsAuth, setUsername]);

  const registration = async (data, { setFieldError, setSubmitting }) => {
    const url = routes.signup();
    try {
      const response = await axios.post(url, data);
      const responseData = response.data;
      setAuthData(responseData);
      setSubmitting(false);
    } catch (e) {
      if (e.response?.status === 409) {
        setFieldError('username', t('errors.userAlreadyExist'));
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
                onSubmit={registration}
              >
                {({
                  errors, touched, values, handleChange, handleBlur, handleSubmit, isSubmitting,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <h1 className="text-center mb-4">{t('ui.registration.title')}</h1>
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
                          placeholder={t('ui.registration.username')}
                        />
                        <Form.Label htmlFor="username">{t('ui.registration.username')}</Form.Label>
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
                          placeholder={t('ui.registration.password')}
                        />
                        <Form.Label htmlFor="password">{t('ui.registration.password')}</Form.Label>
                        <ErrorMessage className="invalid-tooltip" name="password" component="div" />
                      </Form.Floating>
                      <Form.Floating className="mb-3">
                        <Form.Control
                          className={errors.passwordConfirmation && touched.passwordConfirmation && 'is-invalid'}
                          type="password"
                          name="passwordConfirmation"
                          id="passwordConfirmation"
                          autoComplete="off"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.passwordConfirmation}
                          placeholder={t('ui.registration.passwordConfirmation')}
                        />
                        <Form.Label htmlFor="passwordConfirmation">{t('ui.registration.passwordConfirmation')}</Form.Label>
                        <ErrorMessage className="invalid-tooltip" name="passwordConfirmation" component="div" />
                      </Form.Floating>
                      <Button variant="outline-primary" className="w-100 py-3 mt-2" type="submit">{t('ui.registration.signUpButton')}</Button>
                    </fieldset>
                  </Form>
                )}
              </Formik>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('ui.registration.alreadyHaveAccount')}</span>
                {' '}
                <Link to="/login">{t('ui.registration.login')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
