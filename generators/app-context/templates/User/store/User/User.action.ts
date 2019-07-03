import { PaginatedResponse, FiltersAction, PaginationAction, SortingAction } from '@codibly/redux-query';
import { async, AsyncAction } from '@codibly/redux-async';
import { ThunkAction } from 'App/store/Thunk.action';
import { UserApi } from '../../api/User/User.api';
import { UserDto } from '../../api/User/User.dto';
import { User } from '../../model/User';
import { UserSelector } from './User.selector';
import { UserState } from './User.state';

export namespace UserAction {
  export const CREATE_USER = 'CREATE_USER';
  export const createUser = (user: UserDto.Create): ThunkAction<Promise<User>> => (dispatch) =>
    dispatch(async(CREATE_USER, UserApi.create(user))).then((newUser) => {
      dispatch(listUsers());
      return newUser;
    });

  export const UPDATE_USER = 'UPDATE_USER';
  export const updateUser = (user: UserDto.Update): ThunkAction<Promise<User>> => (dispatch) =>
    dispatch(async(UPDATE_USER, UserApi.update(user))).then((updatedUser) => {
      dispatch(listUsers());
      return updatedUser;
    });

  export const LIST_USERS = 'LIST_USERS';
  export type ListUsersAction = AsyncAction<PaginatedResponse<User>>;
  export const listUsers = (): ThunkAction<void> => (dispatch, getState) => {
    const query = {
      pagination: UserSelector.getPagination(getState()),
      sorting: UserSelector.getSorting(getState()),
      filter: UserSelector.getFilters(getState())
    };

    return dispatch(async(LIST_USERS, UserApi.list(query)));
  };

  export const RESEND_EMAIL = 'RESEND_EMAIL';
  export const resendEmail = (userId: string): ThunkAction<Promise<any>> => (dispatch) =>
    dispatch(async(RESEND_EMAIL, UserApi.resendEmail(userId)));


  export const { changePerPage, changePage } = PaginationAction.create(UserState.DOMAIN);
  export const { changeSorting } = SortingAction.create(UserState.DOMAIN);
  export const { changeFilters, changeFilter, removeFilter } = FiltersAction.create(
    UserState.DOMAIN
  );
}
