import { createSelector } from '@reduxjs/toolkit';

export const channelsSelector = (state) => state.channelsData.channels;
export const channelIdSelector = (state) => state.channelsData.currentChannelId;
export const messagesSelector = (state) => state.messagesData.messages;
export const modalSelector = (state) => state.modal.modalInfo;

export const channelsNamesSelector = createSelector(
  channelsSelector,
  (channels) => channels.map((channel) => channel.name),
);

export const currentMessagesSelector = createSelector(
  messagesSelector,
  channelIdSelector,
  (messages, currentChannelId) => (
    messages
      .filter((message) => message.channelId === currentChannelId)),
);
