import { Middleware } from 'redux';
import { isActionAfter, isActionAsync } from './Async.action';
import { AsyncSelector } from './Async.selector';

/**
 * Redux middleware that blocks actions that are not in proper chronology (to prevent race conditions)
 */
export function asyncMiddleware(): Middleware {
  return ({ dispatch, getState }) => (next) => (action) => {
    if (!isActionAsync(action)) {
      // pass non-async actions
      return next(action);
    }

    const timestamp = AsyncSelector.getTimestamp(action.type)(getState());
    const isAfter = isActionAfter(action, timestamp);

    if (isAfter || isAfter === undefined) {
      // pass async action if is in order or if it's impossible to detect
      return next(action);
    }

    // block async actions not in order (race condition)
  };
}
