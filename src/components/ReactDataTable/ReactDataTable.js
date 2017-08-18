// @flow
import React from 'react';
import classNames from 'classnames';

import ReactDataTableHeader from './components/ReactDataTableHeader';
import ReactDataTableBody from './components/ReactDataTableBody';
import ReactDataTableDensity from './components/ReactDataTableDensity';

import styles from './styles.css';

class ReactDataTable extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      cols: '',
    };
  }

  state: {
    cols: string,
  };

  componentWillMount() {
    this.setState({
      cols: '1fr '.repeat(this.props.config.headers.length),
    });
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
    },
    getElementRef: Function,
    changeRowDensity: Function,
  };

  render() {
    let scrollTracker = 0;
    const scrolls = [];

    // refereneces for table elements
    let wrapperRef = null;
    const tableSize = {
      small: 550,
      medium: 750,
      large: 950,
      xl: 1150,
    };

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
      }, 500);
    };
    const wheeler = (event) => {
      if (event.deltaY > 0 && event.deltaX === 0) {
        this.props.ui.headerRef.classList.add('risen');
        scrollKiller(scrollTracker++);
      }
    };

    const scroller = (event) => {
      if (event.nativeEvent.target.scrollLeft > 0) {
        wrapperRef.classList.add('side-scroller');
      } else {
        wrapperRef.classList.remove('side-scroller');
      }
    };

    return (
      <div className="ReactDataTable-container">
        <ReactDataTableDensity
          setDensity={this.props.changeRowDensity}
          densityLevel={this.props.ui.densityLevel}
        />
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
              minWidth: tableSize[this.props.config.minSize],
            }}
            ref={(div) => {
              wrapperRef = div;
            }}
          >
            <ReactDataTableHeader
              data={this.props.config.headers}
              columns={this.state.cols}
              refCallback={this.props.getElementRef}
            />
            <ReactDataTableBody
              data={this.props.config.data}
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
