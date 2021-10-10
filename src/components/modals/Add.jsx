import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import {
  Form, Modal, FormControl, Button,
} from 'react-bootstrap';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { useApi } from '../../hooks/index.js';
import { channelsNamesSelector, modalSelector } from '../../selectors.js';

const AddModal = ({ handleClose }) => {
  const [error, setError] = useState(null);
  const modalInfo = useSelector(modalSelector);
  const api = useApi();
  const inputRef = useRef();
  const { t } = useTranslation();
  const channelsNames = useSelector(channelsNamesSelector);
  const validationSchema = yup.object().shape({
    body: yup.string().notOneOf(channelsNames, t('errors.channelExist')).trim(t('errors.required')).required(),
  });
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema,
    onSubmit: (values) => {
      api('newChannel', { name: values.body.trim() })
        .then(() => {
          setError(null);
          handleClose();
        })
        .catch((e) => {
          if (e.response.status === 408) {
            setError(t('errors.timeout'));
          } else {
            setError(t('errors.network'));
          }
          formik.setSubmitting(false);
        });
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show={modalInfo.show} centered>
      <Modal.Header>
        <Modal.Title>{t('modal.addChannel')}</Modal.Title>
        <Button
          variant="close"
          type="button"
          onClick={handleClose}
          aria-label="Close"
          data-bs-dismiss="modal"
        />
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormControl
            onChange={formik.handleChange}
            value={formik.values.body}
            isInvalid={!formik.isValid || error}
            data-testid="add-channel"
            name="body"
            ref={inputRef}
            className="mb-2"
          />
          <Form.Control.Feedback type="invalid">{error || formik.errors.body}</Form.Control.Feedback>
          <div className="d-flex justify-content-end">
            <button type="button" disabled={formik.isSubmitting} className="btn btn-secondary me-2" onClick={handleClose}>
              {t('cancel')}
            </button>
            <button type="submit" disabled={formik.isSubmitting} className="btn btn-primary">
              {t('send')}
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
