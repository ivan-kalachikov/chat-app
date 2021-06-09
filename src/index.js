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
}
console.log(process.env.NODE_ENV);
console.log(process.env.ROLLBAR_ACCESS_TOKEN);
// eslint-disable-next-line no-unused-vars
const rollbar = new Rollbar({
  enabled: process.env.NODE_ENV === 'production',
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const init = async () => {
  const socket = io();
  const container = document.querySelector('#chat');
  ReactDOM.render(await initApp(socket), container);
};

init();
