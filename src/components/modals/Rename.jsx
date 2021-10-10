import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
  Modal, FormControl, Form, Button,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useApi } from '../../hooks/index.js';
import { channelsNamesSelector, modalSelector } from '../../selectors.js';

const RenameModal = ({ handleClose }) => {
  const [error, setError] = useState();
  const modalInfo = useSelector(modalSelector);
  const api = useApi();
  const { t } = useTranslation();
  const channelsNames = useSelector(channelsNamesSelector);
  const validationSchema = yup.object().shape({
    body: yup.string().notOneOf(channelsNames, t('errors.channelExist')).trim(t('errors.required')).required(),
  });
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      body: modalInfo.item.name,
    },
    validationSchema,
    onSubmit: (values) => {
      const renamingChannel = { ...modalInfo.item, name: values.body };
      api('renameChannel', renamingChannel)
        .then(() => {
          setError(null);
          handleClose();
        })
        .catch((e) => {
          formik.setSubmitting(false);
          if (e.response.status === 408) {
            setError(t('errors.timeout'));
          } else {
            setError(t('errors.network'));
          }
        });
    },
  });
  return (
    <Modal show={modalInfo.show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>{t('modal.renameChannel')}</Modal.Title>
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
            data-testid="rename-channel"
            className="mb-2"
            name="body"
            ref={inputRef}
          />
          <Form.Control.Feedback type="invalid">{error || formik.errors.body}</Form.Control.Feedback>
          <div className="d-flex justify-content-end">
            <button type="button" disabled={formik.isSubmitting} className="btn btn-secondary me-2" onClick={handleClose}>
              {t('cancel')}
            </button>
            <button type="submit" disabled={formik.isSubmitting} className="btn btn-primary">{t('send')}</button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameModal;
