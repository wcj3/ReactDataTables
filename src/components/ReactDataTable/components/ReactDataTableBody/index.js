// @flow
import React from 'react';
import classNames from 'classnames';
import styles from '../../styles.css';

class ReactDataTableBody extends React.PureComponent {
  props: {
    data: Array<any>,
    style: string,
    numOfCells: number,
    rowHeight: number,
    gridColumns: string,
  };

  // TODO: Make into higher order component

  //
  // Add child element to row Array; reuse jsx templating
  //
  addToRow(row: Array<any>, item: any) {
    row.push(
      <span className={'cell'}>
        <span className="data">
          {item}
        </span>
      </span>,
    );
    return row;
  }

  render() {
    const body = [];
    let bodyCells = [];
    this.props.data.map(item =>
      item.map((subItem, index) => {
        // add data to row before resetting below
        bodyCells = this.addToRow(bodyCells, subItem);
        // adds cells every this.props.config.headers.length of data
        if ((index + 1) % this.props.numOfCells === 0) {
          // define row styles
          const rowClasses = classNames({
            'ReactDataTable-row--zebra': this.props.style === 'zebra',
            'ReactDataTable-row': true,
          });
          body.push(
            <div
              className={rowClasses}
              style={{
                borderBottom: this.props.style === 'line' && '1px solid black',
                gridTemplateColumns: this.props.gridColumns,
                height: this.props.rowHeight,
              }}
            >
              {bodyCells}
            </div>,
          );
          // set bodyCell to empty Array after adding to body
          bodyCells = [];
        }
      }),
    );
    return (
      <div className="body">
        {body}
      </div>
    );
  }
}

export default ReactDataTableBody;
