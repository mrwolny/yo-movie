import React from 'react';
import PropTypes from 'prop-types';

import Movie from './Movie';
import IntersectionTrigger from '../../shared/IntersectionTrigger';

const Listing = ({ fetching, results, loadMoreHandler }) => (
  <div>
    { results && results.map(movie => <Movie title={movie.title} poster={movie.poster_path} />) }
    { fetching && <h2>Loading...</h2> }
    <IntersectionTrigger handler={loadMoreHandler} />
  </div>
);

Listing.propTypes = {
  fetching: PropTypes.bool.isRequired,
  results: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
  })),
  loadMoreHandler: PropTypes.func.isRequired,
};

Listing.defaultProps = {
  results: [],
};

export default Listing;
