import '@babel/polyfill';

import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';

import axios from 'axios';

import App from './src/app/App';

const app = express();

app.use(express.static('./dist', {
  index: false,
  maxAge: 360000,
  etag: false,
}));

app.get('*', (req, res) => {
  axios.get(process.env.TMDB_CONFIG_URL)
    .then(response => ({
      tmdb: {
        apiKey: process.env.API_KEY,
        apiUrl: process.env.API_BASE_URL,
        configUrl: process.env.TMDB_CONFIG_URL,
        config: response.data.config,
      },
    })).then((config) => {
      const indexFile = path.resolve('./dist/index.html');
      fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
          return res.status(500).send('Oops, better luck next time!');
        }

        const sheet = new ServerStyleSheet();

        const results = data
          .replace('__APP__', `${ReactDOMServer.renderToString(sheet.collectStyles(<App config={config} />))}`)
          .replace('__CONFIG__', `${JSON.stringify(config).replace(/</g, '\\u003c')}`)
          .replace(
            '__LIVE_RELOAD__',
            `${process.env.NODE_ENV === 'development' ? '<script src="http://localhost:35729/livereload.js"></script>' : ''}`
          );

        res.set('Cache-Control', 'public, max-age=60');
        return res.send(results);
      });
    });
});

export default app;
