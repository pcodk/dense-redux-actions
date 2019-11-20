import React, { PureComponent } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './redux/reducers';
import rootSaga from './redux/sagas';
import SpeedMonitor from './containers/SpeedMonitor';

import { INITIALIZE, SC_TOGGLE_MONITORING_REQUEST } from './redux/actions';

const middlewares: any[] = [];
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

const middleware = __DEV__
  ? composeWithDevTools({
      name: 'ApplicationName',
      // wrap action creator for use in React Native Debugger dispatcher.
      actionCreators: {
        [INITIALIZE.type]: payload => INITIALIZE.create(payload),
        // or
        ...SC_TOGGLE_MONITORING_REQUEST.destruct(),
      },
    })(applyMiddleware(...middlewares))
  : applyMiddleware(...middlewares);

const store = createStore(reducer, middleware);

sagaMiddleware.run(rootSaga);

store.dispatch(INITIALIZE.create(true));

export default class App extends PureComponent {
  public render() {
    return (
      <Provider store={store}>
        <SpeedMonitor />
      </Provider>
    );
  }
}
