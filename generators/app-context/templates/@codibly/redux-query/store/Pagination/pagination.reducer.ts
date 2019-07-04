import { AsyncAction } from '@codibly/redux-async/Async.action';
import { handleResolved } from '@codibly/redux-async/Async.reducer';
import { reduceReducers } from '@codibly/reduce-reducers/reduceReducers';
import { LOCATION_CHANGE } from 'connected-react-router';
import { AnyAction, Reducer } from 'redux';
import { handleActions } from 'redux-actions';
import { PaginatedResponse } from '../../model/PaginatedResponse';
import { FiltersAction } from '../Filters/Filters.action';
import { PaginationAction } from './Pagination.action';
import { PaginationState } from './Pagination.state';

/**
 * Handles async resolved actions where we get updated pagination data
 * @param type Async action type (for example LIST_USERS)
 * @param initialState
 */
export function handlePaginationAsync(
  type: string,
  initialState = PaginationState.INITIAL
): Reducer<PaginationState, AnyAction> {
  return handleResolved<PaginationState>(
    type,
    (state, { payload }: AsyncAction<PaginatedResponse<any>>) =>
      payload && payload.pagination
        ? {
            ...state,
            page: payload.pagination.page || 1,
            count: payload.pagination.count || 0
          }
        : state,
    initialState
  );
}

/**
 * Handles pagination actions narrowed to given domain scope
 * @param domain Unique string that describes domain that reducer should listen for (for example USER or COMPANY)
 * @param initialState
 */
export function handlePaginationActions(
  domain: string,
  initialState = PaginationState.INITIAL
): Reducer<PaginationState, AnyAction> {
  const { CHANGE_PAGE, CHANGE_PER_PAGE } = PaginationAction.createTypes(domain);

  return handleActions(
    {
      [CHANGE_PAGE]: (state, action: PaginationAction.ChangePageAction) => ({
        ...state,
        page: action.payload! || state.page
      }),
      [CHANGE_PER_PAGE]: (state, action: PaginationAction.ChangePerPageAction) => ({
        ...state,
        perPage: action.payload! || state.perPage
      }),
      [LOCATION_CHANGE]: () => initialState
    },
    initialState
  ) as Reducer<PaginationState, AnyAction>;
}

/**
 * Handles filter actions narrowed to given domain scope (resets page to first if there is some filter change)
 * @param domain Unique string that describes domain that reducer should listen for (for example USER or COMPANY)
 * @param initialState
 */
export function handleFilterActions(
  domain: string,
  initialState = PaginationState.INITIAL
): Reducer<PaginationState, AnyAction> {
  const { SET_FILTERS, CHANGE_FILTERS, CHANGE_FILTER, REMOVE_FILTER } = FiltersAction.createTypes(
    domain
  );

  const goToFirstPageReducer = (state: PaginationState) => ({
    ...state,
    page: 1
  });

  return handleActions(
    {
      [SET_FILTERS]: goToFirstPageReducer,
      [CHANGE_FILTERS]: goToFirstPageReducer,
      [CHANGE_FILTER]: goToFirstPageReducer,
      [REMOVE_FILTER]: goToFirstPageReducer
    },
    initialState
  ) as Reducer<PaginationState, AnyAction>;
}

/**
 * Handles both pagination actions and async resolved actions.
 *
 * @param domain Unique string that describes domain that reducer should listen for (for example USER or COMPANY)
 * @param types Async action type(s) (for example LIST_USERS or [LIST_USERS, LIST_ADMIN_USERS])
 * @param initialState
 */
export function handlePagination(
  domain: string,
  types: string | string[] = [],
  initialState = PaginationState.INITIAL
): Reducer<PaginationState, AnyAction> {
  if (!Array.isArray(types)) {
    types = [types];
  }

  return reduceReducers(
    [
      handlePaginationActions(domain, initialState),
      handleFilterActions(domain, initialState),
      ...types.map((type) => handlePaginationAsync(type, initialState))
    ],
    initialState
  );
}
