import App from './App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { hydrate } from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { loadableReady } from '@loadable/component';

import { HelmetProvider } from 'react-helmet-async';

const client = new ApolloClient({
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
  uri: 'https://asia-southeast2-minitokopedia.cloudfunctions.net/graphql',
});

loadableReady().then(() => {
  hydrate(
    <HelmetProvider>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </HelmetProvider>,
    document.getElementById('root'),
  );
});

if (module.hot) {
  module.hot.accept();
}
