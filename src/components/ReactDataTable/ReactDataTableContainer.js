// @flow
import { connect } from 'react-redux';
import * as type from './actionTypes';
import generateActionCreator from 'shared/js/actionCreator';
import ReactDataTable from './ReactDataTable';

const mapStateToProps = (state, ownProps) => ({
  ui: { ...state },
  config: ownProps.config,
});

const getRef = ref =>
  generateActionCreator(type.HEADER_REF, {
    ref,
  });

const changeDensity = (level: number, rowHeight: number) => generateActionCreator(type.CHANGE_DENSITY, { level, rowHeight });

const changePage = (nextPage: number) => generateActionCreator(type.CHANGE_PAGE, { nextPage });

const dataLoaded = (size: number) => generateActionCreator(type.DATA_LOADED, {size});

const mapDispatchToProps = dispatch => ({
  getElementRef: (ref) => {
    dispatch(getRef(ref));
  },
  changeRowDensity: (level, rowHeight) => {
    dispatch(changeDensity(level, rowHeight));
  },
  changeDataPage: (nextPage) => {
    dispatch(changePage(nextPage));
  },
  dataHasLoaded: (size) => {
    dispatch(dataLoaded(size))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ReactDataTable);
