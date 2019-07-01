import { handleFilters } from 'Api/store/Filters/filters.reducer';
import { handlePagination } from 'Api/store/Pagination/pagination.reducer';
import { handleSorting } from 'Api/store/Sorting/sorting.reducer';
import { handleAsync } from '@codibly/redux-async/async.reducer';
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
