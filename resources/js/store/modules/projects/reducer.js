import { PROJECTS_INDEX, PROJECT_SHOW, PROJECT_STORE } from './actions'


const INITIAL_STATE = {
    projects: [],
    project: {}
}

export default function reducer (state = INITIAL_STATE, action){
    switch (action.type) {
        case PROJECTS_INDEX:
            return {...state, projects: action.payload}
        case PROJECT_SHOW:
            return {...state, project: action.payload}
        case PROJECT_STORE:
            return {...state, projects: [...state.projects, action.payload]}
        default:
            return state;
    }
}