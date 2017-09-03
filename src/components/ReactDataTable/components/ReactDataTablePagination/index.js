// @flow
import React from 'react';

import styles from './styles.css';
import PaginationSelect from './components/PaginationSelect';

class ReactDataTablePagination extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      pagSelectIsVisible: false,
    };
    this.displayPaginationSelect = this._displayPaginationSelect.bind(this);
  }
  state: {
    pagSelectIsVisible: boolean,
  };
  props: {
    dataLength: number,
    paginationBegin: number,
    paginationEnd: number,
    changePage: Function,
    changePaginationAmount: Function,
  };
  // add component to select amount of pagination

  _displayPaginationSelect() {
    this.setState({
      pagSelectIsVisible: !this.state.pagSelectIsVisible,
    });
  }

  render() {
    return (
      <div>
        <span className="ReactDataTable-Pagination">
          <button style={{ display: 'inline-block' }} onClick={this.displayPaginationSelect}>
            {this.props.paginationBegin}-{this.props.paginationEnd} of {this.props.dataLength}
          </button>
          <button onClick={() => this.props.changePage(false)}>
            <i className="material-icons">chevron_left</i>
          </button>
          <button onClick={() => this.props.changePage(true)}>
            <i className="material-icons">chevron_right</i>
          </button>
        </span>
        <PaginationSelect
          select={this.props.changePaginationAmount}
          dataLength={this.props.dataLength}
          visible={this.state.pagSelectIsVisible}
        />
      </div>
    );
  }
}

export default ReactDataTablePagination;
