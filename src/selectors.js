export const channelsInfo = (state) => state.channelsInfo;

export const getCurrentChannel = (state) => {
  const { channels, currentChannelId } = state.channelsInfo;
  return channels.find((c) => c.id === currentChannelId);
};

export const getMessagesForCurrentChannel = (state) => {
  const { currentChannelId } = state.channelsInfo;
  const { messages } = state.messagesInfo;
  const channelMessages = messages.filter((m) => m.channelId === currentChannelId);
  return channelMessages;
};

export const getChannelsNames = (state) => {
  const { channels } = state.channelsInfo;
  return channels.map(({ name }) => name);
};

export const getChannelById = (channelId) => (state) => {
  const { channels } = state.channelsInfo;
  return channels.find(({ id }) => channelId === id);
};
