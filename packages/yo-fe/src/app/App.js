import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import GlobalStyle from './GlobalStyle';

class App extends Component {
  componentDidMount() {
    const { config: { tmdb: { configUrl } } } = this.props;

    axios.get(configUrl)
      .then((response) => {
        this.setState({
          data: response.data,
        });
      });
  }

  render() {
    const { data } = this.state;

    return (
      <>
        <GlobalStyle />
        <div className="App">
          <h1>YO!</h1>
          <Catalogue />
          <img alt="yo murray" src="https://www.fillmurray.com/600/1000" />
        </div>
      </>
    );
  }
}

App.propTypes = {
  config: PropTypes.object,
};

export default App;
