import _get from 'lodash/get';

export default (config) => {
  const getImageBaseUrl = () => _get(config, ['images', 'secure_base_url']);
  const getPosterSizes = () => _get(config, ['images', 'poster_sizes']);

  const isValidPosterSize = size => getPosterSizes().indexOf(size) !== -1;

  return {
    isValidPosterSize,
    getPosterSizes,
    getImageBaseUrl,
  };
};
