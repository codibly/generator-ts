import { FiltersState, PaginationState, SortingState } from '@codibly/redux-query';
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
