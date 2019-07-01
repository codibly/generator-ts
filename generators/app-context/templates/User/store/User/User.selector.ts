import { FilterExpression } from 'Api/model/FilterExpression';
import { PaginationSelector } from 'Api/store/Pagination/Pagination.selector';
import memoize from 'fast-memoize';
import { createSelector } from 'reselect';
import { AuthSelector } from 'Auth/store/Auth/Auth.selector';
import { UserFilter } from '../../api/User/User.filter';
import { User } from '../../model/User';
import { UserSecurity } from '../../security/User.security';
import { UserMountedState, UserState } from './User.state';

export namespace UserSelector {
  const getUserDomain = (state?: UserMountedState) => (state && state.user) || ({} as UserState);

  export const getUsers = createSelector(
    getUserDomain,
    (state) => state.users
  );

  export const getPagination = createSelector(
    getUserDomain,
    (state) => state.pagination
  );

  export const getSorting = createSelector(
    getUserDomain,

    (state) => state.sorting
  );

  export const getFilters = createSelector(
    getUserDomain,
    (state) => state.filters
  );

  export const getFilterExpression = createSelector(
    getFilters,
    (filters) => {
      const fields = Object.keys(filters || {});

      const expressions = fields
        .map((field) => {
          switch (field) {
            case 'query':
              return UserFilter.search(filters[field]);

            case 'role':
              const selectedRoles = filters[field] || [];

              return selectedRoles.length ? FilterExpression.oneOf(field, selectedRoles) : null;
          }
        })
        .filter((expression) => !!expression) as FilterExpression[];

      return expressions.length ? FilterExpression.and(expressions) : null;
    }
  );

  export const canEditUser = memoize(() =>
    createSelector(
      AuthSelector.getMyself,
      (myself: User) => UserSecurity.canEditUser(myself)
    )
  );

  export const { getPage, getPerPage, getCount } = PaginationSelector.create(getPagination);
}
