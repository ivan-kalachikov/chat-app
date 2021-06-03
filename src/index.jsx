// @ts-check

import Rollbar from 'rollbar';
import init from './init.jsx';

import '../assets/application.scss';

// eslint-disable-next-line no-unused-vars
const rollbar = new Rollbar({
  accessToken: '58f78fa326fd4754afcd5e6e7186e9c7',
  captureUncaught: true,
  captureUnhandledRejections: true,
});

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

init();
