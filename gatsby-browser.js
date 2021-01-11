import React from 'react';

import App from './src/components/App';

require('katex/dist/katex.min.css');

export const wrapRootElement = ({ element }) => {
  return <App>{element}</App>;
};
