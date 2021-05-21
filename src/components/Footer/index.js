import './styles.css';

function Footer() {
  return (
    <footer className="Footer">
      <span>
        © 2021{' '}
        <a
          href="https://academy.tokopedia.com/events/dev-camp"
          target="_blank"
          rel="noopener noreferrer"
          className="Footer-link"
        >
          Tokopedia DevCamp
        </a>
        .
      </span>
      <br />
      <span>All Right Reserved</span>
    </footer>
  );
}

export default Footer;
