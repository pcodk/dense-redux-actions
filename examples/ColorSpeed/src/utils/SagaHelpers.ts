// Custom saga helpers
import { take, call, fork } from 'redux-saga/effects';

export function* takeFirst(pattern: any, saga: any, ...args: any) {
  const task = yield fork(function*() {
    while (true) {
      const action = yield take(pattern);
      yield call(saga, ...args.concat(action));
    }
  });
  
  return task;
}
