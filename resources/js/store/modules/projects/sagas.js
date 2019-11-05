import { call, put, takeLatest, select } from 'redux-saga/effects';
import { PROJECTS_INDEX_FLAG, projectsIndex, projectShow, PROJECT_SHOW_FLAG, PROJECT_STORE_FLAG, projectStore, TASK_STORE_FLAG, TASK_STORE, updateProjectTasks } from './actions'
import { api, getProject } from '../../../helpers/functions'

// fetch all projects
export function* index(action) {

    try {

        let token = localStorage.getItem('token')

        if (token != null) {

            const projects = yield call(api, `/api/projects`, null, 'get', JSON.parse(token))

            yield put(projectsIndex(projects.data.data))

        }


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

        let token = localStorage.getItem('token')

        if (token != null) {

            const project = yield call(api, `/api/projects/${action.payload.id}`, null, 'get', JSON.parse(token))

            yield put(projectShow(project.data.data))

            yield action.payload.history.push(`/projects/${project.data.data.id}`)

        } else {

            yield action.payload.history.push(`/login`)
        }


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
        let token = localStorage.getItem('token')

        if (token != null) {

            const project = yield call(api, `/api/projects`, action.payload.values, 'POST', JSON.parse(token))

            yield put(projectStore(project.data.data))

            yield action.payload.history.push('/projects')
        }

    } catch (error) {

        console.log(error)
    }
}

export function* watchStore() {

    yield takeLatest(PROJECT_STORE_FLAG, store)
}


/**
 *  project`s tasks
 */



export function* storeTask(action) {

    try {
        let token = localStorage.getItem('token')

        const project = yield select(getProject);

        if (token != null) {

            const task = yield call(api, `/api/projects/${project.id}/tasks`, action.payload.values, 'POST', JSON.parse(token))

            yield put(updateProjectTasks(task.data.data))
        }

    } catch (error) {
        console.log(error)
    }
}


export function* watchTaskStore() {
    console.log('here we are')
    yield takeLatest(TASK_STORE_FLAG, storeTask)
}