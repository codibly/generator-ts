import { isProduction } from 'App/environment';
import { AuthRoute } from 'App/route/auth';
import { async, AsyncAction } from '@codibly/redux-async';
import { getQueryParam, hasExactMatch } from '@codibly/router-selector/routerSelector';
import { ThunkAction } from 'App/store/Thunk.action';
import LogRocket from 'logrocket';
import { stringify as stringifyQuery } from 'qs';
import { User } from 'User/model/User';
import { AuthApi } from '../../api/Auth/Auth.api';
import { AuthDto } from '../../api/Auth/Auth.dto';
import { AuthSelector } from './Auth.selector';

export namespace AuthAction {
  const REDIRECT_AFTER_LOGIN_PARAM = 'redirect_to';

  /**
   * Login to the system using username and password
   */
  export const LOGIN = 'LOGIN';
  export const login = (
    username: string,
    password: string,
    remember = false
  ): ThunkAction<Promise<void>> => (dispatch) =>
    dispatch(async<void>(LOGIN, AuthApi.login(username, password, remember)));

  /**
   * Refresh auth token
   */
  export const REFRESH_TOKEN = 'REFRESH_TOKEN';
  export const refreshToken = (): ThunkAction<Promise<void>> => (dispatch) =>
    dispatch(async<void>(REFRESH_TOKEN, AuthApi.refreshToken()));

  /**
   * Logout from the system
   */
  export const LOGOUT = 'LOGOUT';
  export const logout = (): ThunkAction<Promise<any>> => (dispatch) =>
    dispatch(async(LOGOUT, AuthApi.logout())).then(() => dispatch(redirectToLogin(false)));

  /**
   * Check current logged-in user
   */
  export const CHECK_MYSELF = 'CHECK_MYSELF';
  export type CheckMyselfAction = AsyncAction<User>;
  export const checkMyself = (): ThunkAction<Promise<User>> => (dispatch) =>
    dispatch(async<User>(CHECK_MYSELF, AuthApi.checkMyself())).then((user) => {
      if (isProduction()) {
        LogRocket.identify(user.id, {
          name: User.getName(user),
          email: user.email,
          role: user.role
        });
      }

      return user;
    });

  export const checkMyselfIfUnknown = (): ThunkAction<Promise<User>> => (dispatch, getState) => {
    const myself = AuthSelector.getMyself(getState());

    if (!myself) {
      return dispatch(checkMyself());
    }

    return Promise.resolve(myself);
  };

  /**
   * Redirect to dashboard from login page if user is authenticated
   */
  export const redirectToDashboardIfAuthenticated = (): ThunkAction<void> => (
    dispatch,
    getState
  ) => {
    if (AuthSelector.isAuthenticated(getState())) {
      const redirectTo = getQueryParam(REDIRECT_AFTER_LOGIN_PARAM)(getState());

      if (hasExactMatch(AuthRoute.LOGIN)(getState())) {
        window.location.replace(redirectTo || '/');
      }
    }
  };

  /**
   * Redirect to login from dashboard
   */
  export const redirectToLogin = (withRedirect = true): ThunkAction<void> => () => {
    const shouldRedirect = withRedirect && window.location.pathname !== '/';
    const redirectQuery =
      '?' + stringifyQuery({ [REDIRECT_AFTER_LOGIN_PARAM]: window.location.pathname });

    window.location.replace(`/login${shouldRedirect ? redirectQuery : ''}`);
  };

  export const redirectToLoginIfNeeded = (): ThunkAction<void> => (dispatch, getState) => {
    if (
      !hasExactMatch(AuthRoute.LOGIN)(getState()) &&
      !hasExactMatch(AuthRoute.FORGOTTEN_PASSWORD)(getState()) &&
      !hasExactMatch(AuthRoute.RESET_PASSWORD)(getState()) &&
      !hasExactMatch(AuthRoute.EXPIRED_TOKEN)(getState())
    ) {
      dispatch(redirectToLogin());
    }
  };

  /**
   * Redirect to login from dashboard if user is not authenticated
   */
  export const redirectToLoginIfNotAuthenticated = (): ThunkAction<void> => (
    dispatch,
    getState
  ) => {
    if (AuthSelector.isNotAuthenticated(getState())) {
      dispatch(redirectToLoginIfNeeded());
    }
  };

  export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
  export const resetPasswordRequest = (
    dto: AuthDto.ResetPasswordRequest
  ): ThunkAction<Promise<void>> => (dispatch) =>
    dispatch(async(RESET_PASSWORD_REQUEST, AuthApi.resetPasswordRequest(dto)));

  export const RESET_PASSWORD = 'RESET_PASSWORD';
  export const resetPassword = (dto: AuthDto.ResetPassword): ThunkAction<Promise<void>> => (
    dispatch
  ) => dispatch(async(RESET_PASSWORD, AuthApi.resetPassword(dto)));

  /**
   * Change logged user password
   */
  export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
  export const changePassword = (dto: AuthDto.ChangePassword): ThunkAction<Promise<undefined>> => (
    dispatch
  ) => dispatch(async(CHANGE_PASSWORD, AuthApi.changePassword(dto)));
}
