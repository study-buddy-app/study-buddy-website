import {createStore, combineReducers} from 'redux'
import authReducer from './authReducer'
import backpackReducer from './backpackReducer'

const rootReducer = combineReducers({
    authReducer,
    backpackReducer
})

export default createStore(rootReducer)