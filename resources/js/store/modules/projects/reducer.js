import { PROJECTS_INDEX, ACTIVE_PROJECT, UPDATE_PROJECT_TASKS } from './actions'


const INITIAL_STATE = {
    projects: [],
    project: {}
}

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case PROJECTS_INDEX:
            return { ...state, projects: action.payload }
        case ACTIVE_PROJECT:
            return { ...state, project: action.payload }
        case UPDATE_PROJECT_TASKS: // not used anymore 
            return { ...state, project: Object.assign({}, state.project, {tasks: action.payload}) }
        default:
            return state;
    }
}