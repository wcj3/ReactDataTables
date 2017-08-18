// @flow
import * as types from './actionTypes';

const AppReducer = (state: Object = {}, action: Object = {}) => {
  switch (action.type) {
    case types.HEADER_REF:
      return {
        ...state,
        headerRef: action.ref,
      };
    case types.CHANGE_DENSITY:
      return {
        ...state,
        densityLevel: action.level,
        densityRowHeight: action.rowHeight,
      };
    default:
      return {
        ...state,
        densityLevel: 1,
        densityRowHeight: 20,
      };
  }
};

export default AppReducer;
