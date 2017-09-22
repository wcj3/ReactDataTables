// @flow
import React from 'react';

import styles from './styles.css';
import classNames from 'classnames';


class ReactDataTableDensity extends React.PureComponent {
  props: {
    setDensity: Function,
    densityLevel: number,
  };
  render() {
    const densityClasses = num =>
      classNames({
        active: this.props.densityLevel === num,
      });
    return (
      <div className="ReactDataTableDensity">
        <button className={densityClasses(1)} onClick={() => this.props.setDensity(1, 35)}>
          Aa
        </button>
        <button className={densityClasses(2)} onClick={() => this.props.setDensity(2, 45)}>
          Aa
        </button>
        <button className={densityClasses(3)} onClick={() => this.props.setDensity(3, 55)}>
          Aa
        </button>
      </div>
    );
  }
}

export default ReactDataTableDensity;
