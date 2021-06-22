import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './App.jsx';
import socketWatcher from './socketWatcher.js';
import initI18n from './i18n';
import rootReducer from './slices/index';

const initApp = async (socket) => {
  const store = configureStore({
    reducer: rootReducer,
  });
  await initI18n();
  socketWatcher(socket, store.dispatch);
  return (
    <Provider store={store}>
      <App socket={socket} />
    </Provider>
  );
};

export default initApp;
