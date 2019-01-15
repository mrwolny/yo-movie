import React, { Component } from 'react';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    fetch('tmdb/config')
      .then((data) => {
        this.setState({
          data,
        });
      });
  }

  render() {
    const { data } = this.state;

    return (
      <div className="App">
        <h1>YO!</h1>

        <img alt="yo murray" src="https://www.fillmurray.com/600/1000" />
        <pre>{data}</pre>
      </div>
    );
  }
}

export default App;
