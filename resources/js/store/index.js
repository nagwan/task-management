import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from "redux-saga"
import root from "./root-saga"
import projects from './modules/projects/reducer'


const sagaMiddleware = createSagaMiddleware()

const reducers = combineReducers({
    projects 
})

const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware)
    );

//sagaMiddleware.run(root)

export default store;
