import { combineReducers } from 'redux';
import { geoService } from './geoService';
import { speedController } from './speedController/index';

const rootReducer = combineReducers({
  geoService,
  speedController,
});

export type RootReducerType = ReturnType<typeof rootReducer>;

export default rootReducer;