import TopBar from '../TopBar';
import Footer from '../Footer';
import { node } from 'prop-types';
import './styles.css';

const Layout = (props) => {
  const { children } = props;

  return (
    <main className="layout">
      <TopBar />
      {children}
      <Footer />
    </main>
  );
};

Layout.propTypes = {
  children: node.isRequired,
};

export default Layout;
