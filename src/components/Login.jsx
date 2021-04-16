import React, { useContext } from 'react';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
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

  const authenticate = async (data, { setErrors }) => {
    const url = routes.login();
    try {
      const response = await axios.post(url, data);
      if (response.status === 200) {
        const { token, username } = response.data;
        localStorage.setItem('authToken', token);
        localStorage.setItem('userName', username);
        setAuth({ authToken: token, userName: username });
      }
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
    }
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={authenticate}
          >
            {({ errors, touched }) => (
              <Form className="p-3">
                <div className="form-group">
                  <label className="form-label" htmlFor="username">Ваш ник</label>
                  <Field
                    className={cn(
                      {
                        'form-control': true,
                        'is-invalid': (errors.username || errors.username === null) && touched.username,
                      },
                    )}
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
                    className={cn({
                      'form-control': true,
                      'is-invalid': errors.password && touched.password,
                    })}
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

// todo Network error
