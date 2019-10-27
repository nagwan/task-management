export const REGISTRATION_FLAG = 'REGISTRATION_FLAG'
export const IS_AUTHORIZED = 'IS_AUTHORIZED'
export const AUTH_USER = 'AUTH_USER'

export function registrationFlag(payload){
    return {type: REGISTRATION_FLAG, payload: payload}
}

export function isAuthorized(payload){
    return {type: IS_AUTHORIZED, payload: payload}
}

export function authUser(payload){
    return { type: AUTH_USER, payload}
}
