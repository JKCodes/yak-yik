import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { zoneReducer, commentReducer, accountReducer } from '../reducers'

var store;

export default {
  configureStore: () => {
    const reducers = combineReducers({
      zone: zoneReducer,
      comment: commentReducer,
      account: accountReducer
    })

    store = createStore(
      reducers,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
      applyMiddleware(thunk)
    )

    return store
  },

  currentStore: () => {
    return store
  }

}