import { all } from 'redux-saga/effects';
import { index, watchShow, watchStore} from "./modules/projects/sagas"

export default function* root(){
    yield all([
        index(),
        watchShow(),
        watchStore()
    ])

}