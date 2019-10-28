import { call, put, takeLatest } from 'redux-saga/effects';
import { PROJECTS_INDEX_FLAG, projectsIndex, projectShow, PROJECT_SHOW_FLAG, PROJECT_STORE_FLAG, projectStore } from './actions'
import { api } from '../../../helpers/functions'

// fetch all projects
export function* index(action) {

    try {
        const projects = yield call(api, `/projects`, null, 'get')

        console.log(projects, 'projects')

        yield put(projectsIndex(projects.data))

    } catch (error) {
        console.log(error)
    }
}


export function* watchIndex() {
    yield takeLatest(PROJECTS_INDEX_FLAG, index)
}

// view a project
export function* show(action) {

    try {
        const project = yield call(api, `/projects/${action.payload.id}`, null, 'get')

        yield put(projectShow(project.data))

        yield action.payload.history.push(`/projects/${project.data.id}`)

    } catch (error) {

        console.log(error)
    }
}

export function* watchShow() {

    yield takeLatest(PROJECT_SHOW_FLAG, show)
}


// add new project 
export function* store(action) {

    try {
        const project = yield call(api, `/projects`, action.payload.values, 'POST')

        yield put(projectStore(project.data))

        yield action.payload.history.push('/projects')

    } catch (error) {

        console.log(error)
    }
}

export function* watchStore() {

    yield takeLatest(PROJECT_STORE_FLAG, store)
}