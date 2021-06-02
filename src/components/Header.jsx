import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import AuthContext from './AuthContext.jsx';
import socket from '../socket';

const Header = () => {
  const { setAuth } = useContext(AuthContext);
  const exitClickHandler = () => {
    localStorage.removeItem('authToken');
    setAuth({ authToken: null, username: null });
    socket.removeAllListeners();
    socket.disconnect();
  };
  return (
    <AuthContext.Consumer>
      {(authData) => (
        <Navbar expand="lg" bg="white" className="shadow-sm">
          <Container>
            <Link className="navbar-brand" to="/">Hexlet Chat</Link>
            {authData.auth.authToken && <button onClick={exitClickHandler} type="button" className="btn btn-primary">Выйти</button>}
          </Container>
        </Navbar>
      )}
    </AuthContext.Consumer>
  );
};

export default Header;
