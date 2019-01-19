import React from 'react';

import ConfigContext from '../../context/ConfigContext';
import Catalogue from './Catalogue';

export default () => (
  <ConfigContext.Consumer>
    {context => <Catalogue config={context} />}
  </ConfigContext.Consumer>
);
