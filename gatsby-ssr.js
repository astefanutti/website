import React from 'react';
import Terser from 'terser';

import App from './src/components/App';

export const wrapPageElement = ({ element }) => {
  return <App>{element}</App>;
};

function postBodyScript() {
  const isDarkMode = document.body.classList.contains('dark-mode');
  document.getElementById('dark-mode-toggle').checked = isDarkMode;
  document.getElementById('dark-mode-label').style.display = 'initial';
}

const PostBodyScript = () => {
  const boundFn = String(postBodyScript);
  let calledFunction = `(${boundFn})()`;
  calledFunction = Terser.minify(calledFunction).code;
  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: calledFunction }} />;
};

export function onRenderBody({ setPostBodyComponents }) {
  setPostBodyComponents(<PostBodyScript />);
}
