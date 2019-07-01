import { http } from 'Api';
import { ThunkDispatch } from 'App/store/Thunk.dispatch';
import { AxiosError, AxiosInstance } from 'axios';
import { UNAUTHORIZED } from 'http-status-codes';
import { Store } from 'redux';
import { AuthAction } from './Auth.action';
import { AuthSelector } from './Auth.selector';

function refreshTokenSaga(store: Store<any>, interval: number) {
  setInterval(() => {
    if (AuthSelector.isAuthenticated(store.getState())) {
      (store.dispatch as ThunkDispatch)(AuthAction.refreshToken());
    }
  }, interval);
}

function redirectOnUnauthorizedSaga(store: Store<any>, axios: AxiosInstance) {
  // handle errors by status code
  axios.interceptors.response.use(undefined, (error: AxiosError) => {
    if (error.response && error.response.status === UNAUTHORIZED) {
      (store.dispatch as ThunkDispatch)(AuthAction.redirectToLoginIfNeeded());
    }

    throw error;
  });
}

function addAuthenticationToken(store: Store<any>, axios: AxiosInstance) {
  axios.interceptors.request.use((request) => {
    const token = AuthSelector.getAuthToken(store.getState());

    return token ? { ...request, headers: { Authorization: 'bearer ' + token } } : request;
  });
}

export function authSaga(store: Store<any>) {
  // refresh auth token every 30 minutes
  refreshTokenSaga(store, 30 * 60 * 1000);
  redirectOnUnauthorizedSaga(store, http);
  addAuthenticationToken(store, http);
}
