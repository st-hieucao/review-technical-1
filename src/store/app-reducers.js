import { combineReducers } from 'redux';
import { orderReducer } from './order/reducer'

const appReducer = combineReducers({
  orderReducer,
})

export default appReducer;