import { call, put, takeLatest } from 'redux-saga/effects';
import { REGISTRATION_FLAG, authUser, LOGIN_FLAG, FETCH_USER_FLAG, isAuthorized, LOG_OUT_FLAG } from './actions'
import { api, checkAuthUser } from '../../../helpers/functions'
import { index } from '../projects/sagas'


export function* register(action) {

    try {

        const response = yield call(api, `api/register`, action.payload.values, 'POST')

        localStorage.setItem('user', JSON.stringify(response.data.data))

        yield put(isAuthorized(true))

        yield put(authUser(response.data.data))

        yield action.payload.history.push(`/projects`)

    } catch (error) {

        console.log(error, 'catch error')
    }
}

export function* watchRegistration() {
    yield takeLatest(REGISTRATION_FLAG, register)
}


export function* login(action) {

    try {

        const response = yield call(api, `api/login`, action.payload.values, 'POST')

        localStorage.setItem('user', JSON.stringify(response.data.data))

        yield put(isAuthorized(true))

        yield put(authUser(response.data.data))

        yield index();

        yield action.payload.history.push(`/projects`)

    } catch (error) {

        console.log(error)
    }
}

export function* watchLogin() {

    yield takeLatest(LOGIN_FLAG, login)
}


export function* fetchUser(action) {

    try {

        const response = yield call(api, `api/user`, null, 'POST', action.payload.token)

        localStorage.setItem('user', JSON.stringify(response.data.user))

        yield put(isAuthorized(true))

        yield put(authUser(response.data.user))

        yield action.payload.history.push(`/projects`)

    } catch (error) {

        console.log(error)
    }
}

export function* watchFetchUser() {
    if (checkAuthUser()) {
        yield put(isAuthorized(true))
        yield put(authUser(JSON.parse(localStorage.getItem('user'))))
    } else {
        yield takeLatest(FETCH_USER_FLAG, fetchUser)
    }
}

export function* logout(action) {

    try {
        if (localStorage.getItem('user') != null) {
            let user = JSON.parse(localStorage.getItem('user'))

            yield call(api, `/api/logout`, null, 'POST', user.api_token)

            localStorage.removeItem('user')
            yield put(isAuthorized(false))
            yield put(authUser({}))
        }
        
    } catch (error) {
        console.log(error)
    }
}


export function* watchLogOut() {
    yield takeLatest(LOG_OUT_FLAG, logout)
}