import axios from 'axios';

const tmdbClient = (apiUrl, apiKey) => {
  const getMovieSearchUrl = ({ query, page = 1, language = 'en-US' } = {}) => {
    const parameterString = `api_key=${apiKey}&query=${query}&page=${page}&language=${language}`;

    return `${apiUrl}/search/movie?${encodeURI(parameterString)}`;
  };

  return {
    searchMovie: async ({ query, page, language }) => {
      const results = await axios(
        getMovieSearchUrl({ query, page, language }),
        {
          method: 'GET',
          mode: 'cors',
        }
      );

      const { data } = results;

      return data;
    },
  };
};

export default tmdbClient;
