import React from 'react';
import App from './App.jsx';

const initApp = (socketClient) => Promise.resolve(<App socketClient={socketClient} />);

export default initApp;
