import { Link } from 'react-router-dom';
import './styles.css';

function Header() {
  return (
    <header className="Header">
      <Link to="/" className="Header-link">
        <img
          className="Header-logo"
          src="/logo-devcamp-2021.png"
          alt="Tokopedia DevCamp 2021"
        />
      </Link>
    </header>
  );
}

export default Header;
