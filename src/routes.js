// @ts-check

const host = '';
const prefix = 'api/v1';

export default {
  signupPath: () => [host, prefix, 'signup'].join('/'),
  dataPath: () => [host, prefix, 'data'].join('/'),
  loginPath: () => [host, prefix, 'login'].join('/'),
  loginPagePath: () => '/login',
  signupPagePath: () => '/signup',
  chatPagePath: () => '/',
};
