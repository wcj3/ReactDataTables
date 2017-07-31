import React from 'react';
import { render } from 'react-dom';
import ReactDataTable from './ReactDataTable.jsx';
import {config1, config2} from './config';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

const App = () => (
  <div style={styles}>
    <ReactDataTable config={config1} />
    <ReactDataTable config={config2} />
  </div>
);

render(<App />, document.getElementById('root'));
