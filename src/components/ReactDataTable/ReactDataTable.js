// @flow
import React from 'react';
import classNames from 'classnames';

// import main child components
import ReactDataTableHeader from './components/ReactDataTableHeader';
import ReactDataTableBody from './components/ReactDataTableBody';
import ReactDataTableDensity from './components/ReactDataTableDensity';
import ReactDataTablePagination from './components/ReactDataTablePagination';

import styles from './styles.css';

class ReactDataTable extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      cols: '',
      tableWidth: {
        small: 550,
        medium: 750,
        large: 950,
        xl: 1150,
      },
      showControls: false,
    };
    this.toggleControls = this.toggleControls.bind(this);
    this.changePageCtrl = this.changePageCtrl.bind(this);
  }

  state: {
    cols: string,
    tableWidth: {
      small: number,
      medium: number,
      large: number,
      xl: number,
    },
    showControls: boolean,
  };

  componentWillMount() {
    // set columns prior to render
    this.setState({
      cols: '1fr '.repeat(this.props.config.headers.length),
    });
  }

  componentDidMount() {
    this.props.dataHasLoaded(this.props.config.data.length);
  }

  toggleControls() {
    this.setState({
      showControls: !this.state.showControls,
    });
  }

  changePageCtrl(viewNextPage: boolean) {
    if (viewNextPage && this.props.ui.canPaginateNext) {
      this.props.changeDataPage(true);
    } else if (!viewNextPage && this.props.ui.canPaginatePrev) {
      this.props.changeDataPage(false);
    }
  }

  props: {
    config: {
      maxHeight: number,
      rowStyle: string,
      minSize: string,
      headers: Array<string>,
      data: Array<Array<string>>,
    },
    ui: {
      headerRef: HTMLElement,
      densityLevel: number,
      densityRowHeight: number,
      paginationAmt: number,
      paginationBegin: number,
      paginationEnd: number,
      canPaginateNext: boolean,
      canPaginatePrev: boolean,
    },
    getElementRef: Function,
    changeRowDensity: Function,
    changeDataPage: Function,
    dataHasLoaded: Function,
  };

  render() {
    let scrollTracker = 0;
    const scrolls = [];
    // refereneces for table elements. (Will be assigned a non-null val during render)
    let tableRef = null;
    //
    // EVENT Funcs
    //

    // Remove scroll class
    const scrollKiller = (param) => {
      scrolls.push(param);
      const scrollLengthTimeout = [...scrolls].length;
      // scrollLengthTimeout is not mutable and is references from original execution environment (closure)
      // scrolls is mutable and the length will change with updates
      setTimeout(() => {
        if (scrollLengthTimeout === scrolls.length) {
          this.props.ui.headerRef.classList.remove('risen');
        }
      }, 300);
    };
    const wheeler = (event) => {
      if (Math.abs(event.deltaY) > 0 && event.deltaX === 0) {
        this.props.ui.headerRef.classList.add('risen');
        scrollKiller(scrollTracker++);
      }
    };

    const scroller = (event) => {
      if (event.nativeEvent.target.scrollLeft > 0) {
        tableRef.classList.add('side-scroller');
      } else {
        tableRef.classList.remove('side-scroller');
      }
    };

    const controlClasses = classNames('ReactDataTable-controls', {
      'ReactDataTable-controls is-open': this.state.showControls,
    });

    return (
      <div className="ReactDataTable-container">
        <div className="ReactDataTable-controlsContainer">
          <button onClick={this.toggleControls} style={{ display: 'flex', alignItems: 'center' }}>
            <i className="material-icons">settings</i>
            <p>Options</p>
          </button>
          <div className={controlClasses}>
            <ReactDataTableDensity
              setDensity={this.props.changeRowDensity}
              densityLevel={this.props.ui.densityLevel}
            />
            <ReactDataTablePagination
              dataAmt={this.props.config.data.length}
              paginationAmt={this.props.ui.paginationAmt}
              paginationBegin={this.props.ui.paginationBegin}
              paginationEnd={this.props.ui.paginationEnd}
              changePage={this.changePageCtrl}
            />
          </div>
        </div>
        <div
          className="ReactDataTable-wrapper"
          onScroll={scroller}
          onWheel={wheeler}
          style={{
            maxHeight: this.props.config.maxHeight,
          }}
        >
          <div
            className="ReactDataTable"
            style={{
              minWidth: this.state.tableWidth[this.props.config.minSize],
            }}
            ref={(div) => {
              tableRef = div;
            }}
          >
            <ReactDataTableHeader
              data={this.props.config.headers}
              columns={this.state.cols}
              refCallback={this.props.getElementRef}
            />
            <ReactDataTableBody
              data={this.props.config.data.slice(
                this.props.ui.paginationBegin - 1,
                this.props.ui.paginationEnd,
              )}
              style={this.props.config.rowStyle}
              numOfCells={this.props.config.headers.length}
              rowHeight={this.props.ui.densityRowHeight}
              gridColumns={this.state.cols}
              refCallback={this.props.getElementRef}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ReactDataTable;
