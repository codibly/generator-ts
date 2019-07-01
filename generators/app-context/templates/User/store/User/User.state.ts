import { FiltersState } from 'Api/store/Filters/Filters.state';
import { PaginationState } from 'Api/store/Pagination/Pagination.state';
import { SortingState } from 'Api/store/Sorting/Sorting.state';
import { User } from '../../model/User';

export type UserState = {
  users: User[];
  pagination: PaginationState;
  sorting: SortingState;
  filters: FiltersState;
};

export namespace UserState {
  export const INITIAL: UserState = {
    users: [],
    pagination: PaginationState.INITIAL,
    sorting: {
      field: 'firstName',
      direction: 'asc'
    },
    filters: FiltersState.INITIAL
  };
  export const DOMAIN = 'USER';
}

export type UserMountedState = {
  user?: UserState;
  [key: string]: any;
};
