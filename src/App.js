import { Route, Switch } from 'react-router-dom';
import ProductList from './pages/ProductList';
import Layout from './components/Layout';

import './App.css';

const App = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={ProductList} />
    </Switch>
  </Layout>
);

export default App;
