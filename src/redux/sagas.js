// @flow
import { all } from 'redux-saga/effects';
import locationSaga from './location/saga';
import chartSaga from './chart/saga';


export default function* rootSaga(getState: any): any {
    yield all([
        locationSaga(),
        chartSaga()
  
    ]);
}
