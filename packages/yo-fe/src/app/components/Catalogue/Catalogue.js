import React, { Component } from 'react';
import axios from 'axios';

import styled from 'styled-components';


const Elo = styled.h1`
  border: 2px solid tomato;
  padding: 20px;
`;

export default class Catalogue extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Elo>ELO!£!!</Elo>
        <h1>Skrrrt</h1>
        <h2>Catalogue! Yo!</h2>
      </div>
    );
  }
}
