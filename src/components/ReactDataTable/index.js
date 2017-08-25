// @flow
import React from 'react';
import { Provider } from 'react-redux';
import ReactDataTableContainer from './ReactDataTableContainer';

import configureStore from './configureStore';

class ReactDataTable extends React.PureComponent {
  constructor() {
    super();
    this.store = configureStore();
  }

  props: {
    config: {
      maxHeight: number,
      rowStyle: string,
      minSize: string,
      headers: Array<string>,
      data: Array<Array<string>>,
    },
  };

  render() {
    // Each instance of ReactDataTable will have its own store
    return (
      <Provider store={this.store}>
        <ReactDataTableContainer config={this.props.config} />
      </Provider>
    );
  }
}

export { ReactDataTable };
