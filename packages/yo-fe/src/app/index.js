import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const config = window.__PRELOADED_CONFIG__;

delete window.__PRELOADED_CONFIG__;

ReactDOM.hydrate(<App config={config} />, document.getElementById('root'));
