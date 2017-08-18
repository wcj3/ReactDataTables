// @flow
import React from 'react';
// implement redux for debugging

class ReactDataTableHeader extends React.PureComponent {
  constructor() {
    super();
    this.state = { headerStored: false };
  }

  state: {
    headerStored: boolean
  }

  shouldComponentUpdate(nextProps: any, nextState: any) {
    if (nextState.headerStored) {
      return false;
    }
    return true;
  }

  props: {
    data: Array<any>,
    columns: string,
    refCallback: Function,
  };

  captureRef(div: HTMLElement) {
    this.setState({
      headerStored: true,
    });
    this.props.refCallback(div);
  }

  render() {
    return (
      <div
        className="header"
        style={{
          gridTemplateColumns: this.props.columns,
        }}
        ref={(div) => {
          this.captureRef(div);
        }}
      >
        {this.props.data.map(item =>
          (<span className="cell">
            <span className="data">
              {item}
            </span>
          </span>),
        )}
      </div>
    );
  }
}

export default ReactDataTableHeader;
