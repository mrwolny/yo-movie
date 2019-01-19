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
      <>
        <GlobalStyle />
        <ConfigContext.Provider value={tmdb}>
          <div className="App">
            <h1>YO!</h1>
            <Catalogue />
            <img alt="yo murray" src="https://www.fillmurray.com/600/1000" />
          </div>
        </ConfigContext.Provider>
      </>
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
