// @flow
import { connect } from 'react-redux';
import * as type from './actionTypes';
import generateActionCreator from 'shared/js/actionCreator';
import ReactDataTable from './ReactDataTable';

const mapStateToProps = (state, ownProps) => ({
  ui: { ...state },
  config: ownProps.config
});

const getRef = ref =>
  generateActionCreator(type.HEADER_REF, {
    ref,
  });

const changeDensity = (level: number, rowHeight: number) => {
  return generateActionCreator(type.CHANGE_DENSITY, { level, rowHeight });
};

const mapDispatchToProps = dispatch => ({
  getElementRef: (ref) => {
    dispatch(getRef(ref));
  },
  changeRowDensity: (level, rowHeight) => {
    dispatch(changeDensity(level, rowHeight));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ReactDataTable);
