import { userReducer } from '../store/user.reducer.js'
import { storyReducer } from '../store/story.reducer.js'
import { createStore, combineReducers } from 'redux'

const rootReducer = combineReducers({
  storyModule: storyReducer,
  userModule: userReducer,
})

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
  : undefined
export const store = createStore(rootReducer, middleware)

store.subscribe(() => {
  // console.log('**** Store state changed: ****')
  // console.log('storeState:\n', store.getState())
  // console.log('*******************************')
})
