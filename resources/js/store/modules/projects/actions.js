export const PROJECTS_INDEX = 'PROJECTS_INDEX'
export const PROJECT_SHOW_FLAG = 'PROJECT_SHOW_FLAG'
export const PROJECT_SHOW = 'PROJECT_SHOW'
export const PROJECT_STORE_FLAG = 'PROJECT_STORE_FLAG'
export const PROJECT_STORE = 'PROJECT_STORE'

export function projectsIndex(payload) {
    return { type: PROJECTS_INDEX, payload: payload }
}

export function projectShowFlag(payload) {
    return { type: PROJECT_SHOW_FLAG, payload: payload }
}

export function projectShow(payload) {
    return { type: PROJECT_SHOW, payload: payload }
}

export function projectStoreFlag(payload) {
    return { type: PROJECT_STORE_FLAG, payload }
}

export function projectStore(payload) {
    return { type: PROJECT_STORE, payload }
}


