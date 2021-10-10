import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import routes from '../routes.js';
import { useAuth } from '../hooks/index.js';
import avatarImage from '../../assets/registration.jpeg';

const Registration = () => {
  const [error, setError] = useState(null);
  const auth = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();
  const validationSchema = yup.object().shape({
    username: yup.string().min(3).required(),
    password: yup.string().min(6).max(20).required(),
    confirmPassword: yup.string().required().oneOf([yup.ref('password'), null], t('errors.confirmPasswords')),
  });
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setError(null);
        const response = await axios.post(routes.signUpPath(), values);
        const userData = response.data;
        auth.logIn(userData);
        setSubmitting(false);
        const { from } = location.state || { from: { pathname: routes.chatPagePath() } };
        history.replace(from);
      } catch (e) {
        if (e.response.status === 409) {
          setError(t('errors.userExist'));
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
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img
                  src={avatarImage}
                  className="rounded-circle"
                  alt={t('signup.register')}
                />

              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('signup.register')}</h1>
                <Form.Group className="mb-3 form-floating">
                  <Form.Control
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    placeholder={t('username')}
                    onChange={formik.handleChange}
                    isInvalid={error}
                    disabled={formik.isSubmitting}
                    value={formik.values.username}
                  />
                  <Form.Label htmlFor="username">{t('username')}</Form.Label>
                  {formik.errors.username && formik.touched.username ? (<p className="text-danger">{t('errors.usernameCountSymbols')}</p>) : null}
                </Form.Group>
                <Form.Group className="mb-3 form-floating">
                  <Form.Control
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="new-password"
                    placeholder={t('password')}
                    onChange={formik.handleChange}
                    isInvalid={error}
                    disabled={formik.isSubmitting}
                    value={formik.values.password}
                  />
                  <Form.Label htmlFor="password">{t('password')}</Form.Label>
                  {formik.errors.password && formik.touched.password ? (<p className="text-danger">{t('errors.passwordCountSymbols')}</p>) : null}
                </Form.Group>
                <Form.Group className="mb-4 form-floating">
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    autoComplete="new-password"
                    placeholder={t('password')}
                    onChange={formik.handleChange}
                    isInvalid={error}
                    disabled={formik.isSubmitting}
                    value={formik.values.confirmPassword}
                  />
                  <Form.Label htmlFor="confirmPassword">{t('signup.confirmPassword')}</Form.Label>
                  {(formik.errors.confirmPassword && formik.touched.confirmPassword) ? (<div className="text-danger">{formik.errors.confirmPassword}</div>) : null}
                  {error ? (<div className="invalid-tooltip">{error}</div>) : null}
                </Form.Group>
                <Button variant="outline-primary" className="w-100" type="submit" disabled={formik.isSubmitting}>
                  {t('signup.signUp')}
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
