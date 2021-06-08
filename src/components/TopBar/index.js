import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header-link">
        <img className="header-logo" src="/logo-devcamp-2021.png" alt="Tokopedia DevCamp 2021" />
      </Link>
    </header>
  );
}

export default Header;
