import React, { Component} from "react";

import "./App.css";

class App extends Component{
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    fetch('tmdb/config')
      .then((data) => {
        console.log('data', data);

        this.setState({
          data
        });
      })
  }

  render(){
    return(
      <div className="App">
        <h1>YO!</h1>

        <img src="https://www.fillmurray.com/600/1000" />
        <img src="https://www.fillmurray.com/600/1000" />
      </div>
    );
  }
}

export default App;
