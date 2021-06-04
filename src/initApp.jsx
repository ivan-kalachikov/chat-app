import React from 'react';
import App from './App.jsx';

const initApp = (socket) => Promise.resolve(<App socket={socket} />);

export default initApp;
