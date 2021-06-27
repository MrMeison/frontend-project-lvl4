/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import remove from 'lodash/remove.js';

const defaultChannelId = 1;

const slice = createSlice({
  name: 'channelsInfo',
  initialState: { channels: [], currentChannelId: null },
  reducers: {
    setInitialState(state, { payload }) {
      const { channels, currentChannelId } = payload;
      state.channels = channels;
      state.currentChannelId = currentChannelId;
    },
    setCurrentChannel(state, { payload }) {
      const { channelId } = payload;
      state.currentChannelId = channelId;
    },
    addChannel(state, { payload }) {
      const { channel } = payload;
      state.channels.push(channel);
    },
    removeChannel(state, { payload }) {
      const { channelId } = payload;
      remove(state.channels, ({ id }) => id === channelId);
      if (state.currentChannelId === channelId) {
        state.currentChannelId = defaultChannelId;
      }
    },
    renameChannel(state, { payload }) {
      const { channelId, channelName } = payload;
      const channel = state.channels.find(({ id }) => id === channelId);
      channel.name = channelName;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
