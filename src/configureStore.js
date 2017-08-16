import { createStore } from 'redux';
import ReactDataTable from './components/ReactDataTable/reducer';

export default function configureStore(preloadedState) {
  return createStore(
    ReactDataTable,
    preloadedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
}
