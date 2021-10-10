import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './slices/channels.js';
import messagesReducer from './slices/messages.js';
import modalsReducer from './slices/modal.js';

const store = configureStore({
  reducer: {
    channelsData: channelsReducer,
    messagesData: messagesReducer,
    modal: modalsReducer,
  },
});

export default store;
