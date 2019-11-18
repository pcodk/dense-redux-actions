import { takeLatest, put, call } from 'redux-saga/effects';
import { GEO_LOCATION_REQUEST, GEO_LOCATION_SUBSCRIBE_REQUEST, GEO_LOCATION_UNSUBSCRIBE_REQUEST } from '../../actions';
import { getCurrentPosition, locationSubscribe, locationUnSubscribe } from './location';

function* processRequests(action: GenericAction) {
  switch (action.type) {
    case GEO_LOCATION_REQUEST.type: {
      yield put(yield getCurrentPosition());
      break;
    }
    case GEO_LOCATION_SUBSCRIBE_REQUEST.type: {
      yield call(locationSubscribe);
      break;
    }
    case GEO_LOCATION_UNSUBSCRIBE_REQUEST.type: {
      yield call(locationUnSubscribe);
      break;
    }

    default:
  }
}

export function* geoService() {
  yield takeLatest(
    [GEO_LOCATION_REQUEST.type, GEO_LOCATION_SUBSCRIBE_REQUEST.type, GEO_LOCATION_UNSUBSCRIBE_REQUEST.type],
    processRequests,
  );
}
