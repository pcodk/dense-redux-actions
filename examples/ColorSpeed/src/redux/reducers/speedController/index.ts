import {
  SC_TOGGLE_MONITORING_REQUEST,
  SC_SET_SPEED_LIMIT,
  SC_SET_SPEED_UNIT,
  GEO_LOCATION_UNSUBSCRIBE_SUCCESS,
  SC_UPDATE_CURRENT_SPEED,
} from '../../actions';
import { speedLimits, speedUnits } from '../../../utils/variables';

export interface SpeedControllerState {
  currentSpeed: number;
  selectedSpeedLimit: string;
  speedUnit: SpeedUnit;
  isMonitoringSpeed: boolean;
}

const initialState: SpeedControllerState = {
  currentSpeed: 0,
  selectedSpeedLimit: speedLimits[speedUnits[0]][0],
  speedUnit: speedUnits[0],
  isMonitoringSpeed: false,
};

export function speedController(
  state: SpeedControllerState = initialState,
  action: GenericAction,
): SpeedControllerState {
  switch (action.type) {
    case SC_SET_SPEED_LIMIT.type: {
      const payload = SC_SET_SPEED_LIMIT.payload(action);
      return {
        ...state,
        selectedSpeedLimit: payload,
      };
    }
    case SC_SET_SPEED_UNIT.type: {
      const payload = SC_SET_SPEED_UNIT.payload(action);
      return {
        ...state,
        speedUnit: payload,
      };
    }
    case SC_TOGGLE_MONITORING_REQUEST.type: {
      return {
        ...state,
        isMonitoringSpeed: !state.isMonitoringSpeed,
      };
    }

    case SC_UPDATE_CURRENT_SPEED.type: {
      const payload = SC_UPDATE_CURRENT_SPEED.payload(action);
      return {
        ...state,
        currentSpeed: payload,
      };
    }

    case GEO_LOCATION_UNSUBSCRIBE_SUCCESS.type: {
      return {
        ...state,
        isMonitoringSpeed: false,
      };
    }
  }

  return state;
}
