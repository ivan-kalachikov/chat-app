import React from 'react';
import { Link } from 'react-router-dom';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';

const Login = () => {
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

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <Formik validationSchema={validationSchema} initialValues={initialValues}>
            {({ errors, touched }) => (
              <Form className="p-3">
                <div className="form-group">
                  <label className="form-label" htmlFor="username">Ваш ник</label>
                  <Field
                    className={classNames('form-control', { 'is-invalid': errors.username && touched.username })}
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    required
                  />
                  <ErrorMessage className="invalid-feedback" name="username" component="div" />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="password">Пароль</label>
                  <Field
                    className={classNames('form-control', { 'is-invalid': errors.password && touched.password })}
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="off"
                    required
                  />
                  <ErrorMessage className="invalid-feedback" name="password" component="div" />
                </div>
                <button className="w-100 mb-3 btn btn-outline-primary" type="submit">Войти</button>
                <div className="d-flex flex-column align-items-center">
                  <span className="small mb-2">Нет аккаунта?</span>
                  <Link to="/signup">Регистрация</Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
