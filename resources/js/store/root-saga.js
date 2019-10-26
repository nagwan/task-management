import { all } from 'redux-saga/effects';
import { watchIndex, watchShow, watchStore} from "./modules/projects/sagas"

export default function* root(){
    yield all([
        watchIndex(),
        watchShow(),
        watchStore()
    ])

}