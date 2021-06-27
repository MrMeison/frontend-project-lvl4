import { useEffect, useRef } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

const MessageForm = ({ channel }) => {
  const { t } = useTranslation();
  const inputRef = useRef(null);

  const validationSchema = yup.object().shape({
    body: yup
      .string()
      .trim()
      .required('Required'),
  });

  const f = useFormik({
    initialValues: { body: '' },
    validationSchema,
    validateOnBlur: false,
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [channel]);

  const isInvalid = !f.dirty || !f.isValid;

  return (
    <Form noValidate onSubmit={f.handleSubmit} className="py-1 border rounded-2">
      <InputGroup hasValidation={isInvalid}>
        <Form.Control
          ref={inputRef}
          onChange={f.handleChange}
          onBlur={f.handleBlur}
          value={f.values.body}
          name="body"
          data-testid="new-message"
          disabled={f.isSubmitting}
          placeholder="Введите сообщение..."
          className="border-0 p-0 ps-2"
        />
        <InputGroup.Append>
          <Button variant="group-vertical" type="submit" disabled={isInvalid}>
            <ArrowRightSquare size={20} />
            <span className="visually-hidden">{t('chat.send')}</span>
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
};

export default MessageForm;
