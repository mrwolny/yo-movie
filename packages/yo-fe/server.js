import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';

import App from './src/app/App';

const app = express();

app.use(express.static('./dist', {
  index: false,
  maxAge: 360000,
  etag: false,
}));

app.get('*', (req, res) => {
  const indexFile = path.resolve('./dist/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    const results = data.replace('<div id="root"></div>', `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`);

    res.set('Cache-Control', 'public, max-age=60');
    return res.send(
      results,
    );
  });
});

export default app;
