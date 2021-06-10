import React from 'react';
import App, { dispatch } from './App.jsx';
import socketWatcher from './socketWatcher.js';

const initApp = (socket) => {
  socketWatcher(socket, dispatch);
  return Promise.resolve(<App socket={socket} />);
};

export default initApp;
