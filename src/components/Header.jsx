import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <nav className="mb-3 navbar navbar-expand-lg navbar-light bg-light">
    <Link className="mr-auto navbar-brand" to="/">Hexlet Chat</Link>
  </nav>
);

export default Header;
