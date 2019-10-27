import { call, put, takeLatest } from 'redux-saga/effects';
import { REGISTRATION_FLAG, isAuthorized, authUser, LOGIN_FLAG } from './actions'
import { api } from '../../../helpers/functions'


export function* register(action) {
    try {

        const response = yield call(api, `api/register`, action.payload.data, 'POST')

        if (response.data) {

            yield put(isAuthorized(true))

            yield put(authUser(response.data.user))

            yield action.payload.history.push(`/me/${response.data.user.id}`)

        } else {

            console.log(response.error)
        }

    } catch (error) {

        console.log(error)
    }
}

export function* watchRegistration() {
    yield takeLatest(REGISTRATION_FLAG, register)
}



export function* login(action) {
    try {

        const response = yield call(api, `api/login`, action.payload.data, 'POST')
        
        console.log(response)

        if (response.data) {

            yield put(isAuthorized(true))

            yield put(authUser(response.data.user))

            yield action.payload.history.push(`/me/${response.data.user.id}`)

        } else {

            console.log(response.error)
        }

    } catch (error) {

        console.log(error)
    }
}

export function* watchLogin() {
    yield takeLatest(LOGIN_FLAG, login)
}