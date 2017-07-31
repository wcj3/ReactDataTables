// @flow
import React from 'react';
import classNames from 'classnames';
// todo: styled components
import './styles.css';

class ReactDataTable extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      densityLevel: 1,
    };
  }

  state: {
    density: number,
  };

  // increment densityLevel
  setDensity(level: number, rowHeight: number) {
    this.setState({
      densityLevel: level,
      densityHeight: rowHeight,
    });
  }
  addToRow(row, item) {
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
    const wheelTracker = 0;
    const cache = 0;
    const scrolls = [];
    const wheels = [];
    const tableSize = {
      small: 550,
      medium: 750,
      large: 950,
      xl: 1150,
    };
    // COLUMNS
    const cols = '1fr '.repeat(this.props.config.headers.length);
    const headers = this.props.config.headers.map((item, index) =>
      (<span className="cell">
        <span className="data">
          {item}
        </span>
      </span>),
    );
    const body = [];
    let bodyCells = [];
    // BODY
    // TODO: create a row every index of items
    this.props.config.data.map((item, index) =>
      item.map((subItem, index) => {
        // adds cells every this.props.config.headers.length of data
        if ((index + 1) / this.props.config.headers.length >= 1) {
          console.log(index);
          const cellClasses = classNames(
            {
              'cell-line': this.props.config.rowStyle === 'line',
            },
            'cell',
          );
          // add data to row before resetting below
          bodyCells = this.addToRow(bodyCells, subItem);
          body.push(
            <div className="ReactDataTable-row" style={{ height: this.state.densityHeight, gridTemplateColumns: cols }}>
              {bodyCells}
            </div>,
          );
          console.log(bodyCells);
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
      <div>
        <div
          className="ReactDataTable-wrapper"
          style={{
            maxHeight: this.props.config.maxHeight,
          }}
          onScroll={scroller}
          onWheel={wheeler}
        >
          <div className="ReactDataTable-density">
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

          <div
            className="ReactDataTable"
            style={{
              minWidth: tableSize[this.props.config.minSize],
              gridTemplateColumns: cols,
            }}
            ref={(div) => {
              tableBody = div;
            }}
          >
            <div
              className="grid-helper header"
              style={{
                gridTemplateColumns: cols,
              }}
              ref={(div) => {
                tableHead = div;
              }}
            >
              {headers}
            </div>
            <div className="grid-helper body">
              {body}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReactDataTable;
