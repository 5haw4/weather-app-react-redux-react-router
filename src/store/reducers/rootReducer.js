import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

import searchReducer from './searchReducer'
import favoriteReducer from './favoriteReducer'
import toasterReducer from './toasterReducer'
import settingsReducer from './settingsReducer'

const rootReducer = combineReducers({
    searchReducer,
    favoriteReducer,
    toasterReducer,
    settingsReducer,
})

export default createStore(rootReducer, applyMiddleware(ReduxThunk));