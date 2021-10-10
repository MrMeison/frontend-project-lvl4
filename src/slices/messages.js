/* eslint no-param-reassign:
["error", { "props": true, "ignorePropertyModificationsFor": ["state"] }] */
import { createSlice } from '@reduxjs/toolkit';
import { removeChannel, setInitialState } from './channels.js';

export const messagesSlice = createSlice({
  name: 'messagesData',
  initialState: {
    messages: [],
  },
  reducers: {
    setMessages: (state, { payload }) => {
      state.messages = payload.messages;
    },
    addNewMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
  extraReducers: {
    [removeChannel]: (state, { payload }) => {
      const newMessages = state.messages.filter((message) => message.channelId !== payload.id);
      state.messages = newMessages;
    },
    [setInitialState]: (state, { payload }) => {
      const { messages } = payload;
      state.messages = messages;
    },
  },
});

export const { addNewMessage, setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
