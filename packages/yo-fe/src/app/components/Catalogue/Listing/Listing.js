import React from 'react';
import PropTypes from 'prop-types';

import Movie from './Movie';
import IntersectionTrigger from '../../shared/IntersectionTrigger';

import StyledListing from './StyledListing';

const Listing = ({ fetching, results, loadMoreHandler }) => (
  <StyledListing>
    { results && results.map(movie => <Movie title={movie.title} poster={movie.poster_path} key={`${movie.title}-${movie.poster_path}`} />) }
    { fetching && <h2>Loading...</h2> }
    <IntersectionTrigger handler={loadMoreHandler} />
  </StyledListing>
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
