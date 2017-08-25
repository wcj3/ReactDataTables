// @flow
import * as types from './actionTypes';
// TODO: USE REDUCER COMPOSITON

const AppReducer = (state: Object = {}, action: Object = {}) => {
  switch (action.type) {
    case types.HEADER_REF:
      return {
        ...state,
        headerRef: action.ref,
      };
    case types.DATA_LOADED:
      return {
        ...state,
        dataLength: action.size,
      };
    case types.CHANGE_DENSITY:
      return {
        ...state,
        densityLevel: action.level,
        densityRowHeight: action.rowHeight,
      };
    case types.CHANGE_PAGINATION_AMT:
      return {
        ...state,
        paginationAmt: action.paginationAmt,
      };
    case types.CHANGE_PAGE: {
      // TODO: move to seperate funciton
      let paginationBegin = state.paginationBegin;
      let paginationEnd = state.paginationEnd;
      let canPaginateNext = true;
      let canPaginatePrev = true;
      if (action.nextPage) {
        // paginationBegin will always be a valid index
        paginationBegin += state.paginationAmt;
        // check paginationEnd plus requested amount is less than total data
        // or set canPaginateNext to false
        if (state.paginationEnd + state.paginationAmt < state.dataLength) {
          paginationEnd += state.paginationAmt;
        } else {
          canPaginateNext = false;
          paginationEnd = state.dataLength;
        }
      } else {
        // determine the diff of indices to see if amt matches paginationAmt
        const indexDiff = paginationEnd - paginationBegin;
        // check to see if end matches dataLength but diff between indices is not standard
        // meaning there was a remainder and we need to adjust paginationEnd
        if (paginationEnd === state.dataLength && indexDiff !== state.paginationAmt) {
          paginationEnd -= indexDiff + 1;
          paginationBegin -= state.paginationAmt;
        } else if (state.paginationBegin <= 1) {
          canPaginateNext = true;
          canPaginatePrev = false;
        } else {
          paginationBegin -= state.paginationAmt;
          paginationEnd -= state.paginationAmt;
        }
      }
      return {
        ...state,
        paginationBegin,
        paginationEnd,
        canPaginateNext,
        canPaginatePrev,
      };
    }
    default:
      return {
        ...state,
        densityLevel: 1,
        densityRowHeight: 20,
        paginationAmt: 20,
        paginationBegin: 1,
        paginationEnd: 20,
        canPaginatePrev: false,
        canPaginateNext: true,
      };
  }
};

export default AppReducer;
