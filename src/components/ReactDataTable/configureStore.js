import { createStore } from 'redux';
import ReactDataTable from './reducer';

export default function configureStore(preloadedState) {
  return createStore(
    ReactDataTable,
    preloadedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
}
