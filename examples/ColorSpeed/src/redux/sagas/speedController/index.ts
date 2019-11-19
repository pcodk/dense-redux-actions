import { put, select } from 'redux-saga/effects';
import { takeFirst } from '../../../utils';
import { msToUnit } from '../../../utils/variables';

import {
  SC_TOGGLE_MONITORING_REQUEST,
  GEO_LOCATION_SUBSCRIBE_REQUEST,
  GEO_LOCATION_UNSUBSCRIBE_REQUEST,
  GEO_LOCATION_UPDATE_SUCCESS,
  SC_UPDATE_CURRENT_SPEED,
} from '../../actions';

function* processRequests(action: GenericAction) {
  switch (action.type) {
    case GEO_LOCATION_UPDATE_SUCCESS.type: {
      const payload = GEO_LOCATION_UPDATE_SUCCESS.payload(action);
      
      const currentUnit: SpeedUnit = yield select((store: AppState) => store.speedController.speedUnit);
      
      // get speed in correct units
      const speed = (payload.coords.speed || 0) <= 0 ? 0 : payload.coords.speed;
      const transformedSpeed = speed! * msToUnit[currentUnit];
    
      yield put(SC_UPDATE_CURRENT_SPEED.create(transformedSpeed));
      break;
    }

    case SC_TOGGLE_MONITORING_REQUEST.type: {
      const isMonitoring = yield select((store: AppState) => store.speedController.isMonitoringSpeed);
      if (isMonitoring) {
        yield put(GEO_LOCATION_SUBSCRIBE_REQUEST.create(null));
      } else {
        yield put(GEO_LOCATION_UNSUBSCRIBE_REQUEST.create(null));
      }
      break;
    }
    default:
  }
}

export function* speedController() {
  yield takeFirst([SC_TOGGLE_MONITORING_REQUEST.type, 
    GEO_LOCATION_UPDATE_SUCCESS.type
], processRequests);
}
