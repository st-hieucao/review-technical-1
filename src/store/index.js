import { createStore, compose } from 'redux';
import reducer from './app-reducers';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancer()
)

export default store;