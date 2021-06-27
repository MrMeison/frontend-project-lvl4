import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';
import init from './init.jsx';

import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
const startApp = async () => {
  const element = document.querySelector('#chat');
  const vdom = await init(io());
  ReactDOM.render(vdom, element);
};

startApp();
