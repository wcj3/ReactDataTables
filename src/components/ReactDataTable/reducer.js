// @flow
import * as types from './actionTypes';
const genericReducer = (state: Object = {}, action: Object = {}) => {
  switch (action.type) {
    case types.HEADER_REF:
      return {
        headerRef: action.ref,
      };
    case types.DATA_LOADED:
      return {
        dataLength: action.size,
      };
    case types.CHANGE_DENSITY:
      return {
        densityLevel: action.level,
        densityRowHeight: action.rowHeight,
      };
    default:
      return state;
  }
};

function paginationReducer(state = {}, action): Object {
  switch (action.type) {
    case types.CHANGE_PAGINATION_AMT: {
      const copyState = { ...state };
      copyState.paginationAmt = action.amount;
      copyState.paginationEnd = state.paginationEnd + (action.amount - state.paginationEnd);
      return calcIndices(copyState, action);
    }
    case types.CHANGE_PAGE: {
      return calcIndices(state, action);
    }
    default:
      return {
        ...state,
      };
  }
}

function calcIndices(state, action) {
  // TODO: move to seperate funciton
  let paginationBegin = state.paginationBegin;
  let paginationEnd = state.paginationEnd;
  let canPaginateNext = true;
  let canPaginatePrev = true;
  if (action.requestedNextPage) {
    // paginationBegin will always be a valid index
    paginationBegin += state.paginationAmt;
    // check paginationEnd plus requested amount to see if it is less than total data
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

function AppReducer(state = {}, action) {
  switch (action.type) {
    case types.HEADER_REF:
    case types.DATA_LOADED:
    case types.CHANGE_DENSITY:
      return {
        ...state,
        ...genericReducer(state, action),
      };
    case types.CHANGE_PAGE:
    case types.CHANGE_PAGINATION_AMT:
      return {
        ...state,
        ...paginationReducer(state, action),
      };
    default:
      return {
        ...state,
        densityLevel: 1,
        densityRowHeight: 35,
        paginationAmt: 20,
        paginationBegin: 1,
        paginationEnd: 20,
        canPaginatePrev: false,
        canPaginateNext: true,
      };
  }
}

export default AppReducer;
