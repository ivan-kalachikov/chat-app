import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

const init = () => {
  const container = document.querySelector('#chat');
  ReactDOM.render(<App />, container);
};

export default init;
