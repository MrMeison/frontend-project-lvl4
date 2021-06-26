// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import ReactDOM from 'react-dom';
import init from './init.jsx';

import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
const startApp = async () => {
  const element = document.querySelector('#chat');
  const vdom = await init();
  ReactDOM.render(vdom, element);
};

startApp();
