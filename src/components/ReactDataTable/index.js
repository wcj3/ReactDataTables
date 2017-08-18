import React from 'react';
import { Provider } from 'react-redux';
import ReactDataTableContainer from './ReactDataTableContainer';

import configureStore from './configureStore';

class ReactDataTable extends React.PureComponent {
  constructor() {
    super();
    this.store = configureStore();
  }

  render() {
    return (
      <Provider store={this.store}>
        <ReactDataTableContainer config={this.props.config} />
      </Provider>
    );
  }
}

export  {ReactDataTable};
