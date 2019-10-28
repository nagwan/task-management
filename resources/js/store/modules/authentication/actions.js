export const REGISTRATION_FLAG = 'REGISTRATION_FLAG'
export const IS_AUTHORIZED = 'IS_AUTHORIZED'
export const AUTH_USER = 'AUTH_USER'
export const LOGIN_FLAG = 'LOGIN_FLAG'
export const FETCH_USER_FLAG = 'FETCH_USER_FLAG'

export function registrationFlag(payload){
    return {type: REGISTRATION_FLAG, payload: payload}
}

export function loginFlag(payload){
    return {type: LOGIN_FLAG, payload}
}

export function isAuthorized(payload){
    return {type: IS_AUTHORIZED, payload: payload}
}

export function fetchUserFlag(payload){
    return {type: FETCH_USER_FLAG, payload}
}

export function authUser(payload){
    return { type: AUTH_USER, payload}
}

