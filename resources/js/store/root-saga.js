import { all } from 'redux-saga/effects';
import { watchIndex, watchShow, watchStore, watchTaskStore } from "./modules/projects/sagas"
import { watchRegistration, watchLogin, watchFetchUser } from './modules/authentication/sagas'

export default function* root() {
    yield all([
        watchIndex(),
        watchShow(),
        watchStore(),
        watchRegistration(),
        watchLogin(),
        watchFetchUser(),
        watchTaskStore()
    ])

}