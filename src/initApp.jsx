import React from 'react';
import App, { dispatch } from './App.jsx';
import socketWatcher from './socketWatcher.js';
import initI18n from './i18n';

const initApp = (socket) => {
  initI18n();
  socketWatcher(socket, dispatch);
  return Promise.resolve(<App socket={socket} />);
};

export default initApp;
