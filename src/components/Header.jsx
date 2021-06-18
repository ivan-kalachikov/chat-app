import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuth, useUsername } from '../context';

const Header = () => {
  const { t } = useTranslation();
  const { isAuth, setIsAuth, setAuth } = useAuth();
  const { setUsername } = useUsername();
  const exitClickHandler = () => {
    setAuth({ token: null, username: null });
    setUsername(null);
    setIsAuth(null);
  };
  return (
    <Navbar expand="lg" bg="white" className="shadow-sm">
      <Container>
        <Link className="navbar-brand" to="/">{t('ui.header.title')}</Link>
        {isAuth && <button onClick={exitClickHandler} type="button" className="btn btn-primary">{t('ui.header.logout')}</button>}
      </Container>
    </Navbar>
  );
};

export default Header;
