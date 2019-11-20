import { GeoPosition, GeoError } from 'react-native-geolocation-service';
import {
  GEO_LOCATION_SUCCESS,
  GEO_LOCATION_REQUEST,
  GEO_LOCATION_FAILURE,
  GEO_LOCATION_UPDATE_SUCCESS,
} from '../../actions';

export interface GeoServiceState {
  currentLocation?: GeoPosition;
  error?: GeoError;
  isUpdating: boolean;
  isCollecting: boolean;
}

const initialState: GeoServiceState = {
  currentLocation: undefined,
  error: undefined,
  isUpdating: false,
  isCollecting: false,
};

export function geoService(state: GeoServiceState = initialState, action: GenericAction): GeoServiceState {
  switch (action.type) {
    case GEO_LOCATION_REQUEST.type: {
      return {
        ...state,
        isUpdating: true,
      };
    }
    
    case GEO_LOCATION_UPDATE_SUCCESS.type: {
      const payload = GEO_LOCATION_UPDATE_SUCCESS.payload(action);

      return {
        ...state,
        currentLocation: payload,
        error: undefined,
        isUpdating: false,
      };
    }

    case GEO_LOCATION_SUCCESS.type: {
      const payload = GEO_LOCATION_SUCCESS.payload(action);

      return {
        ...state,
        currentLocation: payload,
        error: undefined,
        isUpdating: false,
      };
    }

    case GEO_LOCATION_FAILURE.type: {
      const payload = GEO_LOCATION_FAILURE.payload(action);

      return {
        ...state,
        error: payload,
        isUpdating: false,
      };
    }
  }

  return state;
}
