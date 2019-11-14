export const PROJECTS_INDEX_FLAG = 'PROJECTS_INDEX_FLAG'
export const PROJECTS_INDEX = 'PROJECTS_INDEX'
export const PROJECT_SHOW_FLAG = 'PROJECT_SHOW_FLAG'
export const ACTIVE_PROJECT = 'ACTIVE_PROJECT'
export const PROJECT_STORE_FLAG = 'PROJECT_STORE_FLAG'
//export const PROJECT_STORE = 'PROJECT_STORE'
export const PROJECT_UPDATE_FLAG = 'PROJECT_UPDATE_FLAG'
export const ACTIVE_PROJECT_FETCH_FLAG = 'ACTIVE_PROJECT_FETCH_FLAG'
export const DELETE_PROJECT_FLAG = 'DELETE_PROJECT_FLAG'


export function projectsIndexFlag(payload) {
    return { type: PROJECTS_INDEX_FLAG }
}

export function projectsIndex(payload) {
    return { type: PROJECTS_INDEX, payload: payload }
}

export function projectShowFlag(payload) {
    return { type: PROJECT_SHOW_FLAG, payload: payload }
}

export function activeProject(payload) {
    return { type: ACTIVE_PROJECT, payload: payload }
}

export function projectStoreFlag(payload) {
    return { type: PROJECT_STORE_FLAG, payload }
}

// export function projectStore(payload) {
//     return { type: PROJECT_STORE, payload }
// }

export function projectUpdateFlag(payload) {
    return { type: PROJECT_UPDATE_FLAG, payload }
}

export function activeProjectFetchFlag(payload) {
    return { type: ACTIVE_PROJECT_FETCH_FLAG, payload }
}

export function deleteProjectFlag(payload) {
    return { type: DELETE_PROJECT_FLAG, payload }
}

/**
 * project`s tasks  
 */

export const TASK_STORE_FLAG = 'TASK_STORE_FLAG'
export const TASK_STORE = 'TASK_STORE'
export const UPDATE_PROJECT_TASKS = 'UPDATE_PROJECT_TASKS'
export const TASK_UPDATE_FLAG = 'TASK_UPDATE_FLAG'

export function taskStoreFlag(payload) {
    return { type: TASK_STORE_FLAG, payload }
}

export function taskStore(payload) {
    return { type: TASK_STORE, payload }
}

export function updateProjectTasks(payload) {
    return { type: UPDATE_PROJECT_TASKS, payload }
}

export function updateTaskFlag(payload) {
    return { type: TASK_UPDATE_FLAG, payload }
}