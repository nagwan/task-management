import { all } from 'redux-saga/effects';
import { index, watchShow} from "./modules/projects/sagas"

export default function* root(){
    yield all([
        index(),
        watchShow(),
    ])

}