import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Page404 from './components/Page404.jsx';
import Header from './components/Header.jsx';
import Login from './components/Login.jsx';

const App = () => (
  <div className="d-flex flex-column h-100">
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <h1>Home</h1>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="*">
          <Page404 />
        </Route>
      </Switch>
    </Router>
  </div>
);

export default App;
