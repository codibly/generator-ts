import { handleFilters, handlePagination, handleSorting } from '@codibly/redux-query';
import { handleAsync } from '@codibly/redux-async/Async.reducer';
import { combineReducers } from 'redux';
import { UserAction } from './User.action';
import { UserState } from './User.state';

const listUsersReducer = handleAsync<UserState['users']>(
  UserAction.LIST_USERS,
  {
    resolved: (state, action: UserAction.ListUsersAction) =>
      action.payload!.data || UserState.INITIAL.users,
    rejected: () => UserState.INITIAL.users
  },
  UserState.INITIAL.users
);

const sortingReducer = handleSorting(UserState.DOMAIN, UserState.INITIAL.sorting);
const paginationReducer = handlePagination(
  UserState.DOMAIN,
  UserAction.LIST_USERS,
  UserState.INITIAL.pagination
);
const filtersReducer = handleFilters(UserState.DOMAIN, UserState.INITIAL.filters);

export const userReducer = combineReducers<UserState>({
  users: listUsersReducer,
  sorting: sortingReducer,
  pagination: paginationReducer,
  filters: filtersReducer
});
