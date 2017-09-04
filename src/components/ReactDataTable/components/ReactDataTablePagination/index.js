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
    this.monitorClicks = this._monitorClicks.bind(this);
  }
  state: {
    pagSelectIsVisible: boolean,
  };
  props: {
    dataLength: number,
    begin: number,
    end: number,
    amount: number,
    changePage: Function,
    changeAmount: Function,
  };
  // add component to select amount of pagination

  _displayPaginationSelect() {
    this.setState({
      pagSelectIsVisible: !this.state.pagSelectIsVisible,
    });
  }

    // close paginationSelect if currently open and target is not related to paginationSelect
  _monitorClicks(event: Event) {
    if (event.relatedTarget && event.relatedTarget.className.includes('PaginationSelect')) {
      event.preventDefault();
    } else if (this.state.pagSelectIsVisible) {
      this.displayPaginationSelect();
    }
  }

  render() {
    return (
      <div style={{ position: 'relative'}} onBlur={this.monitorClicks}>
        <span className="ReactDataTable-Pagination">
          <button style={{ display: 'inline-block' }} onClick={this.displayPaginationSelect}>
            {this.props.begin}-{this.props.end} of {this.props.dataLength}
          </button>
          <button onClick={() => this.props.changePage(false)}>
            <i className="material-icons">chevron_left</i>
          </button>
          <button onClick={() => this.props.changePage(true)}>
            <i className="material-icons">chevron_right</i>
          </button>
        </span>
        <PaginationSelect
          select={this.props.changeAmount}
          dataLength={this.props.dataLength}
          close={this.displayPaginationSelect}
          amount={this.props.amount}
          visible={this.state.pagSelectIsVisible}
        />
      </div>
    );
  }
}

export default ReactDataTablePagination;
