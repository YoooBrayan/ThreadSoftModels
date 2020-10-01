import {combineReducers, compose, applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import modeloReducer from './modeloDucks';
import operacionesReducer from './operacionesDucks'

const rootReducer = combineReducers({
    operaciones: operacionesReducer,
    modelo: modeloReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
    return store
}