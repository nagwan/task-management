import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from "redux-saga"
import root from "./root-saga"
import projects from './modules/projects/reducer'


const sagaMiddleware = createSagaMiddleware()

const composeEnhancers =
    typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware)
);


const reducers = combineReducers({
    projects
})

const store = createStore(
    reducers,
    enhancer
);

sagaMiddleware.run(root)

export default store;
