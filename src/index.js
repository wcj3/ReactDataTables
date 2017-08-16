// @flow
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// app imports
import ReactDataTableContainer from 'components/ReactDataTable/ReactDataTableContainer';
import { config1, config2 } from './config';

import configureStore from './configureStore';

const store = configureStore();

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

const App = () =>
  (<div style={styles}>
    <ReactDataTableContainer config={config1} />
    <ReactDataTableContainer config={config2} />
  </div>);

function renderWrapper() {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );
}

// call render function
renderWrapper();

if (module.hot) {
  module.hot.accept('./components/ReactDataTable/index.js', () => {
    renderWrapper();
  });
}
