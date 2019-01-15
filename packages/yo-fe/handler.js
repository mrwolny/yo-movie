import awsServerlessExpress from 'aws-serverless-express';

import app from './server';


// probably don't need all of those, but...
const binaryMimeTypes = [
  'application/octet-stream',
  'font/eot',
  'font/opentype',
  'font/otf',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
];

const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes);


exports.handler = (event, context) => { awsServerlessExpress.proxy(server, event, context); };
