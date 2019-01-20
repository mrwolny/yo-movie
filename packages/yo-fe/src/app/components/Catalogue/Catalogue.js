import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _debounce from 'lodash/debounce';

import Search from './Search';
import Listing from './Listing';
import tmdbClient from '../../utils/tmdbClient';

export default class Catalogue extends Component {
  constructor(props) {
    super(props);

    const { config: { apiKey, apiUrl } } = this.props;

    this.tmdbClient = tmdbClient(apiUrl, apiKey);
    this.searchMoviesDebounced = _debounce(this.searchMovies.bind(this), 500);

    this.state = {
      fetching: false,
      queryString: '',
      movies: null,
      searchPagesLoaded: 0,
      searchPagesTotal: 0,
    };
  }

  componentDidMount() {
    // todo query string handling
  }

  updateQueryString = (queryString) => {
    this.setState({
      queryString,
    });
  }

  searchMovies = async (queryString) => {
    if (queryString) {
      this.setState({
        fetching: true,
      });

      const {
        results: movies,
        total_pages: searchPagesTotal,
        page: searchPagesLoaded,
      } = await this.tmdbClient.searchMovies({ query: queryString });

      this.setState({
        movies,
        searchPagesLoaded,
        searchPagesTotal,
        fetching: false,
      });
    } else {
      this.setState({
        movies: null,
        searchPagesLoaded: 0,
        searchPagesTotal: 0,
      });
    }
  }

  loadNextPage = async () => {
    const {
      queryString,
      searchPagesLoaded,
      searchPagesTotal,
    } = this.state;

    if (queryString && searchPagesLoaded < searchPagesTotal) {
      const {
        results: movies,
        page: newSearchPagesLoaded,
      } = await this.tmdbClient.searchMovies({ query: queryString, page: searchPagesLoaded + 1 });

      this.setState(prevState => ({
        movies: [...prevState.movies, ...movies],
        searchPagesLoaded: newSearchPagesLoaded,
      }));
    }
  }

  render() {
    const {
      fetching,
      queryString,
      movies: results,
    } = this.state;

    return (
      <div>
        <Search
          queryString={queryString}
          updateQueryString={this.updateQueryString}
          searchHandler={this.searchMoviesDebounced}
        />
        <Listing
          fetching={fetching}
          results={results}
          loadMoreHandler={this.loadNextPage}
        />
      </div>
    );
  }
}

Catalogue.propTypes = {
  config: PropTypes.shape({
    apiKey: PropTypes.string.isRequired,
    apiUrl: PropTypes.string.isRequired,
  }).isRequired,
};
