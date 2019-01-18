import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };
  }

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
      <div className="App">
        <h1>YO!</h1>
        <img alt="yo murray" src="https://www.fillmurray.com/600/1000" />
      </div>
    );
  }
}

App.propTypes = {
  config: PropTypes.object,
};

export default App;
