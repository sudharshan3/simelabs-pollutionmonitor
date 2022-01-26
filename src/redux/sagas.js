// @flow
import { all } from 'redux-saga/effects';
import locationSaga from './location/saga';


export default function* rootSaga(getState: any): any {
    yield all([
        locationSaga(),
  
    ]);
}
