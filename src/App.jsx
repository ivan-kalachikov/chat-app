import React, { useState } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import Page404 from './components/Page404.jsx';
import Header from './components/Header.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Chat from './components/Chat.jsx';
import Modals from './components/modals/index.jsx';
import {
  AuthContext, UsernameContext, SocketInstanceContext, getAuth, logIn, logOut,
} from './context';

const App = ({ socket }) => {
  const Auth = getAuth();
  const [username, setUsername] = useState(Auth.username);
  const [isAuth, setIsAuth] = useState(!!Auth.token);

  const AppProviders = ({ children }) => (
    <AuthContext.Provider value={{
      isAuth, setIsAuth, logIn, logOut,
    }}
    >
      <UsernameContext.Provider value={{ username, setUsername }}>
        <SocketInstanceContext.Provider value={socket}>
          {children}
        </SocketInstanceContext.Provider>
      </UsernameContext.Provider>
    </AuthContext.Provider>
  );

  return (
    <AppProviders>
      <div className="d-flex flex-column h-100">
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              { isAuth ? <Chat /> : <Redirect to="/login" /> }
            </Route>
            <Route exact path="/login">
              {isAuth ? <Redirect to="/" /> : <Login />}
            </Route>
            <Route exact path="/signup">
              {isAuth ? <Redirect to="/" /> : <Signup />}
            </Route>
            <Route path="*">
              <Page404 />
            </Route>
          </Switch>
          <Modals />
        </Router>
      </div>
    </AppProviders>
  );
};

export default App;
