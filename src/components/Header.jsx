import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import AuthTokenContext from '../context/AuthTokenContext.jsx';
import AuthUsernameContext from '../context/AuthUsernameContext.jsx';
import socket from '../socket';

const Header = () => {
  const { t } = useTranslation();
  const { authToken, setAuthToken } = useContext(AuthTokenContext);
  const { setAuthUsername } = useContext(AuthUsernameContext);
  const exitClickHandler = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    setAuthUsername(null);
    setAuthToken(null);
    socket.removeAllListeners();
    socket.disconnect();
  };
  return (
    <Navbar expand="lg" bg="white" className="shadow-sm">
      <Container>
        <Link className="navbar-brand" to="/">{t('ui.header.title')}</Link>
        {authToken && <button onClick={exitClickHandler} type="button" className="btn btn-primary">{t('ui.header.logout')}</button>}
      </Container>
    </Navbar>
  );
};

export default Header;
