import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';

import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';

import './App.css';

const App = () => (
  <ErrorBoundary>
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/product/:id"
          render={({ match }) => <ProductDetail match={match} />}
        />
      </Switch>
    </Layout>
  </ErrorBoundary>
);

export default App;
