import { all } from 'redux-saga/effects';
import { geoService } from './geoServices';
import { speedController } from './speedController';

function* rootSaga() {
  yield all([
    geoService(),
    speedController(),
  ]);
}

export default rootSaga;