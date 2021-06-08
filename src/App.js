import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProductList from './pages/ProductList';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import './App.css';

const App = () => (
  <>
    <TopBar />
    <Switch>
      <Route exact path="/" component={ProductList} />
    </Switch>
    <Footer />
  </>
);

export default App;
