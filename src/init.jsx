import React from 'react';
import { Provider } from 'react-redux';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import * as yup from 'yup';
import App from './components/App.jsx';
import store from './store.js';
import resources from './locales/index.js';
import {
  addChannel, renameChannel, removeChannel,
} from './slices/channels';
import { addNewMessage } from './slices/messages.js';
import { ApiContext } from './contexts/index.js';

export default async (socket) => {
  const instance = i18n.createInstance();

  const socketState = {
    status: null,
  };
  socket.on('connect', () => {
    socketState.status = 'ok';
  });
  socket.on('newChannel', (newChannel) => {
    store.dispatch(addChannel(newChannel));
    socketState.status = 'ok';
  });
  socket.on('removeChannel', (removedChannel) => {
    store.dispatch(removeChannel(removedChannel));
    socketState.status = 'ok';
  });
  socket.on('renameChannel', (renamingChannel) => {
    store.dispatch(renameChannel(renamingChannel));
    socketState.status = 'ok';
  });
  socket.on('newMessage', (newMessage) => {
    store.dispatch(addNewMessage(newMessage));
    socketState.status = 'ok';
  });
  socket.on('connect_error', () => {
    socketState.status = 'errorConnection';
    socket.connect();
  });

  const api = (type, data) => new Promise((resolve, reject) => {
    const withTimeout = (delay) => {
      const timer = setTimeout(() => {
        socketState.status = 'errorConnection';
      }, delay);

      return (resp) => {
        if (resp.status !== 'ok') {
          reject(resp.error);
        } else if (socketState.status === 'errorConnection') {
          const error = new Error('errorConnection');
          error.response = {
            status: 408,
          };
          reject(error);
        } else {
          resolve();
        }
        clearTimeout(timer);
      };
    };

    socket.volatile.emit(type, data, withTimeout(3000));
  });

  await instance
    .use(initReactI18next)
    .init({
      resources,
      lng: 'ru',
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });
  yup.setLocale({
    mixed: {
      required: instance.t('errors.required'),
    },
  });
  return (
    <I18nextProvider i18n={instance}>
      <Provider store={store}>
        <ApiContext.Provider value={api}>
          <App />
        </ApiContext.Provider>
      </Provider>
    </I18nextProvider>
  );
};
