// @flow
import React from 'react';
import classNames from 'classnames';

import styles from './styles.css';

const PaginationSelect = (props: { visible: boolean, select: Function, dataLength: number }) => {
  const paginationClasses = classNames({
    PaginationSelect: props.visible,
    'PaginationSelect is-hidden': !props.visible,
  });

  return (
    <span className={paginationClasses}>
      <p>Rows:</p>
      <ul className="PaginationSelect-list">
        <li disabled={props.dataLength < 20}>
          <button onClick={() => props.select(20)}>20</button>
        </li>
        <li disabled={props.dataLength < 50}>
          <button onClick={() => props.select(50)}>50</button>
        </li>
        <li disabled={props.dataLength < 100}>
          <button onClick={() => props.select(100)}>100</button>
        </li>
      </ul>
    </span>
  );
};

export default PaginationSelect;
