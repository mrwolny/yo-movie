import React from 'react';
import Movie from './Movie';

import ConfigContext from '../../../../context/ConfigContext';
import tmdbConfig from '../../../../utils/tmdbConfig';

export default props => (
  <ConfigContext.Consumer>
    {context => <Movie tmdbConfig={tmdbConfig(context.config)} {...props} />}
  </ConfigContext.Consumer>
);
