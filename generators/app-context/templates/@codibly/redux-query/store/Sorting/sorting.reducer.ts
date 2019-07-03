import { LOCATION_CHANGE } from 'connected-react-router';
import { AnyAction, Reducer } from 'redux';
import { handleActions } from 'redux-actions';
import { SortingAction } from './Sorting.action';
import { SortingState } from './Sorting.state';

/**
 * Handles sorting actions narrowed to given domain scope
 * @param domain Unique string that describes domain that reducer should listen for (for example USER or COMPANY)
 * @param initialState
 */
export function handleSorting(
  domain: string,
  initialState = SortingState.INITIAL
): Reducer<SortingState, AnyAction> {
  const { CHANGE_SORTING } = SortingAction.createTypes(domain);

  return handleActions(
    {
      [CHANGE_SORTING]: (state, action: SortingAction.ChangeSorting) => action.payload!,
      [LOCATION_CHANGE]: () => initialState
    },
    initialState
  ) as Reducer<SortingState, AnyAction>;
}
