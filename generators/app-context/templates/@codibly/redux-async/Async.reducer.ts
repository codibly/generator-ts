import { Action, AnyAction, Reducer } from 'redux';
import { AsyncAction, isActionPending, isActionRejected, isActionResolved } from './Async.action';
import {
  AsyncErrorMap,
  AsyncMountedState,
  AsyncState,
  AsyncStatus,
  AsyncStatusMap,
  AsyncTimestampMap
} from './Async.state';

type WrappedReducer<S = any, A extends Action = AnyAction> = (state: S, action: A) => S;

export function asyncErrorMapReducer(state: AsyncErrorMap = {}, action: Action): AsyncErrorMap {
  if (isActionRejected(action)) {
    return { ...state, [action.type]: action.payload };
  }
  return state;
}

export function asyncStatusMapReducer(state: AsyncStatusMap = {}, action: Action): AsyncStatusMap {
  if (isActionPending(action)) {
    return { ...state, [action.type]: AsyncStatus.PENDING };
  } else if (isActionResolved(action)) {
    return { ...state, [action.type]: AsyncStatus.RESOLVED };
  } else if (isActionRejected(action)) {
    return { ...state, [action.type]: AsyncStatus.REJECTED };
  }

  return state;
}

export function asyncTimestampMapReducer(
  state: AsyncTimestampMap = {},
  action: Action
): AsyncTimestampMap {
  if (isActionPending(action) && action.timestamp) {
    return { ...state, [action.type]: action.timestamp };
  }

  return state;
}

export function asyncReducer(state: Partial<AsyncMountedState> = {}, action: Action): AsyncState {
  return {
    ...state,
    status: state ? asyncStatusMapReducer(state.status, action) : {},
    errors: state ? asyncErrorMapReducer(state.errors, action) : {},
    timestamp: state ? asyncTimestampMapReducer(state.timestamp, action) : {}
  };
}

export function handlePending<S>(
  type: string,
  reducer: WrappedReducer<S, AsyncAction>,
  initialState: S
): Reducer<S> {
  return (state: S = initialState, action: any) =>
    action.type === type && isActionPending(action) ? reducer(state, action) : state;
}

// tslint:disable-next-line
export function handleResolved<S>(
  type: string | string[],
  reducer: WrappedReducer<S, AsyncAction>,
  initialState: S
): Reducer<S> {
  return (state = initialState, action) => {
    if (Array.isArray(type)) {
      return type.indexOf(action.type) !== -1 && isActionResolved(action)
        ? reducer(state, action)
        : state;
    } else {
      return action.type === type && isActionResolved(action) ? reducer(state, action) : state;
    }
  };
}

export function handleRejected<S>(
  type: string,
  reducer: WrappedReducer<S, AsyncAction>,
  initialState: S
): Reducer<S> {
  return (state: S = initialState, action: any) =>
    action.type === type && isActionRejected(action) ? reducer(state, action) : state;
}

type AsyncReducersMap<S> = {
  pending?: WrappedReducer<S, AsyncAction>;
  resolved?: WrappedReducer<S, AsyncAction>;
  rejected?: WrappedReducer<S, AsyncAction>;
};

// disable tslint - it will be in the async package in the near future
// tslint:disable-next-line
export function handleAsync<S>(
  types: string | string[],
  reducers: AsyncReducersMap<S>,
  initialState: S
): Reducer<S> {
  return (state: S = initialState, action: any) => {
    if (typeof types === 'string') {
      types = [types];
    }

    return types.reduce((reducedState, type) => {
      if (action.type !== type) {
        return reducedState;
      }

      if (reducers.pending && isActionPending(action)) {
        return reducers.pending(reducedState, action);
      } else if (reducers.resolved && isActionResolved(action)) {
        return reducers.resolved(reducedState, action);
      } else if (reducers.rejected && isActionRejected(action)) {
        return reducers.rejected(reducedState, action);
      }

      return reducedState;
    }, state);
  };
}
