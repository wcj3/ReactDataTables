// @flow
import React from 'react';
import classNames from 'classnames';
// todo: styled components
import CSSModules from 'react-css-modules';
import styles from './styles.css';

class ReactDataTable extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      densityLevel: 1,
    };
  }

  state: {
    densityLevel: number,
  };

  // increment densityLevel
  setDensity(level: number, rowHeight: number) {
    this.setState({
      densityLevel: level,
      densityHeight: rowHeight,
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
  };
  //
  // Add child element to row Array; reuse jsx templating
  //
  addToRow(row: Array<any>, item: any) {
    row.push(
      <span className={'cell'} style={{ height: this.state.densityHeight }}>
        <span className="data">
          {item}
        </span>
      </span>,
    );
    return row;
  }

  render() {
    const densityClasses = num =>
      classNames('material-icons', {
        active: this.state.densityLevel === num,
      });
    let tableHead = null;
    let tableBody = null;
    let scrollTracker = 0;
    const scrolls = [];
    const tableSize = {
      small: 550,
      medium: 750,
      large: 950,
      xl: 1150,
    };
    // dynamically set how many columns in grid
    const cols = '1fr '.repeat(this.props.config.headers.length);
    //
    // table headers
    //
    const headers = this.props.config.headers.map(item =>
      (<span className="cell">
        <span className="data">
          {item}
        </span>
      </span>),
    );
    //
    // BODY
    //
    const body = [];
    let bodyCells = [];
    this.props.config.data.map(item =>
      item.map((subItem, index) => {
        // adds cells every this.props.config.headers.length of data
        if ((index + 1) / this.props.config.headers.length >= 1) {
          // add data to row before resetting below
          bodyCells = this.addToRow(bodyCells, subItem);
          body.push(
            <div
              styleName="ReactDataTable-row"
              style={{
                'borderBottom': this.props.config.rowStyle === 'line' && '1px solid black',
                background: this.props.config.rowStyle === 'zebra' && 'lightgrey',
                gridTemplateColumns: cols,
              }}
            >
              {bodyCells}
            </div>,
          );
          // set bodyCell to empty Array after adding to body
          bodyCells = [];
        } else {
          // add data to be attached to a row
          bodyCells = this.addToRow(bodyCells, subItem);
        }
      }),
    );

    //
    // EVENT Funcs
    //

    // Remove scroll class
    const scrollKiller = (param) => {
      scrolls.push(param);
      const tempScrollLength = [...scrolls].length;
      setTimeout(() => {
        if (tempScrollLength === scrolls.length) {
          tableHead.classList.remove('risen');
        }
      }, 500);
    };

    const wheeler = (event) => {
      if (event.deltaY > 0 && event.deltaX === 0) {
        tableHead.classList.add('risen');
        scrollKiller(scrollTracker++);
      }
    };
    const scroller = (event) => {
      if (event.nativeEvent.target.scrollLeft > 0) {
        tableBody.classList.add('side-scroller');
      } else {
        tableBody.classList.remove('side-scroller');
      }
    };

    return (
      <div styleName="ReactDataTable-container">
        <div styleName="ReactDataTable-density">
          <button className={densityClasses(1)} onClick={() => this.setDensity(1, 32)}>
            list
          </button>
          <button className={densityClasses(2)} onClick={() => this.setDensity(2, 25)}>
            list
          </button>
          <button className={densityClasses(3)} onClick={() => this.setDensity(3, 20)}>
            list
          </button>
        </div>
        <div styleName="ReactDataTable-wrapper" onScroll={scroller} onWheel={wheeler}>
          <div
            styleName="ReactDataTable"
            style={{
              minWidth: tableSize[this.props.config.minSize],
              gridTemplateColumns: cols,
            }}
            ref={(div) => {
              tableBody = div;
            }}
          >
            <div
              className="header"
              style={{
                gridTemplateColumns: cols,
              }}
              ref={(div) => {
                tableHead = div;
              }}
            >
              {headers}
            </div>
            <div
              className="body"
              style={{
                maxHeight: this.props.config.maxHeight,
              }}
            >
              {body}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CSSModules(ReactDataTable, styles);
