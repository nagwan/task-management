import { all } from 'redux-saga/effects';
import { watchIndex, watchShow, watchStore, watchTaskStore, watchTaskUpdate, watchUpdate, watchFetchProject, watchDeleteProject } from "./modules/projects/sagas"
import { watchRegistration, watchLogin, watchFetchUser, watchLogOut } from './modules/authentication/sagas'

export default function* root() {
    yield all([
        watchIndex(),
        watchFetchProject(),
        watchStore(),
        watchRegistration(),
        watchLogin(),
        watchFetchUser(),
        watchTaskStore(),
        watchTaskUpdate(),
        watchUpdate(),
        watchDeleteProject(),
        watchLogOut()
    ])

}