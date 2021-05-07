import React, { useState } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Page404 from './components/Page404.jsx';
import Header from './components/Header.jsx';
import Login from './components/Login.jsx';
import Chat from './components/Chat.jsx';
import AuthContext from './components/AuthContext.jsx';
import reducer from './slices/chatDataSlice';

const store = configureStore({
  reducer,
});

const App = () => {
  const authToken = localStorage.getItem('authToken');
  const userName = localStorage.getItem('userName');
  const [auth, setAuth] = useState({
    authToken,
    userName,
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
              <Route path="/login">
                {authToken ? <Redirect to="/" /> : <Login />}
              </Route>
              <Route path="*">
                <Page404 />
              </Route>
            </Switch>
          </Router>
        </AuthContext.Provider>
      </div>
    </Provider>
  );
};

export default App;
