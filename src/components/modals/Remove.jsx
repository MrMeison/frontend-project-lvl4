import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useApi } from '../../hooks/index.js';
import { modalSelector } from '../../selectors.js';

const RemoveModal = ({ handleClose }) => {
  const [error, setError] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const api = useApi();
  const { t } = useTranslation();
  const modalInfo = useSelector(modalSelector);

  const handleRemove = () => {
    setIsSubmitting(true);
    api('removeChannel', modalInfo.item)
      .then(() => {
        setError(null);
        handleClose();
      })
      .catch((e) => {
        setIsSubmitting(false);
        if (e.response.status === 408) {
          setError(t('errors.timeout'));
        } else {
          setError(t('errors.network'));
        }
      });
  };
  return (
    <Modal show={modalInfo.show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>{t('modal.removeChannel')}</Modal.Title>
        <Button
          variant="close"
          type="button"
          onClick={handleClose}
          aria-label="Close"
          data-bs-dismiss="modal"
        />

      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t('youSure')}</p>
        <div className="d-flex justify-content-end">
          <button type="button" disabled={isSubmitting} className="btn btn-secondary me-2" onClick={handleClose}>
            {t('cancel')}
          </button>
          <button type="button" disabled={isSubmitting} className="btn btn-danger" onClick={handleRemove}>{t('remove')}</button>
        </div>
        {error ? <div className="text-danger">{error}</div> : null}
      </Modal.Body>
    </Modal>
  );
};

export default RemoveModal;
