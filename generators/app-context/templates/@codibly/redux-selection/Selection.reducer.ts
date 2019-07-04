import { LOCATION_CHANGE } from 'connected-react-router';
import { AnyAction, Reducer } from 'redux';
import { handleActions } from 'redux-actions';
import { AsyncAction, handleAsync } from '@codibly/redux-async';
import { reduceReducers } from '@codibly/reduce-reducers/reduceReducers';
import { SelectionAction } from './Selection.action';
import { SelectionState } from './Selection.state';
import {PaginatedResponse} from '@codibly/redux-query';

/**
 * Handles async resolved actions where we get updated selection data
 * @param type Async action type (for example LIST_USERS)
 * @param initialState
 */
export function handleSelectionAsync<T = any>(
  type: string,
  initialState = SelectionState.INITIAL
): Reducer<SelectionState, AnyAction> {
  return handleAsync<SelectionState>(
    type,
    {
      resolved: (state, { payload }: AsyncAction<PaginatedResponse<T[]>>) =>
        payload && payload.data
          ? state.filter((id) => (payload.data || []).some((row: any) => row.id === id))
          : initialState,
      rejected: () => initialState
    },
    initialState
  );
}

/**
 * Handles selection actions narrowed to given domain scope
 * @param domain Unique string that describes domain that reducer should listen for (for example USER or COMPANY)
 * @param initialState
 */
export function handleSelectionActions<T = any>(
  domain: string,
  initialState = SelectionState.INITIAL
): Reducer<SelectionState<T>, AnyAction> {
  const { CHANGE_SELECTION } = SelectionAction.createTypes(domain);

  return handleActions(
    {
      [CHANGE_SELECTION]: (state, action: SelectionAction.ChangeSelection) => action.payload!,
      [LOCATION_CHANGE]: () => initialState
    },
    initialState
  ) as Reducer<SelectionState, AnyAction>;
}

/**
 * Handles both selection actions and async resolved actions.
 *
 * @param domain Unique string that describes domain that reducer should listen for (for example USER or COMPANY)
 * @param types Async action type(s) (for example LIST_USERS or [LIST_USERS, LIST_ADMIN_USERS])
 * @param initialState
 */
export function handleSelection<T = any>(
  domain: string,
  types: string | string[] = [],
  initialState = SelectionState.INITIAL
): Reducer<SelectionState<T>, AnyAction> {
  if (!Array.isArray(types)) {
    types = [types];
  }

  return reduceReducers(
    [
      handleSelectionActions(domain, initialState),
      ...types.map((type) => handleSelectionAsync(type, initialState))
    ],
    initialState
  );
}
