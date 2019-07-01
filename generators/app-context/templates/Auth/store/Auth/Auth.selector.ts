import { getQueryParam } from '@codibly/router-selector/routerSelector';
import { createSelector } from 'reselect';
import { Role } from '../../../User/model/Role';
import { AuthStatus } from '../../model/AuthStatus';
import { AuthMountedState, AuthState } from './Auth.state';
import {User} from "User/model/User";

export namespace AuthSelector {
  const getAuthDomain = (state?: AuthMountedState): Partial<AuthState> =>
    (state && state.auth) || {};

  /**
   * Checks if auth state is mounted
   * @param state
   */
  export const isMounted = (state?: AuthMountedState) => state && state.auth !== undefined;

  /**
   * Get current authenticated status
   */
  export const getStatus = createSelector(
    getAuthDomain,
    (state) => state.status || AuthStatus.UNKNOWN
  );

  /**
   * Check if current user is authenticated
   */
  export const isAuthenticated = createSelector(
    getStatus,
    (status) => status === AuthStatus.AUTHENTICATED
  );

  /**
   * Check if current user is not authenticated
   */
  export const isNotAuthenticated = createSelector(
    getStatus,
    (status) => status === AuthStatus.NOT_AUTHENTICATED
  );

  /**
   * Get current user
   */
  export const getMyself = createSelector<any, any, any>(
    getAuthDomain,
    (state) => state.myself || null
  );

  export const getFirstName = createSelector(
    getMyself,
    (myself) => myself && myself.firstName
  );

  export const getLastName = createSelector(
    getMyself,
    (myself) => myself && myself.lastName
  );

  export const getUsername = createSelector(
    getFirstName,
    getLastName,
    (firstName, lastName) => firstName && firstName.charAt(0) + '. ' + lastName
  );

  export const isAdmin = createSelector(
    getMyself,
    (myself) => myself && myself.role === Role.ADMIN
  );

  export const getAuthToken = createSelector(
    getQueryParam('t'),
    (token) => token
  );
}
