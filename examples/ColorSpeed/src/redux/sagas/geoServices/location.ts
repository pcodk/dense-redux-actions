import { eventChannel, EventChannel } from 'redux-saga';
import { take, put, spawn, cancel, cancelled } from 'redux-saga/effects';
import geolocation, { GeoPosition } from 'react-native-geolocation-service';
import { Platform, PermissionsAndroid, ToastAndroid } from 'react-native';

import {
  GEO_LOCATION_SUCCESS,
  GEO_LOCATION_FAILURE,
  GEO_LOCATION_UPDATE_SUCCESS,
  GEO_LOCATION_UPDATE_FAILURE,
  GEO_LOCATION_UNSUBSCRIBE_SUCCESS,
  GEO_LOCATION_PERMISSIONS_FAILURE,
} from '../../actions';

function* hasLocationPermission() {
  if (Platform.OS === 'ios' || (Platform.OS === 'android' && Platform.Version < 23)) {
    return true;
  }

  const hasPermission = yield PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

  if (hasPermission) {
    return true;
  }

  const status = yield PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show('Location permission revoked by user.', ToastAndroid.LONG);
  }

  return false;
}

export function* getCurrentPosition() {
  if (!(yield hasLocationPermission())) {
    return GEO_LOCATION_PERMISSIONS_FAILURE.create('Permissions denied');
  }

  const channel: EventChannel<GenericAction> = eventChannel(emitter => {
    geolocation.getCurrentPosition(
      (location: GeoPosition) => emitter(GEO_LOCATION_SUCCESS.create(location)),
      error => emitter(GEO_LOCATION_FAILURE.create(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 2000, distanceFilter: 10 },
    );

    // Return an unsubscribe method
    return () => {
      console.info('TERMINATED');
    };
  });

  // Wait for response
  const action = yield take(channel);
  channel.close();
  return action;
}

let locationSaga: any;

function* watchLocation() {
  if (!(yield hasLocationPermission())) {
    return GEO_LOCATION_PERMISSIONS_FAILURE.create('Permissions denied');
  }

  let WatchId: number;
  const channel: EventChannel<GenericAction> = eventChannel(emitter => {
    WatchId = geolocation.watchPosition(
      (location: GeoPosition) => emitter(GEO_LOCATION_UPDATE_SUCCESS.create(location)),
      error => emitter(GEO_LOCATION_UPDATE_FAILURE.create(error)),
      { showLocationDialog: true, enableHighAccuracy: true, distanceFilter: 0, interval: 5000, fastestInterval: 2000 },
    );

    // Return an unsubscribe method
    return () => {
      console.info('WATCHER TERMINATED');
    };
  });

  // Wait for response
  try {
    while (true) {
      const action = yield take(channel);
      yield put(action);
    }
  } finally {
    if (yield cancelled()) {
      geolocation.clearWatch(WatchId!);
      geolocation.stopObserving();
      channel.close();
    }
    yield put(GEO_LOCATION_UNSUBSCRIBE_SUCCESS.create(null));
  }
}

export function* locationSubscribe() {
  locationSaga = yield spawn(watchLocation);
}

export function* locationUnSubscribe() {
  yield cancel(locationSaga);
}
