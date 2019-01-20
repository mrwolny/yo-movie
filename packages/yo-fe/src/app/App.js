import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ConfigContext from './context/ConfigContext';
import Catalogue from './components/Catalogue';

import GlobalStyle from './GlobalStyle';

class App extends Component {
  componentDidMount() {
    console.log('yo movie!');
  }

  render() {
    const { config: { tmdb } } = this.props;

    return (
      <div className="App">
        <GlobalStyle />
        <ConfigContext.Provider value={tmdb}>
          <Catalogue />
        </ConfigContext.Provider>
      </div>
    );
  }
}

App.propTypes = {
  config: PropTypes.shape({
    tmdb: PropTypes.shape({
      apiKey: PropTypes.string,
      apiUrl: PropTypes.string,
      config: PropTypes.shape({
        images: PropTypes.object,
      }),
    }),
  }).isRequired,
};

export default App;
