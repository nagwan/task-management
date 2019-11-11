import { call, put, takeLatest, select } from 'redux-saga/effects';
import { PROJECTS_INDEX_FLAG, projectsIndex, projectShow, PROJECT_SHOW_FLAG, PROJECT_STORE_FLAG, projectStore, TASK_STORE_FLAG, updateProjectTasks, TASK_UPDATE_FLAG, PROJECT_UPDATE_FLAG, PROJECT_FETCH_FLAG } from './actions'
import { api } from '../../../helpers/functions'
import { getProject } from '../../../helpers/selectors'

// fetch all projects
export function* index(action) {

    try {

        let user = localStorage.getItem('user')

        if (user != null) {

            let user_obj = JSON.parse(user)
            
            let token = user_obj.api_token

            const projects = yield call(api, `/api/projects`, null, 'get', token)

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

// update project 
export function* update(action) {

    try {

        let token = localStorage.getItem('token')

        if (token != null) {

            const project = yield call(api, `/api/projects/${action.payload.id}`, action.payload.values, 'post', JSON.parse(token))

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

        let token = localStorage.getItem('token')

        if (token != null) {

            const project = yield call(api, `/api/projects/${action.payload.id}`, null, 'get', JSON.parse(token))

            yield put(projectShow(project.data.data))

            yield action.payload.history.push(`/edit-project/${project.data.data.id}`)

        } else {

            yield action.payload.history.push(`/login`)
        }


    } catch (error) {

        console.log(error)
    }

}

export function* watchFetch() {
    yield takeLatest(PROJECT_FETCH_FLAG, fetch)
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

