import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import resources from './locales/index.js';

import reducer, { actions } from './slices/index.js';
import App from './components/App.jsx';
import ApiContext from './contexts/apiContext';
import { SOCKET_TIMEOUT, SocketStatus } from './constants';

export default async (socket) => {
  const withSocketErrorHandler = (socketFunc) => (...args) => new Promise((resolve, reject) => {
    const state = {
      status: SocketStatus.Pending,
    };
    const timer = setTimeout(() => {
      state.status = SocketStatus.Reject;
      reject();
    }, SOCKET_TIMEOUT);

    socketFunc(...args, (response) => {
      if (state.status !== 'pending') return;

      clearTimeout(timer);

      if (response.status === 'ok') {
        state.status = SocketStatus.Resolved;
        resolve(response.data);
      }
      reject();
    });
  });

  const api = {
    sendMessage: withSocketErrorHandler((...args) => socket.volatile.emit('newMessage', ...args)),
    createChannel: withSocketErrorHandler((...args) => socket.volatile.emit('newChannel', ...args)),
    renameChannel: withSocketErrorHandler((...args) => socket.volatile.emit('renameChannel', ...args)),
    removeChannel: withSocketErrorHandler((...args) => socket.volatile.emit('removeChannel', ...args)),
  };

  const store = configureStore({
    reducer,
  });

  socket.on('newMessage', (payload) => {
    store.dispatch(actions.addMessage({ message: payload }));
  });
  socket.on('newChannel', (payload) => {
    store.dispatch(actions.addChannel({ channel: payload }));
  });
  socket.on('removeChannel', (payload) => {
    store.dispatch(actions.removeChannel({ channelId: payload.id }));
  });
  socket.on('renameChannel', (payload) => {
    store.dispatch(actions.renameChannel({
      channelId: payload.id,
      channelName: payload.name,
    }));
  });

  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  const vdom = (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ApiContext.Provider value={api}>
          <App />
        </ApiContext.Provider>
      </I18nextProvider>
    </Provider>
  );

  return vdom;
};
