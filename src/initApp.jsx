import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import App from './App.jsx';
import socketWatcher from './socketWatcher.js';
import initI18n from './i18n';
import rootReducer from './slices/index';

const initApp = async (socket) => {
  const store = configureStore({
    reducer: rootReducer,
  });
  const i18n = await initI18n();
  socketWatcher(socket, store.dispatch);
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <App socket={socket} />
      </I18nextProvider>
    </Provider>
  );
};

export default initApp;
