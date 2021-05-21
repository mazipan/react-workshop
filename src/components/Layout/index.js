import Header from '../Header';
import Footer from '../Footer';

import './styles.css';

function Layout({ children }) {
  return (
    <div className="Layout">
      <Header />
      <main className="Layout-main">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
