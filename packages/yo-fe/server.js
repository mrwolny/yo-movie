import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
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
        config: response.data,
      },
    })).then((config) => {
      const indexFile = path.resolve('./dist/index.html');
      fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
          return res.status(500).send('Oops, better luck next time!');
        }

        const results = data
          .replace('__APP__', `${ReactDOMServer.renderToString(<App config={config} />)}`)
          .replace('__CONFIG__', `${JSON.stringify(config).replace(/</g, '\\u003c')}`);

        res.set('Cache-Control', 'public, max-age=60');
        return res.send(results);
      });
    });
});

export default app;
