import { ActionCreator } from 'dense-redux-actions';

export const INITIALIZE = new ActionCreator<boolean>('INITIALIZE');

// Export application actions
export * from './geoServices';
export * from './speedController';