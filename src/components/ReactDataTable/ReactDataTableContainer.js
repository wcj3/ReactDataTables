// @flow
import { connect } from 'react-redux';
import * as type from './actionTypes';
import generateActionCreator from 'shared/js/actionCreator';
import ReactDataTable from './index';

const mapStateToProps = state => ({
  ui: { ...state },
});

const getRef = (ref, elementType) => {
  return generateActionCreator(elementType === 'header' ? type.HEADER_REF : type.BODY_REF, {
    ref,
  });
};

const mapDispatchToProps = dispatch => ({
  getElementRef: (ref, elementType) => {
    console.log('dispatching');
    dispatch(getRef(ref, elementType));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ReactDataTable);
