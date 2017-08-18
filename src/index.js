// @flow
import React from 'react';
import { render } from 'react-dom';

// app imports
import { ReactDataTable } from 'components/ReactDataTable';
import { config1, config2 } from './config';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

const App = () =>
  (<div style={styles}>
    <ReactDataTable config={config1} />
    <ReactDataTable config={config2} />
  </div>);

function renderWrapper() {
  render(<App />, document.getElementById('root'));
}

// call render function
renderWrapper();

if (module.hot) {
  module.hot.accept('./components/ReactDataTable/index.js', () => {
    renderWrapper();
  });
}
