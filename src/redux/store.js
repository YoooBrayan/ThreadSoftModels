import {combineReducers, compose, applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import modeloReducer from 'redux/modeloDucks';
import operacionesReducer from 'redux/operacionesDucks'
import loginReducer from './loginDucks';

const rootReducer = combineReducers({
    operaciones: operacionesReducer,
    modelo: modeloReducer,
    login: loginReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
    return store
}