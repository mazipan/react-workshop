import React from 'react';
import './styles.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <span>
        &copy; {year}{' '}
        <a href="https://academy.tokopedia.com/events/dev-camp" className="footer-link">
          Tokopedia DevCmap
        </a>
      </span>
    </footer>
  );
};

export default Footer;
