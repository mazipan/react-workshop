import 'isomorphic-unfetch';
import App from './App';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import express from 'express';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { getDataFromTree } from '@apollo/client/react/ssr';

const razzleAssets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const cssLinksFromAssets = (assets, entrypoint) => {
  return assets[entrypoint]
    ? assets[entrypoint].css
      ? assets[entrypoint].css.map((asset) => <link rel="stylesheet" href={asset} />)
      : ''
    : '';
};

const jsScriptTagsFromAssets = (assets, entrypoint) => {
  return assets[entrypoint]
    ? assets[entrypoint].js
      ? assets[entrypoint].js.map((asset) => <script src={`${asset}`} defer crossOrigin />)
      : ''
    : '';
};

const server = express();

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const apolloClient = new ApolloClient({
      ssrMode: true,
      cache: new InMemoryCache(),
      link: createHttpLink({
        uri: 'https://asia-southeast2-minitokopedia.cloudfunctions.net/graphql',
      }),
    });

    const context = {};
    const markup = (
      <ApolloProvider client={apolloClient}>
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
      </ApolloProvider>
    );

    if (context.url) {
      res.redirect(context.url);
    } else {
      getDataFromTree(markup).then((content) => {
        const initialState = apolloClient.extract();

        const html = renderToString(
          <html lang="en">
            <head>
              <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
              <meta charset="utf-8" />
              <title>Welcome to Razzle</title>
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              {cssLinksFromAssets(razzleAssets, 'client')}
            </head>
            <body>
              <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
              <script
                dangerouslySetInnerHTML={{
                  __html: `window.__APOLLO_STATE__=${JSON.stringify(initialState).replace(/</g, '\\u003c')};`,
                }}
              />
              {jsScriptTagsFromAssets(razzleAssets, 'client')}
            </body>
          </html>,
        );

        res.status(200).header('Content-Type', 'text/html').send(`<!doctype html>\n${html}`);
      });
    }
  });

export default server;
