import axios from 'axios';
import tmdbClient from './tmdbClient';

jest.mock('axios');

describe.only('yo-fe/src/app/utils/tmdbClient', () => {
  beforeEach(() => {
    axios.mockResolvedValue({ data: { yo: true, title: 'Yo! Pulp Fiction!' } });
  });

  it('should be function', () => {
    expect(tmdbClient).toBeInstanceOf(Function);
  });

  it('should return object with searchMovie function', () => {
    const client = tmdbClient();

    expect(client.searchMovie).toBeInstanceOf(Function);
  });

  describe('searchMovie', () => {
    const apiUrl = '__API_URL__';
    const apiKey = '__API_KEY__';

    let client;

    beforeEach(() => {
      client = tmdbClient(apiUrl, apiKey);
    });

    it('should send single GET request', async () => {
      await client.searchMovie({});

      expect(axios).toHaveBeenCalledTimes(1);
    });

    it('should call API with URL provided as apiUrl', async () => {
      await client.searchMovie({ query: 'query' });

      expect(axios.mock.calls[0][0].startsWith('__API_URL__')).toBe(true);
    });

    it('should call correct API endpoint', async () => {
      await client.searchMovie({ query: 'query' });

      expect(axios.mock.calls[0][0]).toMatch(/\/search\/movie/);
    });

    it('should pass provided parameters as an argument into parameterString', async () => {
      await client.searchMovie({ query: 'django', page: 23, language: 'pl-PL' });

      expect(axios.mock.calls[0][0]).toMatch(/api_key=__API_KEY__&query=django&page=23&language=pl-PL/);
    });

    it('should pass default into parameterString if no user value provided', async () => {
      await client.searchMovie({ query: 'idiots' });

      expect(axios.mock.calls[0][0]).toMatch(/api_key=__API_KEY__&query=idiots&page=1&language=en-US/);
    });

    it('should call API with query string URI encoded', async () => {
      await client.searchMovie({ query: 'mean streets' });

      expect(axios.mock.calls[0][0]).toMatch(/query=mean%20streets/);
    });

    it('should return data from the API response', async () => {
      await client.searchMovie({ query: 'mean streets' });

      expect(await client.searchMovie({ query: 'mean streets' }))
        .toEqual({ yo: true, title: 'Yo! Pulp Fiction!' });
    });
  });
});
