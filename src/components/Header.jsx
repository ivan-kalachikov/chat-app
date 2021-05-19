import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from './AuthContext.jsx';

const Header = () => {
  const { setAuth } = useContext(AuthContext);
  const exitClickHandler = () => {
    localStorage.removeItem('authToken');
    setAuth({ authToken: null, username: null });
  };
  return (
    <AuthContext.Consumer>
      {(authData) => (
        <nav className="mb-3 navbar navbar-expand-lg navbar-light bg-light">
          <Link className="mr-auto navbar-brand" to="/">Hexlet Chat</Link>
          {authData.auth.authToken && <button onClick={exitClickHandler} type="button" className="btn btn-primary">Выйти</button>}
        </nav>
      )}
    </AuthContext.Consumer>
  );
};

export default Header;
