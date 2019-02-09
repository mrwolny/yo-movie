const axios = require('axios');
const _get = require('lodash.get');

module.exports = async (dynamoDb, logger = console) => {
  let dynamoData;

  try {
    dynamoData = await dynamoDb.getItem({
      TableName: process.env.DDB_TABLE_NAME,
      Key: {
        Key: { S: 'tmdb' },
      },
      ProjectionExpression: 'Config, TimeToLive',
    }).promise();
  } catch (e) {
    logger.error('Cannot get DynamoDB data', e);
  }

  const config = _get(dynamoData, ['Item', 'Config', 'S']);
  const ttl = _get(dynamoData, ['Item', 'TimeToLive', 'S']);

  if (!config || ttl < (Date.now() / 1000)) {
    let data;

    try {
      const response = await axios.get(`${process.env.API_BASE_URL}/configuration?api_key=${process.env.API_KEY}`);

      // eslint-disable-next-line prefer-destructuring
      data = response.data;
    } catch (e) {
      logger.error(e);

      if (config) {
        return JSON.parse(config);
      }
    }
    // todo empty response?

    const params = {
      TableName: process.env.DDB_TABLE_NAME,
      Item: {
        Key: {
          S: 'tmdb',
        },
        Config: {
          S: JSON.stringify(data),
        },
        TimeToLive: {
          S: `${Math.floor((Date.now() / 1000)) + parseInt(process.env.CONFIG_TTL, 10)}`,
        },
      },
    };

    try {
      await dynamoDb.putItem(params).promise();
    } catch (e) {
      logger.error(e);
    }

    return data;
  }

  return JSON.parse(config);
};
