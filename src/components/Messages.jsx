import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { animateScroll as scroll, Element as ScrollProvider } from 'react-scroll';
import { useFormik } from 'formik';
import { Form } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useApi, useAuth } from '../hooks/index.js';
import { channelsSelector, currentMessagesSelector, channelIdSelector } from '../selectors.js';

const MessagesHeader = () => {
  const { t } = useTranslation();
  const channels = useSelector(channelsSelector);
  const currentChannelId = useSelector(channelIdSelector);
  const messages = useSelector(currentMessagesSelector);
  const currentChannel = channels.find(({ id }) => currentChannelId === id);
  const messagesCount = messages.length;
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          {`# ${currentChannel && currentChannel.name}`}
        </b>
      </p>
      <p className="text-muted">{t('messages.message', { count: messagesCount })}</p>
    </div>
  );
};

const MessagesBox = () => {
  const messages = useSelector(currentMessagesSelector);
  useEffect(() => {
    scroll.scrollToBottom({ containerId: 'messages-container' });
  }, [messages]);
  return (
    <ScrollProvider className="chat-messages overflow-auto px-5" id="messages-container">
      <div className="chat-messages overflow-auto px-5" id="messages-box">
        {messages.map(({ text, username, id }) => (
          <div className="text-break mb-2" key={id}>
            <b>{username}</b>
            {': '}
            {text}
          </div>
        ))}
      </div>
    </ScrollProvider>
  );
};

const MessagesForm = () => {
  const [error, setError] = useState();
  const messageInput = useRef();
  const api = useApi();
  const auth = useAuth();
  const currentChannelId = useSelector(channelIdSelector);

  useEffect(() => {
    messageInput.current.focus();
  }, [currentChannelId]);

  const { t } = useTranslation();

  const { username } = auth.user;

  const formik = useFormik({
    initialValues: { message: '' },
    onSubmit: ({ message }, actions) => {
      const currentMessage = { username, text: message, channelId: currentChannelId };
      api('newMessage', currentMessage)
        .then(() => actions.resetForm())
        .catch((e) => {
          if (e.response.status === 408) {
            setError(t('errors.timeout'));
          } else {
            setError(t('errors.network'));
          }
        });
    },
  });
  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
        <div className="input-group has-validation">
          <Form.Control
            type="text"
            name="message"
            ref={messageInput}
            data-testid="new-message"
            placeholder={t('inputMessagePlaceholder')}
            className="border-0 p-0 ps-2"
            onChange={formik.handleChange}
            value={formik.values.message}
          />
          <div className="input-group-append">
            <button disabled={!formik.values.message} type="submit" className="btn btn-group-vertical">
              <ArrowRightSquare size={20} />
              <span className="visually-hidden">{t('send')}</span>
            </button>
          </div>
        </div>
      </Form>
      {error ? <div className="text-danger">{error}</div> : null}
    </div>
  );
};

const MessagesContainer = () => (
  <div className="d-flex flex-column h-100">
    <MessagesHeader />
    <MessagesBox />
    <MessagesForm />
  </div>
);

export default MessagesContainer;
