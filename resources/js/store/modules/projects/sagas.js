import { call, put, takeLatest } from 'redux-saga/effects';
import { projectsIndex, projectShow, PROJECT_SHOW_FLAG } from './actions'


function api(url) {
    return fetch(url).then(response => response.json())
}


export function* index(action) {
    try {
        const projects = yield call(api, `/projects`)
        yield put(projectsIndex(projects.data))

    } catch (error) {
        console.log(error)
    }
}

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