import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuthToken, useAuthUsername } from '../context';

const Header = () => {
  const { t } = useTranslation();
  const { authToken, setAuthToken } = useAuthToken();
  const { setAuthUsername } = useAuthUsername();
  const exitClickHandler = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    setAuthUsername(null);
    setAuthToken(null);
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
