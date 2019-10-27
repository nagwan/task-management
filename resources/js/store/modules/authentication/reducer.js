import { IS_AUTHORIZED, AUTH_USER } from './actions'


const INITIAL_STATE =  {
    is_auth: false,
    user: {}
}

export default function reducer(state = INITIAL_STATE, action){
    switch (action.type) {
        case IS_AUTHORIZED:
            return {...state, is_auth: action.payload}
        case AUTH_USER:
            return {...state, user: action.payload}
            
        default:
                return state
    }
}