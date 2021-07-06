import 'isomorphic-unfetch';
import path from 'path';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
// Read the doc on https://github.com/staylor/react-helmet-async
import { HelmetProvider } from 'react-helmet-async';
import express from 'express';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { getDataFromTree } from '@apollo/client/react/ssr';

import App from '../App';

import ampPDP from './ampPDP';

const server = express();

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/amp/:id/:slug', ampPDP)
  .get('/*', (req, res) => {
    const extractor = new ChunkExtractor({
      statsFile: path.resolve('build/loadable-stats.json'),
      // razzle client bundle entrypoint is client.js
      entrypoints: ['client'],
    });

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
      <ChunkExtractorManager extractor={extractor}>
        <HelmetProvider context={helmetContext}>
          <ApolloProvider client={apolloClient}>
            <StaticRouter context={context} location={req.url}>
              <App />
            </StaticRouter>
          </ApolloProvider>
        </HelmetProvider>
      </ChunkExtractorManager>
    );

    // ${preloadAssets(razzleAssets, 'client')}
    // ${cssLinksFromAssets(razzleAssets, 'client')}

    if (context.url) {
      res.redirect(context.url);
    } else {
      getDataFromTree(markup).then((content) => {
        const initialState = apolloClient.extract();

        const { helmet } = helmetContext;

        const appBody = renderToString(<div id="root" dangerouslySetInnerHTML={{ __html: content }} />);

        const scriptTags = extractor.getScriptTags();
        // collect "preload/prefetch" links
        const linkTags = extractor.getLinkTags();
        // collect style tags
        const styleTags = extractor.getStyleTags();

        const html = `
						<html lang="en" ${helmet.htmlAttributes.toString()}>
            <head>
              <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta charSet="utf-8" />

							<link rel="preconnect" href="https://images.tokopedia.net" />
							<link rel="dns-prefetch" href="https://images.tokopedia.net" />

							${helmet.title.toString()}
							${helmet.meta.toString()}
							${helmet.link.toString()}
							${helmet.link.toString()}

							${linkTags}
							${styleTags}
					 	</head>
						<body>
							${appBody}
							${scriptTags}
							<script>window.__APOLLO_STATE__=${JSON.stringify(initialState).replace(/</g, '\\u003c')};</script>
						</body>
					</html>
				`;

        res.status(200).header('Content-Type', 'text/html').send(`<!doctype html>\n${html}`);
      });
    }
  });

export default server;
