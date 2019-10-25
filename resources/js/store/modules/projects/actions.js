export const PROJECTS_INDEX = 'PROJECTS_INDEX'
export const PROJECT_SHOW_FLAG = 'PROJECT_SHOW_FLAG'
export const PROJECT_SHOW = 'PROJECT_SHOW'

export function projectsIndex(payload){
    return {type:INDEX, payload: payload }
}

export function projectShowFlag(payload){
    return {type: SHOW_FLAG, payload: payload}
}

export function projectShow(payload){
    return {type: SHOW, payload: payload}
}


