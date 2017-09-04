// @flow
import React from 'react';
import classNames from 'classnames';

import styles from './styles.css';

const PaginationSelect = (props: {
  visible: boolean,
  select: Function,
  dataLength: number,
  close: Function,
  amount: number,
}) => {
  console.log(props.visible);
  const paginationClasses = classNames({
    PaginationSelect: props.visible,
    'PaginationSelect is-hidden': !props.visible,
  });

  const listItemClasses = (num: number) =>
    classNames({
      'PaginationSelect-item is-disabled': props.dataLength < num,
      'PaginationSelect-item': props.dataLength > num,
    });

  const close = (num: number) => {
    props.select(num);
    props.close();
  };

  return (
    <span className={paginationClasses}>
      <p>Rows:</p>
      <ul className="PaginationSelect-list">
        <li className={listItemClasses(20)}>
          <button
            className="PaginationSelect-button"
            disabled={props.dataLength < 20}
            onClick={() => close(20)}
          >
            20
          </button>
        </li>
        <li className={listItemClasses(50)}>
          <button
            className="PaginationSelect-button"
            disabled={props.dataLength < 50}
            onClick={() => close(50)}
          >
            50
          </button>
        </li>
        <li className={listItemClasses(100)}>
          <button
            className="PaginationSelect-button"
            disabled={props.dataLength < 100}
            onClick={() => close(100)}
          >
            100
          </button>
        </li>
      </ul>
    </span>
  );
};

export default PaginationSelect;
