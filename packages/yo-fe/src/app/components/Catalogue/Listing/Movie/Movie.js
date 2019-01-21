import React from 'react';
import PropTypes from 'prop-types';

import StyledMovie from './StyledMovie';
import getTmdbImageLink from '../../../../utils/getTmdbImageLink';

const Movie = ({ title, poster, tmdbConfig }) => (
  <StyledMovie.StyledMovieContainer>
    <h2>{title}</h2>
    <div className="img">
      <img
        src={getTmdbImageLink({
          image: poster,
          baseUrl: tmdbConfig.getImageBaseUrl(),
          width: tmdbConfig.isValidPosterSize('w342') ? 'w342' : 'original',
        })}
        className="elo"
        alt="poster"
        onError={(e) => { e.target.src = 'https://www.fillmurray.com/342/513'; }}
      />
    </div>
  </StyledMovie.StyledMovieContainer>
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
