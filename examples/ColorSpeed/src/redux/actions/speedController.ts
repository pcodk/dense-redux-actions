import { ActionCreator } from 'dense-redux-actions';

// Action creators for interacting with GEO services
export const SC_SET_SPEED_LIMIT = new ActionCreator<string>('SC_SET_SPEED_LIMIT');
export const SC_SET_SPEED_UNIT = new ActionCreator<SpeedUnit>('SC_SET_SPEED_UNIT');
export const SC_TOGGLE_MONITORING_REQUEST = new ActionCreator<null>('SC_TOGGLE_MONITORING_REQUEST');
export const SC_UPDATE_CURRENT_SPEED = new ActionCreator<number>('SC_UPDATE_CURRENT_SPEED');
