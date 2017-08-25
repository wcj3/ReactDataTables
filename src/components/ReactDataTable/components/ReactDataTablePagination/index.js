// @flow
import React from 'react';

import styles from './styles.css';

class ReactDataTablePagination extends React.PureComponent {
  props: {
    dataAmt: number,
    paginationAmt: number,
    paginationBegin: number,
    paginationEnd: number,
    changePage: Function,
  };

  render() {
    return (
      <span className="ReactDataTable-Pagination">
        <p style={{ display: 'inline-block' }}>
          {this.props.paginationBegin}-{this.props.paginationEnd} of {this.props.dataAmt}
        </p>
        <button onClick={() => this.props.changePage(false)}><i className="material-icons">chevron_left</i></button>
        <button onClick={() => this.props.changePage(true)}><i className="material-icons">chevron_right</i></button>
      </span>
    );
  }
}

export default ReactDataTablePagination;
