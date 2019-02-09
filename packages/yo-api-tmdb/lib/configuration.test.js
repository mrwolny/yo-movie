const mockAxiosGet = jest.fn();
jest.mock('axios', () => ({
  get: mockAxiosGet,
}));

const mockDynamoDbGetItem = jest.fn();
const mockDynamoDbPutItem = jest.fn();

const configuration = require('./configuration');

describe('yo-api-tmdb/lib/tmdbConfig', () => {
  let mockDynamoDbSdk;
  let originalDate;

  beforeEach(() => {
    originalDate = Date;
    global.Date = jest.fn();
    global.Date.now = jest.fn(() => 1000000000000);

    mockDynamoDbSdk = {
      getItem: jest.fn(() => ({ promise: mockDynamoDbGetItem })),
      putItem: jest.fn(() => ({ promise: mockDynamoDbPutItem })),
    };

    process.env.CONFIG_TTL = 120;
    process.env.API_BASE_URL = '__BASE_URL__';
    process.env.API_KEY = '__API_KEY__';
    process.env.DDB_TABLE_NAME = '__DYNAMO_TABLE__';
  });

  afterEach(() => {
    global.Date = originalDate;

    delete process.env.CONFIG_TTL;
    delete process.env.API_BASE_URL;
    delete process.env.API_KEY;
  });

  it('should query DynamoDb for configuration', async () => {
    mockDynamoDbGetItem.mockResolvedValueOnce({
      Item: {
        Config: { S: JSON.stringify({ config: { yo: 'movie' } }) },
        TimeToLive: { S: 1000000000110 },
      },
    });

    await configuration(mockDynamoDbSdk);

    expect(mockDynamoDbSdk.getItem).toHaveBeenCalledWith({
      TableName: '__DYNAMO_TABLE__',
      Key: {
        Key: { S: 'tmdb' },
      },
      ProjectionExpression: 'Config, TimeToLive',
    });
  });

  describe('valid config found in DynamoDB', () => {
    beforeEach(() => {
      mockDynamoDbGetItem.mockResolvedValueOnce({
        Item: {
          Config: { S: JSON.stringify({ config: { yo: 'movie' } }) },
          TimeToLive: { S: 1000000000110 },
        },
      });
    });

    it('should return configuration from found Item value', async () => {
      expect(await configuration(mockDynamoDbSdk)).toEqual({ config: { yo: 'movie' } });
    });

    it('should not call API', async () => {
      await configuration(mockDynamoDbSdk);

      expect(mockAxiosGet).not.toHaveBeenCalled();
    });
  });

  [
    {
      name: 'no config found in DynamoDB',
      mockDynamoConfig: { Item: {} },
    },
    {
      name: 'expired config found in DynamoDB',
      mockDynamoConfig: {
        Item: {
          Config: { S: JSON.stringify({ config: { yo: 'movie' } }) },
          TimeToLive: { S: 9000009 },
        },
      },
    },
  ].forEach(({ name, mockDynamoConfig }) => describe(name, () => {
    beforeEach(() => {
      mockDynamoDbGetItem.mockResolvedValueOnce(mockDynamoConfig);

      mockAxiosGet.mockResolvedValueOnce({ data: { config: 'from API' } });
    });

    it('should call TMDb API once', async () => {
      await configuration(mockDynamoDbSdk);

      expect(mockAxiosGet).toHaveBeenCalledTimes(1);
    });

    it('should call correct TMDb API endpoint', async () => {
      await configuration(mockDynamoDbSdk);

      expect(mockAxiosGet).toHaveBeenCalledWith('__BASE_URL__/configuration?api_key=__API_KEY__');
    });

    it('should return config from the API', async () => {
      expect(await configuration(mockDynamoDbSdk)).toEqual({ config: 'from API' });
    });

    it('should add configuration from the API to the DynamoDB', async () => {
      await configuration(mockDynamoDbSdk);

      expect(mockDynamoDbPutItem).toHaveBeenCalledTimes(1);
      expect(mockDynamoDbSdk.putItem).toHaveBeenCalledWith({
        TableName: process.env.DDB_TABLE_NAME,
        Item: {
          Key: {
            S: 'tmdb',
          },
          Config: {
            S: JSON.stringify({ config: 'from API' }),
          },
          TimeToLive: {
            S: '1000000120',
          },
        },
      });
    });
  }));
});
