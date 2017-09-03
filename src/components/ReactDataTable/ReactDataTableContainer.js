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

const changeDensity = (level: number, rowHeight: number) =>
  generateActionCreator(type.CHANGE_DENSITY, { level, rowHeight });

const changePaginationAmt = (amount: number) =>
  generateActionCreator(type.CHANGE_PAGINATION_AMT, { amount });
const changePage = (requestedNextPage: number) => generateActionCreator(type.CHANGE_PAGE, { requestedNextPage });

const dataLoaded = (size: number) => generateActionCreator(type.DATA_LOADED, { size });

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
    dispatch(dataLoaded(size));
  },
  changePaginationAmt: (amount) => {
    dispatch(changePaginationAmt(amount))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ReactDataTable);
