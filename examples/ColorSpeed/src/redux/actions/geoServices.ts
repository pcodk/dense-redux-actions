import { ActionCreator } from 'dense-redux-actions';
import { GeoPosition, GeoError } from 'react-native-geolocation-service';

// Action creators for interacting with GEO services
export const GEO_LOCATION_PERMISSIONS_FAILURE = new ActionCreator<string>('GEO_LOCATION_PERMISSIONS_FAILURE');

// For pulling a single Geolocation on demand.
export const GEO_LOCATION_REQUEST = new ActionCreator<null>('GEO_LOCATION_REQUEST');
export const GEO_LOCATION_SUCCESS = new ActionCreator<GeoPosition>('GEO_LOCATION_SUCCESS');
export const GEO_LOCATION_FAILURE = new ActionCreator<GeoError>('GEO_LOCATION_FAILURE');

// For subscribing to changes in location.
export const GEO_LOCATION_SUBSCRIBE_REQUEST = new ActionCreator<null>('GEO_LOCATION_SUBSCRIBE_REQUEST');
export const GEO_LOCATION_SUBSCRIBE_SUCCESS = new ActionCreator<GeoPosition>('GEO_LOCATION_SUBSCRIBE_SUCCESS');
export const GEO_LOCATION_SUBSCRIBE_FAILURE = new ActionCreator<string>('GEO_LOCATION_SUBSCRIBE_FAILURE');

export const GEO_LOCATION_UNSUBSCRIBE_REQUEST = new ActionCreator<null>('GEO_LOCATION_UNSUBSCRIBE_REQUEST');
export const GEO_LOCATION_UNSUBSCRIBE_SUCCESS = new ActionCreator<null>('GEO_LOCATION_UNSUBSCRIBE_SUCCESS');

// For watching location 
export const GEO_LOCATION_UPDATE_SUCCESS = new ActionCreator<GeoPosition>('GEO_LOCATION_UPDATE_SUCCESS');
export const GEO_LOCATION_UPDATE_FAILURE = new ActionCreator<GeoError>('GEO_LOCATION_UPDATE_FAILURE');
