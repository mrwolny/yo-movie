import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StyledInput from './StyledInput';

export default class Search extends Component {
  handleQueryChange = (event) => {
    const {
      updateQueryString,
      searchHandler,
    } = this.props;

    updateQueryString(event.target.value);
    searchHandler(event.target.value);
  }

  render() {
    const { queryString } = this.props;

    return (
      <>
        <StyledInput
          type="text"
          value={queryString}
          onChange={this.handleQueryChange}
          placeholder="Yo! Movie?"
        />
      </>
    );
  }
}

Search.propTypes = {
  queryString: PropTypes.string.isRequired,
  updateQueryString: PropTypes.func.isRequired,
  searchHandler: PropTypes.func.isRequired,
};
