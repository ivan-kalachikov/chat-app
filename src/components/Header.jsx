import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import AuthContext from './AuthContext.jsx';
import socket from '../socket';

const Header = () => {
  const { t } = useTranslation();
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
            <Link className="navbar-brand" to="/">{t('ui.header.title')}</Link>
            {authData.auth.authToken && <button onClick={exitClickHandler} type="button" className="btn btn-primary">{t('ui.header.logout')}</button>}
          </Container>
        </Navbar>
      )}
    </AuthContext.Consumer>
  );
};

export default Header;
