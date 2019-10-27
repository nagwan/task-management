import { call, put, takeLatest } from 'redux-saga/effects';
import { REGISTRATION_FLAG, isAuthorized, authUser } from './actions'
import { api } from '../../../helpers/functions'


export function* register(action) {
    try {

        const response = yield call(api, `api/register`, action.payload.data, 'POST')

        yield put(isAuthorized(true))

        yield put(authUser(response.data.user))

        yield action.payload.history.push(`/me/${response.data.user.id}`)

    } catch (error) {

        console.log(error)
    }
}

export function* watchRegistration() {
    yield takeLatest(REGISTRATION_FLAG, register)
}