import { call, put, takeLatest } from 'redux-saga/effects';
import { projectsIndex, projectShow, PROJECT_SHOW_FLAG, PROJECT_STORE_FLAG, projectStore } from './actions'


function api(url, data) {
    return fetch(url).then(response => response.json())
}

// fetch all projects
export function* index(action) {
    try {
        const projects = yield call(api, `/projects`)
        yield put(projectsIndex(projects.data))

    } catch (error) {
        console.log(error)
    }
}


// view a project
export function* show(action) {
    try {
        const project = yield call(api, `/projects/${action.payload.id}`)

        yield put(projectShow(project.data))
        
        yield action.payload.history.push(`/projects/${project.data.id}`)
    } catch (error) {
        console.log(error)
    }
}

export function* watchShow(){
    yield takeLatest(PROJECT_SHOW_FLAG, show)
}


// add new project 
export function* store(action){
    try {
        const project = yield call(api, `/projects`)
        yield put(projectStore(project.data))

    } catch (error) {
        console.log(error)
    }
}

export function* watchStore(){
    yield takeLatest(PROJECT_STORE_FLAG, store)
}