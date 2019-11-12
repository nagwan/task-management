import { call, put, takeLatest, select } from 'redux-saga/effects';
import { PROJECTS_INDEX_FLAG, projectsIndex, projectShow, PROJECT_SHOW_FLAG, PROJECT_STORE_FLAG, projectStore, TASK_STORE_FLAG, updateProjectTasks, TASK_UPDATE_FLAG, PROJECT_UPDATE_FLAG, PROJECT_FETCH_FLAG } from './actions'
import { api } from '../../../helpers/functions'
import { getProject, getAllProjects } from '../../../helpers/selectors'

// fetch all projects
export function* index(action) {

    try {

        if (localStorage.getItem('user') != null) {

            let user = JSON.parse(localStorage.getItem('user'))

            let token = user.api_token

            const projects = yield call(api, `/api/projects`, null, 'get', token)

            yield put(projectsIndex(projects.data.data))

        }


    } catch (error) {

        console.log(error)
    }
}

export function* watchIndex() {

    const projects = yield select(getAllProjects);

    if (projects.length) {
        return false
    } else {
        yield takeLatest(PROJECTS_INDEX_FLAG, index)
    }
}

// view a project
export function* show(action) {

    try {

        if (localStorage.getItem('user') != null) {

            let user = JSON.parse(localStorage.getItem('user'))

            let token = user.api_token

            const project = yield call(api, `/api/projects/${action.payload.id}`, null, 'get', token)

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

// update project 
export function* update(action) {

    try {

        if (localStorage.getItem('user') != null) {

            let user = JSON.parse(localStorage.getItem('user'))

            let token = user.api_token

            const project = yield call(api, `/api/projects/${action.payload.id}`, action.payload.values, 'POST', token)

            yield put(projectShow(project.data.data))

            yield action.payload.history.push(`/projects/${project.data.data.id}`)

        } else {

            yield action.payload.history.push(`/login`)
        }


    } catch (error) {

        console.log(error)
    }
}

export function* watchUpdate() {

    yield takeLatest(PROJECT_UPDATE_FLAG, update)
}


// fetch project

export function* fetch(action) {
    try {

        if (localStorage.getItem('user') != null) {

            let user = JSON.parse(localStorage.getItem('user'))

            let token = user.api_token

            const project = yield call(api, `/api/projects/${action.payload.id}`, null, 'get', token)

            yield put(projectShow(project.data.data))

            if (action.payload.history) {
                yield action.payload.history.push(`/edit-project/${project.data.data.id}`)
            }

        } else {

            yield action.payload.history.push(`/login`)
        }


    } catch (error) {

        console.log(error)
    }

}

export function* watchFetchProject() {
    yield takeLatest(PROJECT_FETCH_FLAG, fetch)
}


// add new project 
export function* store(action) {

    try {
        if (localStorage.getItem('user') != null) {

            let user = JSON.parse(localStorage.getItem('user'))

            let token = user.api_token

            const project = yield call(api, '/api/projects', action.payload.values, 'POST', token)

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


/**
 *  add task
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
    yield takeLatest(TASK_STORE_FLAG, storeTask)
}


/**
 * update task 
 */
export function* updateTask(action) {
    try {

        let token = localStorage.getItem('token')

        const project = yield select(getProject);

        if (token != null) {

            const task = yield call(api, `/api/projects/${project.id}/tasks/${action.payload.id}`, action.payload.values, 'POST', JSON.parse(token))

            yield put(updateProjectTasks(task.data.data))
        }

    } catch (error) {
        console.log(error)
    }

}

export function* watchTaskUpdate() {
    yield takeLatest(TASK_UPDATE_FLAG, updateTask)
}

