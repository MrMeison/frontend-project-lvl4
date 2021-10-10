// @ts-check

const host = '';
const prefix = 'api/v1';

export default {
  chatPagePath: () => '/',
  loginPagePath: () => '/login',
  signUpPagePath: () => '/signup',
  notFoundPagePath: () => '*',
  loginPath: () => [host, prefix, 'login'].join('/'),
  signUpPath: () => [host, prefix, 'signup'].join('/'),
  dataPath: () => [host, prefix, 'data'].join('/'),
  channelsPath: () => [host, prefix, 'channels'].join('/'),
  channelPath: (id) => [host, prefix, 'channels', id].join('/'),
  channelMessagesPath: (id) => [host, prefix, 'channels', id, 'messages'].join('/'),
};
