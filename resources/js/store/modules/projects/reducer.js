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
        default:
            return state;
    }
}