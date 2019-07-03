import { AnyAction } from 'redux';
import { Action, BaseAction } from 'redux-actions';
import { ThunkAction } from 'redux-thunk';

export interface ChronologicalAction extends BaseAction {
  timestamp?: number;
}

export interface AsyncAction<P = any, M = any> extends Action<P>, ChronologicalAction {
  async: true;
  meta?: M;
  pending?: boolean;
}

export interface AsyncActionCreator<P = any, M = any> {
  pending: (meta?: M, timestamp?: number) => AsyncAction<P, M>;
  resolved: (payload?: P, meta?: M, timestamp?: number) => AsyncAction<P, M>;
  rejected: (payload?: any, meta?: M, timestamp?: number) => AsyncAction<P, M>;
}

export function createAsyncActions<P = any, M = any>(type: string): AsyncActionCreator<P, M> {
  return {
    pending: (meta?: M, timestamp = Date.now()) => ({
      type,
      meta,
      async: true,
      pending: true,
      timestamp
    }),
    resolved: (payload?: P, meta?: M, timestamp = undefined) => ({
      type,
      payload,
      meta,
      async: true,
      resolved: true,
      timestamp
    }),
    rejected: (payload?: any, meta?: M, timestamp = undefined) => ({
      type,
      payload,
      meta,
      async: true,
      error: true,
      rejected: true,
      timestamp
    })
  };
}

export function isChronologicalAction(action: any): action is ChronologicalAction {
  return !!(action && action.timestamp);
}

export function isActionPending(action: any): action is AsyncAction {
  return action && !!action.pending;
}

export function isActionRejected(action: any): action is AsyncAction {
  return action && !!action.rejected;
}

export function isActionResolved(action: any): action is AsyncAction {
  return action && !!action.resolved;
}

export function isActionAfter(action: any, timestamp?: number): action is AsyncAction {
  return (
    !timestamp || !!(action && action.async && action.timestamp && action.timestamp >= timestamp)
  );
}

export function isActionAsync(action: any): action is AsyncAction {
  return !!(action && action.async);
}

export function isActionFulfilled(action: any): boolean {
  return isActionResolved(action) && action.payload !== undefined && action.payload !== null;
}

export function async<T, M = any>(
  type: string,
  promise: Promise<T>,
  meta?: M,
  timestamp = Date.now()
): ThunkAction<Promise<T>, any, any, AnyAction> {
  const { pending, resolved, rejected } = createAsyncActions<T, M>(type);
  return (dispatch) => {
    dispatch(pending(meta, timestamp));

    return promise
      .then((data) => {
        dispatch(resolved(data, meta, timestamp));
        return data;
      })
      .catch((error) => {
        dispatch(rejected(error, meta, timestamp));
        throw error;
      });
  };
}
