import React from 'react';
import PropTypes from 'prop-types';

import getTmdbImageLink from '../../../../utils/getTmdbImageLink';

const Movie = ({ title, poster, tmdbConfig }) => (
  <section>
    <h2>{title}</h2>
    <img
      src={getTmdbImageLink({
        image: poster,
        baseUrl: tmdbConfig.getImageBaseUrl(),
        width: tmdbConfig.isValidPosterSize('w342') ? 'w342' : 'original',
      })}
      alt="poster"
    />
  </section>
);

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  tmdbConfig: PropTypes.shape({
    isValidPosterSize: PropTypes.func.isRequired,
    getImageBaseUrl: PropTypes.func.isRequired,
  }).isRequired,
};

export default Movie;
