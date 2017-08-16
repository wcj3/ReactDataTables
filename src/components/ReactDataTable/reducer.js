// @flow
import * as types from './actionTypes';

const AppReducer = (state: Object = {}, action: Object = {}) => {
  switch (action.type) {
    case types.HEADER_REF:
      return {
        ...state,
        headerRef: action.ref,
      };
    default:
    // no expected default cases
  }
};

export default AppReducer;
