import { PROJECTS_INDEX, ACTIVE_PROJECT, PROJECT_STORE, UPDATE_PROJECT_TASKS } from './actions'


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
        case PROJECT_STORE:
            return { ...state, projects: action.payload } // to be edited to just add the new project after the back-end fix
        case UPDATE_PROJECT_TASKS:
            return { ...state, project: Object.assign({}, state.project, {tasks: action.payload}) }
        default:
            return state;
    }
}