// @flow
import React from 'react';

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
      <div className="ReactDataTable-density">
        <i className="material-icons">line_weight</i>
        <button className={densityClasses(1)} onClick={() => this.props.setDensity(1, 20)}>
          Sm
        </button>
        <button className={densityClasses(2)} onClick={() => this.props.setDensity(2, 25)}>
          Md
        </button>
        <button className={densityClasses(3)} onClick={() => this.props.setDensity(3, 32)}>
          Lg
        </button>
      </div>
    );
  }
}

export default ReactDataTableDensity;
