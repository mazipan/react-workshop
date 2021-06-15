import 'isomorphic-unfetch';
import App from './App';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
// Read the doc on https://github.com/staylor/react-helmet-async
import { HelmetProvider } from 'react-helmet-async';
import express from 'express';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { getDataFromTree } from '@apollo/client/react/ssr';

const razzleAssets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const preloadAssets = (assets, entrypoint) => {
  const css = assets[entrypoint]
    ? assets[entrypoint].css
      ? assets[entrypoint].css.map((asset) => `<link rel="preload" href=${asset} as="style" />`)
      : ''
    : '';

  const js = assets[entrypoint]
    ? assets[entrypoint].js
      ? assets[entrypoint].js.map((asset) => `<link rel="preload" href=${asset} as="script" />`)
      : ''
    : '';

  return `${css}${js}`;
};

const cssLinksFromAssets = (assets, entrypoint) => {
  return assets[entrypoint]
    ? assets[entrypoint].css
      ? assets[entrypoint].css.map((asset) => `<link rel="stylesheet" href="${asset}" />`)
      : ''
    : '';
};

const jsScriptTagsFromAssets = (assets, entrypoint) => {
  return assets[entrypoint]
    ? assets[entrypoint].js
      ? assets[entrypoint].js.map((asset) => <script src={`${asset}`} defer crossOrigin="true" />)
      : []
    : [];
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

    const helmetContext = {};
    const context = {};
    const markup = (
      <HelmetProvider context={helmetContext}>
        <ApolloProvider client={apolloClient}>
          <StaticRouter context={context} location={req.url}>
            <App />
          </StaticRouter>
        </ApolloProvider>
      </HelmetProvider>
    );

    if (context.url) {
      res.redirect(context.url);
    } else {
      getDataFromTree(markup).then((content) => {
        const initialState = apolloClient.extract();

				const { helmet } = helmetContext;

        const appBody = renderToString(
          <body>
            <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.__APOLLO_STATE__=${JSON.stringify(initialState).replace(/</g, '\\u003c')};`,
              }}
            />
            {jsScriptTagsFromAssets(razzleAssets, 'client')}
          </body>,
        );

        const html = `
						<html lang="en" ${helmet.htmlAttributes.toString()}>
            <head>
              <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta charSet="utf-8" />

							${helmet.title.toString()}
							${helmet.meta.toString()}
							${helmet.link.toString()}

              ${preloadAssets(razzleAssets, 'client')}
              ${cssLinksFromAssets(razzleAssets, 'client')}
            </head>
            ${appBody}
          </html>
				`;

        res.status(200).header('Content-Type', 'text/html').send(`<!doctype html>\n${html}`);
      });
    }
  });

export default server;
