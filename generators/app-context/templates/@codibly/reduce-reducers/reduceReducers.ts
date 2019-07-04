import { Reducer } from 'redux';

/**
 * TODO: move to npm package!!!
 * Reduce reducers to reduce state in sequence.
 */
export function reduceReducers<S>(reducers: Reducer<S, any>[], initialState: S): Reducer<S, any> {
  return (state: S | undefined, action: any): S => {
    return reducers.reduce(
      (reducedState: S, reducer: Reducer<S>) => reducer(reducedState, action),
      state || initialState
    );
  };
}
