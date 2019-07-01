import { reduceReducers } from '@codibly/reduce-reducers/reduceReducers';
import { handleAsync } from '@codibly/redux-async/async.reducer';
import { combineReducers } from 'redux';
import { AuthStatus } from '../../model/AuthStatus';
import { AuthAction } from './Auth.action';
import { AuthState } from './Auth.state';

const myselfReducer = handleAsync<AuthState['myself']>(
  AuthAction.CHECK_MYSELF,
  {
    resolved: (state, action: AuthAction.CheckMyselfAction) =>
      action.payload || AuthState.INITIAL.myself,
    rejected: () => AuthState.INITIAL.myself
  },
  AuthState.INITIAL.myself
);

const authenticatedReducer = reduceReducers<AuthState['status']>(
  [
    handleAsync<AuthState['status']>(
      AuthAction.LOGIN,
      {
        resolved: () => AuthStatus.AUTHENTICATED,
        rejected: () => AuthStatus.NOT_AUTHENTICATED
      },
      AuthState.INITIAL.status
    ),
    handleAsync<AuthState['status']>(
      AuthAction.CHECK_MYSELF,
      {
        resolved: (state, action: AuthAction.CheckMyselfAction) =>
          !!action.payload ? AuthStatus.AUTHENTICATED : AuthStatus.NOT_AUTHENTICATED,
        rejected: () => AuthStatus.NOT_AUTHENTICATED
      },
      AuthState.INITIAL.status
    )
  ],
  AuthState.INITIAL.status
);

export const authReducer = combineReducers<AuthState>({
  status: authenticatedReducer,
  myself: myselfReducer
});
