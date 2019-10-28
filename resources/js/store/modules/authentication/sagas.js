import { call, put, takeLatest } from 'redux-saga/effects';
import { REGISTRATION_FLAG, isAuthorized, authUser, LOGIN_FLAG, fetchUserFlag, FETCH_USER_FLAG } from './actions'
import { api } from '../../../helpers/functions'


export function* register(action) {

    try {

        const response = yield call(api, `api/register`, action.payload.data, 'POST')

        console.log(response.data, 'registration response')

        if (response.data.token) {

            localStorage.setItem('token', response.data.token)

            yield put(isAuthorized(true))

            yield put(fetchUserFlag({ history: action.payload.history }))

        } else {

            console.log(response, 'response error')
        }

    } catch (error) {

        console.log(error, 'catch error') // this what prints in the console
    }
}

export function* watchRegistration() {
    yield takeLatest(REGISTRATION_FLAG, register)
}


export function* login(action) {
    try {

        const response = yield call(api, `api/login`, action.payload.data, 'POST')
        console.log(response.data, 'login')

        return

        if (response.data) {

            console.log(response.data.user, 'login')

            localStorage.setItem('token', response.data.token)

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


export function* fetchUser(action) {
    try {

        const response = yield call(api, `/user`, null, 'get')

        console.log(response, 'fetch user response')

        //yield put(authUser(response.data.user))

        //yield action.payload.history.push(`/me/${response.data.user.id}`)

    } catch (error) {
        console.log(error)
    }

}

export function* watchFetchUser() {
    yield takeLatest(FETCH_USER_FLAG, fetchUser)
}