import React from 'react';
import App, { dispatch } from './App.jsx';
import socketWatcher from './socketWatcher.js';
import initI18n from './i18n';

const initApp = async (socket) => {
  await initI18n();
  socketWatcher(socket, dispatch);
  return <App socket={socket} />;
};

export default initApp;
