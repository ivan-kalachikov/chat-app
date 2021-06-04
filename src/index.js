// @ts-check

import Rollbar from 'rollbar';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';
import initApp from './initApp.jsx';

import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
} else {
// eslint-disable-next-line no-unused-vars
  const rollbar = new Rollbar({
    accessToken: '58f78fa326fd4754afcd5e6e7186e9c7',
    captureUncaught: true,
    captureUnhandledRejections: true,
  });
}

const init = async () => {
  const socket = io({
    autoConnect: false,
  });
  const container = document.querySelector('#chat');
  ReactDOM.render(await initApp(socket), container);
};

init();
