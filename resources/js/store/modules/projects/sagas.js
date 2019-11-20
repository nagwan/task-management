import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as actions from './actions'
import { api } from '../../../helpers/functions'
import { getProject, getAllProjects } from '../../../helpers/selectors'

/**
 * fetch all projects
 */
export function* index(action) {

    try {

        if (localStorage.getItem('user') != null) {

            let user = JSON.parse(localStorage.getItem('user'))

            const projects = yield call(api, `/api/projects`, null, 'get', user.api_token)

            yield put(actions.projectsIndex(projects.data.data))
            
        } else {
            yield action.history.push('/login')
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
        yield takeLatest(actions.PROJECTS_INDEX_FLAG, index)
    }
}

/**
 * fetch project
 */ 
export function* fetch(action) {
    try {

        if (localStorage.getItem('user') != null) {

            let user = JSON.parse(localStorage.getItem('user'))

            const project = yield call(api, `/api/projects/${action.payload.id}`, null, 'get', user.api_token)

            yield put(actions.activeProject(project.data.data))

        } else {
            yield action.history.push('/login')
        }

    } catch (error) {
        console.log(error)
    }

}

export function* watchFetchProject() {
    yield takeLatest(actions.ACTIVE_PROJECT_FETCH_FLAG, fetch)
}

/**
 * update project
 */ 
export function* update(action) {

    try {

        if (localStorage.getItem('user') != null) {

            let user = JSON.parse(localStorage.getItem('user'))

            const project = yield call(api, `/api/projects/${action.payload.id}`, action.payload.values, 'POST', user.api_token)

            yield put(actions.activeProject(project.data.data)) // how this updates the project in the original array ?!!

            yield action.payload.history.push(`/projects/${project.data.data.id}`)

        } else {

            yield action.payload.history.push(`/login`)
        }


    } catch (error) {

        console.log(error)
    }
}

export function* watchUpdate() {
    yield takeLatest(actions.PROJECT_UPDATE_FLAG, update)
}

/**
 * store project
 */ 
export function* store(action) {

    try {
        if (localStorage.getItem('user') != null) {

            let user = JSON.parse(localStorage.getItem('user'))

            const project = yield call(api, '/api/projects', action.payload.values, 'POST', user.api_token)

            let projects = yield select(getAllProjects);

            projects = [...projects, project.data.data]

            yield put(actions.projectsIndex(projects))

            yield put(actions.activeProject(project.data.data))

            yield action.payload.history.push(`/projects/${project.data.data.id}`)

        } else {

            yield action.payload.history.push(`/login`)
        }

    } catch (error) {

        console.log(error)
    }
}

export function* watchStore() {
    yield takeLatest(actions.PROJECT_STORE_FLAG, store)
}

/**
 * delete project 
 */
export function* deleteProject(action) {
    try {
        if (localStorage.getItem('user') != null) {

            let user = JSON.parse(localStorage.getItem('user'))

            const project = yield call(api, `/api/projects/${action.payload.id}`, action.payload.id, 'delete', user.api_token)

            yield put(actions.projectsIndex(project.data.data))

            yield action.payload.history.push('/projects')

        } else {

            yield action.payload.history.push(`/login`)
        }

    } catch (error) {
        console.log(error)
    }

}

export function* watchDeleteProject() {
    yield takeLatest(actions.DELETE_PROJECT_FLAG, deleteProject)
}


export function* inviteUsers(action){

    try {
        if (localStorage.getItem('user') != null) {

            let user = JSON.parse(localStorage.getItem('user'))

            const project = yield call(api, `/api/projects/${action.payload.id}/invitations`, action.payload.data, 'POST', user.api_token)

            yield put(actions.activeProject(project.data.data))

        } else {

            yield action.payload.history.push(`/login`)
        }

    } catch (error) {
        console.log(error)
    }

}


export function* watchInviteUsers(){
    yield takeLatest(actions.INVITE_USERS_FLAG, inviteUsers)
}

export function* removeMember(action){

    try {
        if (localStorage.getItem('user') != null) {

            const active_project = yield select(getProject);

            let user = JSON.parse(localStorage.getItem('user'))

            const project = yield call(api, `/api/projects/${active_project.id}/invitations/${action.payload.id}`, action.payload.id, 'delete', user.api_token)

            yield put(actions.activeProject(project.data.data))

        } else {

            yield action.payload.history.push(`/login`)
        }
        
    } catch (error) {
        console.log(error)
    }

}


export function* watchRemoveMember(){
    yield takeLatest(actions.REMOVE_MEMBER_FLAG, removeMember)
}


/**
 *  project`s tasks
 */


/**
 *  add task
 */
export function* storeTask(action) {

    try {

        const project = yield select(getProject);

        if (localStorage.getItem('user') != null) {

            let user = JSON.parse(localStorage.getItem('user'))

            const project_response = yield call(api, `/api/projects/${project.id}/tasks`, action.payload.values, 'POST', user.api_token)

            yield put(actions.activeProject(project_response.data.data))
        }

    } catch (error) {
        console.log(error)
    }
}

export function* watchTaskStore() {
    yield takeLatest(actions.TASK_STORE_FLAG, storeTask)
}


/**
 * update task
 */
export function* updateTask(action) {
    try {

        const project = yield select(getProject);

        if (localStorage.getItem('user') != null) {

            let user = JSON.parse(localStorage.getItem('user'))

            const project_response = yield call(api, `/api/projects/${project.id}/tasks/${action.payload.id}`, action.payload.values, 'POST', user.api_token)

            yield put(actions.activeProject(project_response.data.data))
        }

    } catch (error) {
        console.log(error)
    }

}

export function* watchTaskUpdate() {
    yield takeLatest(actions.TASK_UPDATE_FLAG, updateTask)
} 

/**
 * delete task
 */

export function* deleteTask(action) {

    try {

        const project = yield select(getProject);

        if (localStorage.getItem('user') != null) {

            let user = JSON.parse(localStorage.getItem('user'))

            const project_response = yield call(api, `/api/projects/${project.id}/tasks/${action.payload.id}`, null, 'delete', user.api_token)

            yield put(actions.activeProject(project_response.data.data))
        }

    } catch (error) {
        console.log(error)
    }
}

export function* watchTaskDelete() {
    yield takeLatest(actions.TASK_DELETE_FLAG, deleteTask)
}


