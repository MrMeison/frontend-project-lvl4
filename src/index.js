import { render } from 'react-dom';
import { io } from 'socket.io-client';
import Rollbar from 'rollbar';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import 'bootstrap';
import init from './init.jsx';

const run = async () => {
  if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
    const rollbar = new Rollbar({
      accessToken: process.env.ROLLBAR_TOKEN,
      captureUncaught: true,
      captureUnhandledRejections: true,
    });

    rollbar.log('Hello world!');
  }

  const socket = io();

  render(await init(socket), document.querySelector('#chat'));
};

run();
