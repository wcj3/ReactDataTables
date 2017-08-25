import { createStore, applyMiddleware } from 'redux';
import ReactDataTable from './reducer';
import logger from 'redux-logger'


export default function configureStore(preloadedState) {
  return createStore(
    ReactDataTable,
    preloadedState,
    applyMiddleware(logger),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
}
