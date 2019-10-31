import { call, put, takeLatest } from 'redux-saga/effects';
import { REGISTRATION_FLAG, isAuthorized, authUser, LOGIN_FLAG, fetchUserFlag, FETCH_USER_FLAG } from './actions'
import { api } from '../../../helpers/functions'


export function* register(action) {

    try {

        const response = yield call(api, `api/register`, action.payload.data, 'POST')

        if (response.data.success) {

            yield action.payload.history.push(`/login`)

        } else {

            console.log(response, 'response error')
        }

    } catch (error) {

        console.log(error, 'catch error') 
    }
}

export function* watchRegistration() {
    yield takeLatest(REGISTRATION_FLAG, register)
}


export function* login(action) {

    try {

        const response = yield call(api, `api/login`, action.payload.data, 'POST')

        if (response.data.success) {

            yield put(isAuthorized(true))

            yield put(fetchUserFlag({ history: action.payload.history, token: response.data.data.api_token }))

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

        const response = yield call(api, `api/user`, null, 'POST', action.payload.token)

        console.log(response, 'fetch user response')
        
        localStorage.setItem('token', JSON.stringify(response.data.user.api_token))

        yield put(authUser(response.data.user))

        yield action.payload.history.push(`/me/${response.data.user.id}`)

    } catch (error) {

        console.log(error)
    }

}

export function* watchFetchUser() {
    yield takeLatest(FETCH_USER_FLAG, fetchUser)
}