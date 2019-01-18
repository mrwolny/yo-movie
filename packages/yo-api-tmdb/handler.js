const AWS = require('aws-sdk');

const configuration = require('./lib/configuration');

const dynamoDb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

module.exports.config = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  };

  const config = await configuration(dynamoDb);

  return {
    headers,
    statusCode: 200,
    body: JSON.stringify({
      config,
    }),
  };
};
