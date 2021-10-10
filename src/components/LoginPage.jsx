import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useLocation, useHistory, Link } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import { useAuth } from '../hooks/index.js';
import routes from '../routes.js';
import loginImage from '../../assets/login.jpg';

const SignUpButton = () => {
  const { t } = useTranslation();
  return (
    <Link to={routes.signUpPagePath()}>
      {t('signup.register')}
    </Link>
  );
};

const LoginPage = () => {
  const auth = useAuth();
  const [error, setError] = useState();
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();
  const loginSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  });
  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setError(null);
        const response = await axios.post(routes.loginPath(), values);
        const userData = response.data;
        auth.logIn(userData);
        setSubmitting(false);
        const { from } = location.state || { from: { pathname: routes.chatPagePath() } };
        history.replace(from);
      } catch (e) {
        if (e.response.status === 401) {
          setError(t('errors.fillError'));
        } else if (e.response.status === 409) {
          setError(t('errors.repeatRequest'));
        } else {
          setError(t('errors.network'));
        }
      }
    },
  });
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={loginImage}
                  className="rounded-circle"
                  alt="Войти"
                />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('login.logIn')}</h1>
                <Form.Group className="mb-3 form-floating">
                  <Form.Control
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    placeholder={t('yourNick')}
                    onChange={formik.handleChange}
                    isInvalid={error}
                    disabled={formik.isSubmitting}
                    value={formik.values.username}
                  />
                  <Form.Label htmlFor="username">{t('yourNick')}</Form.Label>
                  {formik.errors.username && formik.touched.username ? (<p className="text-danger">{formik.errors.username}</p>) : null}
                </Form.Group>
                <Form.Group className="mb-3 form-floating">
                  <Form.Control
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    placeholder={t('password')}
                    onChange={formik.handleChange}
                    isInvalid={error}
                    disabled={formik.isSubmitting}
                    value={formik.values.password}
                  />
                  <Form.Label htmlFor="password">{t('password')}</Form.Label>
                  {formik.errors.password && formik.touched.password ? (<p className="text-danger">{formik.errors.password}</p>) : null}
                  {error ? (<div className="invalid-tooltip">{error}</div>) : null}
                </Form.Group>

                <Button variant="outline-primary" className="w-100" type="submit" disabled={formik.isSubmitting}>
                  {t('login.logIn')}
                </Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span className="me-1">{t('noAccount')}</span>
                <SignUpButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
