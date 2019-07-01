import { createAsyncActions } from '@codibly/redux-async/async.action';
import { AuthStatus } from '../../model/AuthStatus';
import { AuthAction } from './Auth.action';
import { authReducer } from './auth.reducer';
import { AuthState } from './Auth.state';
import { AuthStateMock } from './Auth.state.mock';

describe('AuthReducer', () => {
  let myself: AuthState['myself'];

  beforeEach(() => {
    myself = AuthStateMock.myself;
  });

  it('should return initial state for undefined', () => {
    expect(authReducer(undefined, { type: 'FOO' })).toEqual(AuthState.INITIAL);
  });

  it('should handle CHECK_MYSELF action', () => {
    const { pending, resolved, rejected } = createAsyncActions(AuthAction.CHECK_MYSELF);

    expect(authReducer(AuthState.INITIAL, pending())).toEqual(AuthState.INITIAL);
    expect(authReducer(AuthState.INITIAL, resolved(myself))).toEqual({
      status: AuthStatus.AUTHENTICATED,
      myself
    });
    expect(authReducer(AuthState.INITIAL, resolved(undefined))).toEqual({
      status: AuthStatus.NOT_AUTHENTICATED,
      myself: null
    });
    expect(authReducer(AuthState.INITIAL, resolved(null))).toEqual({
      status: AuthStatus.NOT_AUTHENTICATED,
      myself: null
    });
    expect(authReducer(AuthState.INITIAL, rejected(new Error('Some error')))).toEqual({
      status: AuthStatus.NOT_AUTHENTICATED,
      myself: null
    });
  });

  it('should handle LOGIN action', () => {
    const { pending, resolved, rejected } = createAsyncActions(AuthAction.LOGIN);

    expect(authReducer(AuthState.INITIAL, pending())).toEqual(AuthState.INITIAL);
    expect(authReducer(AuthState.INITIAL, resolved())).toEqual({
      ...AuthState.INITIAL,
      status: AuthStatus.AUTHENTICATED
    });
    expect(authReducer(AuthState.INITIAL, rejected(new Error('Some error')))).toEqual({
      ...AuthState.INITIAL,
      status: AuthStatus.NOT_AUTHENTICATED
    });
  });
});
