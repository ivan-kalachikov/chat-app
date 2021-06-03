import React, { useState } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import i18n from './i18n';

import Page404 from './components/Page404.jsx';
import Header from './components/Header.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Chat from './components/Chat.jsx';
import Modals from './components/modals/Modals.jsx';
import AuthContext from './components/AuthContext.jsx';

import channelsReducer from './slices/channelsSlice';
import messagesReducer from './slices/messagesSlice';
import modalReducer from './slices/modalSlice';

const reducer = {
  channelsInfo: channelsReducer,
  messagesInfo: messagesReducer,
  modal: modalReducer,
};

const store = configureStore({
  reducer,
});

const App = () => {
  const authToken = localStorage.getItem('authToken');
  const username = localStorage.getItem('username');
  const [auth, setAuth] = useState({
    authToken,
    username,
  });

  return (
    <Provider store={store}>
      <div className="d-flex flex-column h-100">
        <AuthContext.Provider value={{ auth, setAuth }}>
          <Router>
            <Header />
            <Switch>
              <Route exact path="/">
                { authToken ? <Chat /> : <Redirect to="/login" /> }
              </Route>
              <Route exact path="/login">
                {authToken ? <Redirect to="/" /> : <Login />}
              </Route>
              <Route exact path="/signup">
                {authToken ? <Redirect to="/" /> : <Signup />}
              </Route>
              <Route path="*">
                <Page404 />
              </Route>
            </Switch>
            <Modals />
          </Router>
        </AuthContext.Provider>
      </div>
    </Provider>
  );
};

export default App;
