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
        <button className={densityClasses(1)} onClick={() => this.props.setDensity(1, 20)}>
          Aa
        </button>
        <button className={densityClasses(2)} onClick={() => this.props.setDensity(2, 25)}>
          Aa
        </button>
        <button className={densityClasses(3)} onClick={() => this.props.setDensity(3, 32)}>
          Aa
        </button>
      </div>
    );
  }
}

export default ReactDataTableDensity;
