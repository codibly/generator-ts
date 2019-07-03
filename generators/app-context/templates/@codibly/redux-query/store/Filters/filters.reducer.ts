import { LOCATION_CHANGE } from 'connected-react-router';
import { AnyAction, Reducer } from 'redux';
import { handleActions } from 'redux-actions';
import { FiltersAction } from './Filters.action';
import { FiltersState } from './Filters.state';

/**
 * Handles filter actions narrowed to given domain scope
 * @param domain Unique string that describes domain that reducer should listen for (for example USER or COMPANY)
 * @param initialState
 */
export function handleFilters(
  domain: string,
  initialState = FiltersState.INITIAL
): Reducer<FiltersState, AnyAction> {
  const { SET_FILTERS, CHANGE_FILTERS, CHANGE_FILTER, REMOVE_FILTER } = FiltersAction.createTypes(
    domain
  );

  return handleActions(
    {
      [SET_FILTERS]: (state, action: FiltersAction.SetFilters) => action.payload!,
      [CHANGE_FILTERS]: (state, action: FiltersAction.ChangeFilters) => ({
        ...state,
        ...action.payload!
      }),
      [CHANGE_FILTER]: (state, action: FiltersAction.ChangeFilter) => ({
        ...state,
        [action.payload!.field]: action.payload!.value
      }),
      [REMOVE_FILTER]: (state, action: FiltersAction.RemoveFilter) =>
        Object.keys(state)
          .filter((field) => field !== action.payload!.field)
          .reduce(
            (filters, field) => ({
              ...filters,
              [field]: state[field]
            }),
            {}
          ),
      [LOCATION_CHANGE]: () => initialState
    },
    initialState
  ) as Reducer<FiltersState, AnyAction>;
}
